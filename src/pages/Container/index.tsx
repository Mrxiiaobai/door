import React, { Component } from 'react'
import { Layout } from 'antd'
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { DropTarget } from 'react-dnd';
import { WidthProvider, Responsive } from 'react-grid-layout';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
import styles from './index.scss';

const { Header, Content, Sider } = Layout;

const dragStop:ItemCallback = (layout: any,oldItem: any,newItem: any,placeholder: any,e: any,element: any) => {
	console.log(layout,oldItem,newItem,placeholder,e,element,'--dragStop---')
}
const onDragStart:ItemCallback = (layout: any,oldItem: any,newItem: any,placeholder: any,e: any,element: any) => {
	console.log(layout,oldItem,newItem,placeholder,e,element,'--onDragStart---')
}
const onResizeStop:ItemCallback = (layout: any,oldItem: any,newItem: any,placeholder: any,e: any,element: any) => {
	console.log(layout,oldItem,newItem,placeholder,e,element,'--onResizeStop---')
}

const spec = {
	// beginDrag(props: { id: any; }, monitor: any, component: any) {
	// 	// 这里 return 出去的对象属性自行选择，这里只是用 id 作为演示
	// 	return { id: props.id }
	// },
 
	// endDrag(props: any, monitor: any, component: any) {
	// },
 
	// canDrag(props: any, monitor: any) {
	// },
 
	// isDragging(props: any, monitor: any) {
	// }
	drop:(props, monitor, component)=>{ 
		console.log(props, monitor, component, '----drop props ----')
		return component
	}
}
 
const collect = (connect: { dropTarget: () => any }, monitor: { }) => {
	console.log(connect, monitor, '00000')
	return {
		// 这里返回一个对象，会将对象的属性都赋到组件的 props 中去。这些属性需要自己定义。
		connectDropTarget: connect.dropTarget(),
		// 是否结束
		isOver: monitor.isOver(),
		// 是否可以被放置
		canDrop: monitor.canDrop(),
		// drop:monitor.drop()
	}
}

const ItemTypes = {
  BOX: 'box',
}


// 需要移动的元素
@DropTarget('box', spec, collect)
export default class TestPage extends React.Component{
	constructor(props:any){
		super(props)
		this.state = {
			listArr:[],
			EUlayout:[
				{ i: 'a', x: 0, y: 0, w: 3, h: 1, isDraggable: true, isResizable: false },
				{ i: 'b', x: 0, y: 1, w: 3, h: 10, isDraggable: true, isResizable: false },
				{ i: 'c', x: 0, y: 11, w: 3, h: 1, isDraggable: true, isResizable: false },
			]
		}
		
	}
  render(): React.ReactNode {
		const { connectDropTarget, drop } = this.props
		const { EUlayout } = this.state
		console.log(this.props,'p-----drop----')
    return connectDropTarget(
      <div className={ styles.test }>
				<Content style={ { padding: '0 24px', minHeight: 280, height: '100%' } }>
            <div className={ styles.canvansContainer }>
              <ResponsiveReactGridLayout
                layouts={ { lg: EUlayout } }
                // cols={ 24 }
                cols={ { lg: 12, md: 10, sm: 6, xs: 4, xxs: 3 } }
                breakpoints={ { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 } }
                rowHeight={ 30 }
                width="100%"
                margin={ [0, 0] }
                onDragStop={ dragStop }
                onDragStart={ onDragStart }
                onResizeStop={ onResizeStop }
                style={ {
                  height: '100%',
                  backgroundSize: '100%',
                  backgroundRepeat: 'no-repeat',
                } }
              >
								{/* { EUlayout.map(item=>{
									return 
								}) } */}
                <div key="a" style={ { width: '100%', height: '100px', background: '#CCCCCC' } }>1</div>
                <div key="b" style={ { width: '100%', height: '50px', background: '#dd5f24' } }>2</div>
                <div key="c" style={ { width: '100%', height: '60px', background: '#b7d120' } }>3</div>
              </ResponsiveReactGridLayout>
            </div>
          </Content>
			</div>
    );
  }
}