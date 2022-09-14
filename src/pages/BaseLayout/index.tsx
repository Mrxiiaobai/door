import React, { PureComponent, Dispatch } from 'react'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Home from '@/pages/Home';
// import { connect } from 'dva'
import Context from './MenuContext.js';
import 'antd-mobile/es/global'

export interface BasicLayoutProps {
  dispatch: Dispatch<any>;
}

// @connect()
class BaseLayout extends PureComponent<BasicLayoutProps,any> {
  constructor(props:any){
    super(props)
    this.state = {

    }
  }
  render(){
    console.log(this.props,'-----this.props')
    return (
      <div style={{ height:'100%' }}>
        <DndProvider backend={ HTML5Backend }>
          <Context.Provider value={ location }>
            <Home />
          </Context.Provider>
        </DndProvider>
      </div>
    );
  }
}

export default BaseLayout