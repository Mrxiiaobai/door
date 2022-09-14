import React, { FC } from 'react'
import { FormProvider, createSchemaField, ISchemaFieldProps } from '@formily/react'
import { Input, Select, FormItem, Radio } from '@formily/antd'

import { connect } from 'dva'

import { observer } from '@formily/react'

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    Select,
    Radio,
  },
})

const FormBox:FC<ISchemaFieldProps> = observer(({ schema, form, dispatch }:any) => {
  
  return (
    //<FormProvider form={form}>
      <SchemaField schema={ schema } />
    //</FormProvider>
  )
})

export default connect()(FormBox)