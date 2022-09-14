import React, { useCallback, useEffect, useState, useRef } from 'react'
import type { Dispatch } from 'react'
import { Layout, Drawer, Button, message } from 'antd'
import { ItemTypes } from '@/utils/ItemTypes'
import { createForm, onFormValuesChange } from '@formily/core'
import { FormProvider } from '@formily/react'
import { FormContext } from '@/utils/context';

import styles from './index.scss';
import TargetBox from './TargetBox';
import SourceBox from './SourceBox';
import FormBox from './FormBox'
import { connect } from 'dva';
import { cardBase } from './TargetBox/type'

const { Header, Content, Sider } = Layout;


export interface BoxSpec {
  name: string
  type: string
}

export interface DustbinSpec {
  accepts: string[]
  lastDroppedItem: any
}

export interface ContainerState {
  droppedBoxNames: string[]
  dustbins: DustbinSpec[]
  boxes: BoxSpec[]
}

interface homeModelParams{
  visible:boolean;
  currentCard:cardBase,
}
interface homeModelTs{
  homeModel:homeModelParams
}

export interface homeProps extends homeModelParams{
  dispatch:Dispatch<any>;
}

const oldForm = createForm({})

const HomePage = ({ dispatch, visible, currentCard }:homeProps) => {
  const { schema=null } = currentCard

  const [ formData, setFormData ] = useState<any>(oldForm)
  const [ data, setData ] = useState<any[]>([])
  const [ dragging, setDraging ] = useState<boolean>(false)
  const [ isPreview, setPreview ] = useState<boolean>(false)

  const onClose = () => {
    dispatch({
      type:"homeModel/setFormBox",
      payload:{
        visible:false,
        currentCard:{},
      },
    })
  }

  const toggleForm = (form) => {
    // console.log(initialValues, '0000000')
    // const formData = createForm({
    //   initialValues,
    // })
    setFormData(form)
  }

  const getCards = (data:any[]) => {
    setData(data)
  }

  const setDragingfunc = (draging:any) => {
    setDraging(draging)
  }

  const handlePreview = () => {
    // setPreview(true)
    message.info('敬请期待');
  }

  const handleSave = () => {
    message.info('敬请期待');
    console.log(data, '<<<-------data---------')
  }

  return (
    <Layout style={ { height: '100%' } } >
      <Header className={ styles.header }>
        <div className={ styles.btnGroup }>
          <Button onClick={ handlePreview }>预览</Button>
          <Button type='primary' className={ styles.saveBtn } onClick={ handleSave }>保存</Button>
        </div>
      </Header>
      <FormProvider form={ formData }>
        <FormContext.Provider value={ 
          {
            form:formData,
            dragging,
            isPreview,
            toggleForm,
            getCards,
            setDragingfunc,
          }
         }>
          <Content style={ { height: '100%' } }>
            <Layout className={ styles.antlayout }>
              <Sider theme='light' className={ styles.antslider } >
                <SourceBox />
              </Sider>
              <TargetBox 
                className={ styles.antTargetBox } 
                accept={ ItemTypes.Box }
              />
              <Drawer 
                title="属性配置" 
                placement="right" 
                onClose={ onClose }
                visible={ visible }
                maskClosable={ false }
                mask={ false }
              >
                { schema && <FormBox form={ formData } schema={ schema } />  }
              </Drawer>
            </Layout>
          </Content>
        </FormContext.Provider>
      </FormProvider>
    </Layout>
  );
}

export default connect(({ homeModel } : any)=>({
  visible:homeModel.visible,
  currentCard:homeModel.currentCard,
}))(HomePage)