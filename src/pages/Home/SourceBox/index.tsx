import { ItemTypes } from '@/utils/ItemTypes';
import { CSSProperties, FC, ReactNode, useEffect, memo, useState, Fragment, useCallback, useContext } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import update from 'immutability-helper'
import { sourceArr } from './source'
import styles from './index.scss'
import React from 'react';
import { FormContext } from '@/utils/context'


export interface BoxProps {
  data:BoxState;
  // moveCard: (id: number, to: number) => void
  // findCard: (id: number) => { index: number }
  isDropped?: boolean;
  className?: string;
}

export interface collectedProps {
  opacity? : number;
  isDragging? : boolean;
}

export interface Item {
  id:number;
}

interface BoxState {
  name: string
  type: string
  componentName:ReactNode;
  schema: Object
}

export const Box: FC<BoxProps> = memo(function Box({ data, isDropped, className }) {
  const { type, name, componentName, schema } = data
  const { setDragingfunc } = useContext(FormContext)
  // const originalIndex = findCard(id).index
  const [{ opacity, isDragging }, drag] = useDrag(
    () => ({
      type,
      item: { name, componentName, schema },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
        isDragging: monitor.isDragging()
      }),
    }),
    [name, type]
  )

  useEffect(()=>{
    setDragingfunc(isDragging)
  }, [isDragging])

  return (
    <div ref={ drag }  className={ `${ className } ${ styles.sourceBox }` } style={{ opacity }} data-testid="box">
      { name }
    </div>
  )
})



const SourceBox = memo(()=>{
  const [boxes, setBox] = useState<BoxState[]>(sourceArr)

  const [droppedBoxNames, setDroppedBoxNames] = useState<string[]>([])

  function isDropped(boxName: string) {
    return droppedBoxNames.indexOf(boxName) > -1
  }

  return <Fragment>
    { boxes.map((item, index) => (
      <Box
        data={ item }
        isDropped={ isDropped(item.name) }
        key={ index }
      />
    )) }
  </Fragment>
})

export default SourceBox
