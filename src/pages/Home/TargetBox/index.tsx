import React, { memo, useCallback, useContext, useState, forwardRef, useImperativeHandle, useEffect } from 'react'
import type { FC, Dispatch } from 'react'
import { useDrop } from 'react-dnd'
import update from 'immutability-helper'
import { connect } from 'dva'
import { v4 as uuidv4 } from 'uuid'
import { createForm, onFormValuesChange } from '@formily/core'
import { FormContext } from '@/utils/context'
import _ from 'loadsh'

import Card from './Card'
import { base, cardBase } from './type'

import styles from './index.scss'

interface DustbinProps {
  accept: string
  className?: string,
  dispatch: Dispatch<any>
}

const Dustbin: FC<DustbinProps> = memo((props) => {
    const {
      dispatch,
      className,
      accept
    } = props
  const { toggleForm, getCards } = useContext(FormContext)
  const [cards, setCards] = useState<cardBase[]>([])

  useEffect(()=>{
    getCards(cards)
  }, [cards])

  const findCard = useCallback(
    (id:  number) => {
      const card = cards.length > 0 ? cards.filter((c) => c.id === id)[0] as base : { } as never
      return {
        card,
        index: cards.indexOf(card),
      }
    },
    [cards],
  )

  const moveCard = useCallback(
    (id:  number, atIndex:  number) => {
      const { card, index } = findCard(id)
      setCards(
        update(cards, {
          $splice: [
            [index, 1],
            [atIndex, 0, card],
          ],
        }),
      )
    },
    [findCard, cards, setCards],
  )

  const insertCard = useCallback(
    (atIndex:  number, element:cardBase) => {
      setCards(
        update(cards, {
          $splice: [
            [atIndex, 0, element],
          ],
        }),
      )
    },
    [cards, setCards],
  )

  const deleteCard = useCallback(
    (atIndex:  number) => {
      console.log('deleteCard', atIndex)
      setCards(
        update(cards, {
          $splice: [
            [atIndex, 1],
          ],
        }),
      )
    },
    [cards, setCards],
  )

  const setProperty = useCallback(data=> {
    const formData = createForm({
      initialValues:data.data,
      effects(){
        onFormValuesChange(form=>{
          data.data = form.values
        })
      }
    })
    dispatch({
      type:"homeModel/setFormBox",
      payload:{
        visible:true,
        currentCard:data,
      },
      callback:()=>{
        toggleForm(formData)
      }
    })
  }, [cards])

  const onDrop = useCallback((item,monitor)=> {
    const { id: currentId } = item
    if(currentId) return
    let newItem = { id:uuidv4(), ...item }
    insertCard(0, newItem)
    const form = createForm({
      effects(){
        onFormValuesChange(form=>{
          // newItem.data = form.values
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
        toggleForm(form)
      }
    })
  }, [])

  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  const isActive = isOver && canDrop
  let backgroundColor = ''
  if (isActive) {
    backgroundColor = '#F7EDEA'
  }
  return (
    <div className={ `${ styles.targetBox } ${ className }` } data-testid="dustbin">
      <div className={ styles.mobileBox }>
        <img className={ styles.mobileImg } src='https://img.alicdn.com/imgextra/i4/O1CN01ehfzMc1QPqY6HONTJ_!!6000000001969-55-tps-459-945.svg' />
        <div className={ styles.realBox }>
          { cards.length === 0 && <div ref={ drop } style={{ background:backgroundColor }} className={ styles.tzTag }>拖拽到此处</div> }
          { cards.map((item, index) => (
            <Card
              key={ item.id }
              card={ item }
              len={ cards.length }
              moveCard={moveCard}
              findCard={findCard}
              insertCard={ insertCard }
              deleteCard={ deleteCard }
              setProperty={ setProperty }
            />
          )) }
        </div>
      </div>
    </div>
  )
})

export default connect()(Dustbin)
