import React from "react";
import useForm from "./useForm";
import FieldContext from './FieldContext'

export default function Form (
  {
    children,
    form,
    onFinish,
    onFinishFailed,
  },
  ref
) {
  const [formInstance] = useForm(form)

  React.useImperativeHandle(ref, () => formInstance)

  formInstance.setCallbacks({
    onFinish,
    onFinishFailed,
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formInstance.submit();
      }}
    >
      <FieldContext.Provider value={formInstance}>
        { children }
      </FieldContext.Provider>
    </form>
  )
}