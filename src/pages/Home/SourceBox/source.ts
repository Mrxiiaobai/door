import { ItemTypes } from '@/utils/ItemTypes';
import { Button, AutoCenter, NavBar } from 'antd-mobile'
import { Header } from '@/components'

export const sourceArr = [
  { name:'Button', componentName:Button, type: ItemTypes.Box, schema:{
    type: 'object',
    properties: {
      children: {
        default:'Button',
        title: '输入框',
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        // 'x-component-props': {
        //   style: {
        //     width: 240,
        //   },
        // },
      },
      
    },
  } },
  { name:'AutoCenter', componentName:AutoCenter, type: ItemTypes.Box, schema:{
    type: 'object',
    properties: {
      children: {
        default:'AutoCenter',
        title: '标题',
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
    },
  }  },
  { name:'NavBar', componentName:NavBar, type: ItemTypes.Box, schema:{
    type: 'object',
    properties: {
      children: {
        title: '标题',
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
      back: {
        title: '返回按钮显示',
        type: 'string',
        enum: [
          {
            label: '显示',
            value: '',
          },
          {
            label: '不显示',
            value: 'null',
          },
        ],
        default:'',
        'x-decorator': 'FormItem',
        'x-component': 'Radio.Group',
        // 'x-component-props': {
        //   style: {
        //     width: 240,
        //   },
        // },
      },
    },
  }  },
  { name:'H1', componentName:Header, type: ItemTypes.Box, schema:{
    type: 'object',
    properties: {
      title: {
        default:'标题',
        title: '标题',
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
    },
  }  },
  // { name:'Card', componentName:Card, type: ItemTypes.Box, schema:{
  //   type: 'object',
  //   properties: {
  //     input: {
  //       type: 'string',
  //       'x-component': 'Input',
  //     },
  //   },
  // }  },
  // { name:'Swiper',componentName:Swiper, type: ItemTypes.Box, schema:{
  //   type: 'object',
  //   properties: {
  //     input: {
  //       type: 'string',
  //       'x-component': 'Input',
  //     },
  //   },
  // }  },
  // { name:'Input',componentName:Input, type: ItemTypes.Box, schema:{
  //   type: 'object',
  //   properties: {
  //     input: {
  //       type: 'string',
  //       'x-component': 'Input',
  //     },
  //   },
  // }  },
  // { name:'Select',componentName:Select, type: ItemTypes.Box, schema:{
  //   type: 'object',
  //   properties: {
  //     input: {
  //       type: 'string',
  //       'x-component': 'Input',
  //     },
  //   },
  // }  },
]