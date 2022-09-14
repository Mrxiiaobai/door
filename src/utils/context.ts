import React from 'react'

const initValue= {
  form:null,
  dragging:false,
  isPreview:false,
}
export const FormContext = React.createContext(
  {
    ...initValue, // 默认值
    toggleForm: (initialValues={}) => {},
    getCards:(data:any[])=>{},
    setDragingfunc:(draging:any) => {},
  },
);