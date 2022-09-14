import { CSSProperties, Dispatch, FC, ReactElement, useEffect } from 'react'
import React, { memo, useRef, useState, useReducer, useContext } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { connect } from 'dva'
import { ItemTypes } from '@/utils/ItemTypes'
import { v4 as uuidv4 } from 'uuid'
import { cardBase, base, stringAndnull, element } from './type'
import styles from './index.scss'
import { FormContext } from '@/utils/context'
import { createForm, onFormValuesChange } from '@formily/core'
import { FormConsumer } from '@formily/react'
import _ from 'lodash'

interface modelProps {
  currentCard:base,
  // formValue:any;
}

interface connectParams {
  homeModel: modelProps
}

interface CardProps extends modelProps {
  dispatch:Dispatch<any>;
  card:base
  len:number;
  moveCard: (id:  number, to:  number) => void
  findCard: (id:  number) => { index: number, card:cardBase }
  insertCard: (to:  number, element: cardBase) => void
  deleteCard: (to:  number ) => void
  setProperty: (data: base) => void
}

interface SmallTagProps {
  delClick: () => void
  originalIndex:number;
}

const Card: FC<CardProps> = memo(({
  dispatch,
  card,
  len,
  moveCard,
  findCard,
  insertCard,
  deleteCard,
  setProperty,
  currentCard,
  // formValue,
}) =>{
  // const [moved, setMoved] = useState(false)
  const { id, name, componentName, data, formId } = card
  let nodeRef = useRef<HTMLDivElement | null>(null)
  let positionRef = useRef<stringAndnull>(null)

  const originalIndex = findCard(id).index

  const { toggleForm, setDragingfunc, dragging, isPreview } =
    useContext(FormContext);

  useEffect(()=>{
    console.log(isPreview, '-------')
    if(isPreview) {
      nodeRef.current = null
    } else {
      drag(drop(nodeRef));
    }
  },[isPreview])

  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: ItemTypes.Box,
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item
        const didDrop = monitor.didDrop()
        // const { index: overIndex } = findCard(droppedId)
        if (!didDrop) {
          moveCard(droppedId, originalIndex)
          return
        }
      },
    }),
    [id, originalIndex, moveCard],
  )

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.Box,
      collect: (monitor) => ({
        isOver: monitor.isOver({}),
        canDrop: monitor.canDrop(),
      }),
      hover:(item: cardBase, monitor) =>{
        const { id: draggedId } = item
        if(!draggedId) {
          const hoverBoundingRect = nodeRef?.current?.getBoundingClientRect() as DOMRect;
          const hoverMiddleY = (hoverBoundingRect?.bottom - hoverBoundingRect?.top) / 2;
          const clientOffset = monitor.getClientOffset();
          if (clientOffset) {
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (hoverClientY <= hoverMiddleY) {
              positionRef.current = 'top'
            }
            // Dragging upwards
            if (hoverClientY > hoverMiddleY) {
              positionRef.current = 'bottom'
            }
          }
          return
        }
        if (draggedId !== id) {
          const { index: overIndex } = findCard(id)
          moveCard(draggedId, overIndex)
        }
        
      },
      drop:(item: cardBase, monitor)=> {
        const { id: currentId } = item
        if(currentId) return
        let { index: overIndex } = findCard(id)
        if(positionRef.current === 'bottom') overIndex += 1
        const newItem = { ...item, id: uuidv4() }
        insertCard(overIndex, newItem)
        setDragingfunc(false)
        const formData = createForm({
          effects(){
            onFormValuesChange(form=>{
              newItem.data = form.values
            })
          }
        })
        dispatch({
          type:"homeModel/setFormBox",
          payload:{
            visible:true,
            currentCard:newItem,
          },
          callback:()=>{
            toggleForm(formData)
          }
        })
        positionRef.current = null
      },
    }),
    [findCard, moveCard],
  )

  const beforeSetProperty = () => {
    setProperty(card)
  }

  const ondelClick = () => {
    deleteCard(originalIndex)
  }
 
  const renderElement = (form: { values: any; id: any }) => {
    const { values, id:elementFormId } = form
    const deepValue = { formId:elementFormId, ...values }
    deepValue.back === 'null' ? deepValue.back = null : deepValue.back
    deepValue.children ? deepValue.children : ''
    if(formId !== elementFormId && len > 1) return React.createElement(componentName, card.data, card?.data?.children || null)
    card.data = deepValue
    return React.createElement(componentName, card.data, card.data.children)
  }

  const opacity = isDragging ? 0.4 : 1
  const borderStyle = (currentCard && currentCard.id === id && !isPreview) ? styles.borderCard : ''
  return (
    <div className={ styles.dragContainer }>
      <div className={ styles.dragNode } onClick={ beforeSetProperty } ref={ nodeRef as any }>
        { (isOver && canDrop && positionRef.current === 'top') && <div className={ styles.blankTopCard }>拖拽到此处</div> }
        <div className={`${ styles.cardStyle } ${ borderStyle }`} style={{ opacity }} ref={ dragPreview }>
          <FormConsumer>{ renderElement }</FormConsumer>
        </div>
        { (isOver && canDrop && positionRef.current === 'bottom' && originalIndex !== len-1 ) && <div className={ styles.blankBottomCard }>拖拽到此处</div> }
        { (dragging && !isPreview && canDrop && originalIndex === len-1 && positionRef.current !== 'top') && <div className={ styles.blankBottomCard }>拖拽到此处</div> }
      </div>
      { (!isDragging && borderStyle) && <SmallTag delClick={ ondelClick } originalIndex={ originalIndex }/> }
    </div>
  )
})


const SmallTag: FC<SmallTagProps> = ({ delClick, originalIndex }) => {
  return  <div className={ `${ originalIndex=== 0 ? styles.downTag : '' } ${ styles.delTag }` }>
    <span onClick={ delClick }>删除</span>
  </div> 
}

export default connect(({ homeModel } : connectParams )=>({ 
  currentCard: homeModel.currentCard,
}))(Card)

