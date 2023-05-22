import React from 'react'
import FieldContext from './FieldContext'

export default function Field(props) {
  const { children, name } = props

  const {
    getFieldValue,
    setFieldsValue,
    registerFieldEntities,
  } = React.useContext(FieldContext);

  const [_, forceUpdate] = React.useReducer((x) => x + 1, 0)

  React.useLayoutEffect(() => {
    const resigter = registerFieldEntities({ // 为当前Field注册规则信息到全局Field数组
      ...props,
      onStoreChange: forceUpdate
    })
    return resigter
  }, [])

  // 让当前Field包裹组件受控
  const getControlled = () => {
    return {
      value: getFieldValue(name),
      onChange: (e) => {
        setFieldsValue({
          [name]: e
        })
      }
    }
  }

  return React.cloneElement(children, getControlled())

}