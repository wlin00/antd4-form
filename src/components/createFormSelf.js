import React, { Component } from 'react'

export default function createForm(Cmp) { // hoc createForm: 接受一个表单组件，返回一个受控、可享用根组件状态的表单组件供用户使用
  return class extends Component { // hoc 实现form，缺点是内部formItem改变，整个form都会刷新
    constructor(props) {
      super(props)
      this.state = {}
      this.options = {}
    }
    getForm = () => {
      return {
        form: {
          getFieldDecorator: this.getFieldDecorator,
          setFieldsValue: this.setFieldsValue,
          getFieldsValue: this.getFieldsValue,
          validateFields: this.validateFields,
        }
      }
    }
    handleChange = (e) => {
      const { name, value } = e.target
      this.setState({
        [name]: value
      })
    }
    getFieldDecorator = (field, option) => (InputCmp) => {
      this.options[field] = option
      return React.cloneElement(InputCmp, {
        name: field,
        value: this.state[field],
        onChange: this.handleChange
      })
    }
    setFieldsValue = (newState) =>  {
      this.setState(newState)
    }
    getFieldsValue = () => {
      return {...this.state}
    }
    validateFields = (errCallback, callback) => {
      const err = []
      for (let field in this.options) {
        if (this.state[field] === undefined || this.state[field] === '' || this.state[field] === null) {
          err.push({
            [field]: '请输入'
          })
        }
      }
      if (err && err.length > 0) {
        errCallback(err)
      } else {
        callback(this.state)
      }

    }
    render() {
      return (
        <Cmp {...this.props} {...this.getForm()} />
      )
    }
  }

}
