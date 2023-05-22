import { useRef } from "react"

// 定义一个公共form状态仓库store的class构造函数
class FormStore {
  constructor() {
    this.store = {} // 基于发布订阅模式的公共form表单状态仓库
    this.fieldEntities = [] // 存储当前表单规则等信息的数组
    this.callbacks = {} // 存储部分回调的对象
  }
  setCallbacks = (callbacks) => {
    this.callbacks = { ...this.callbacks, ...callbacks }
  }
  // 注册表单规则信息，以及取消注册方法的初始化
  registerFieldEntities = (entity) => {
    this.fieldEntities.push(entity)

    return () => { // 在Field组件卸载时执行，取消注册
      this.fieldEntities = this.fieldEntities.filter((item) => item !== entity)
      delete this.store[entity.props.name]
    }
  }
  // 获取当前公共状态
  getFieldsValue = () => {
    return { ...this.store }
  }
  // 获取当前某个KEY对应状态
  getFieldValue = (name) => {
    return this.store[name]
  }
  // 重设状态
  setFieldsValue = (newStore) => {
    // 1、update store
    this.store = {
      ...this.store,
      ...newStore
    }
    // 2、update fieldEntities（更新视图）
    this.fieldEntities.forEach((entity) => {
      Object.keys(newStore).forEach((k) => {
        if (k === entity.props.name) {
          entity.onStoreChange() // forceUpdate field
        }
      })
    })
  }
  // 表单校验
  validate = () => {
    const err = []
    // 遍历规则数组
    this.fieldEntities.forEach((entity) => {
      const { name, rules } = entity.props
      const value = this.getFieldValue(name)
      const rule = rules[0] // 若需进行多规则校验，只需要对这里改造为遍历rules
      if (rule && rule.required && ['', undefined, null].includes(value)) {
        err.push({
          [name]: rule.message,
          value
        })
      }
    })
    return err
  }
  // 表单提交
  submit = () => {
    const err = this.validate()
    const { onFinish, onFinishFailed } = this.callbacks
    if (err.length === 0) {
      onFinish(this.getFieldsValue())
    } else {
      onFinishFailed(err, this.getFieldsValue())
    }
  }
  // 获取表单instance
  getForm = () => {
    return {
      getFieldsValue: this.getFieldsValue,
      getFieldValue: this.getFieldValue,
      setFieldsValue: this.setFieldsValue,
      registerFieldEntities: this.registerFieldEntities,
      submit: this.submit,
      setCallbacks: this.setCallbacks,
    };
  };
}

export default function useForm(form) {
  const formRef = useRef()

  if (!formRef.current) {
    if (form) { // 关联到同一个form实例
      formRef.current = form
    } else {
      const formInstance = new FormStore()
      formRef.current = formInstance.getForm()
    }
  }
  return [formRef.current]
}