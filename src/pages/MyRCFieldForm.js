import React, { Component, useEffect } from "react";
// import Form, { Field } from "rc-field-form";
import Form, { Field } from "../components/my-rc-field-form-self/";
import Input from "../components/Input";

const nameRules = { required: true, message: "请输入姓名！" };
const passworRules = { required: true, message: "请输入密码！" };

export default function MyRCFieldForm(props) {
  const [form] = Form.useForm();

  const onFinish = (val) => {
    console.log("onFinish", val); //sy-log
  };

  // 表单校验失败执行
  const onFinishFailed = (val) => {
    console.log("onFinishFailed", val); //sy-log
  };

  useEffect(() => {
    console.log("form", form); //sy-log
    form.setFieldsValue({ username: "default" });
  }, []);

  const handleCustomSubmit = () => {
    form.submit()
  }

  return (
    <div>
      <h3>MyRCFieldForm</h3>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Field name="username" rules={[nameRules]}>
          <Input placeholder="input UR Username" />
        </Field>
        <Field name="password" rules={[passworRules]}>
          <Input placeholder="input UR Password" />
        </Field>
        <button>Submit</button>
      </Form>
      <button style={{marginTop: '10px'}} onClick={handleCustomSubmit}>Custom Submit</button>
    </div>
  );
}

// export default class MyRCFieldForm extends Component {
//   formRef = React.createRef();
//   componentDidMount() {
//     console.log("form", this.formRef.current); //sy-log
//     this.formRef.current.setFieldsValue({ username: "default" });
//   }

//   onFinish = (val) => {
//     console.log("onFinish", val); //sy-log
//   };

//   // 表单校验失败执行
//   onFinishFailed = (val) => {
//     console.log("onFinishFailed", val); //sy-log
//   };
//   render() {
//     return (
//       <div>
//         <h3>MyRCFieldForm</h3>
//         <Form
//           ref={this.formRef}
//           onFinish={this.onFinish}
//           onFinishFailed={this.onFinishFailed}
//         >
//           <Field name="username" rules={[nameRules]}>
//             <Input placeholder="Username" />
//           </Field>
//           <Field name="password" rules={[passworRules]}>
//             <Input placeholder="Password" />
//           </Field>
//           <button>Submit</button>
//         </Form>
//       </div>
//     );
//   }
// }

// import React, { Component } from 'react'
// import createForm from '../components/createFormSelf'
// import Input from '../components/Input'

// const nameRules = { required: true, message: '请输入姓名！' };
// const passwordRules = { required: true, message: '请输入密码！' };

// class MyRCFormPage extends Component {
//   componentDidMount() {
//     this.props.form.setFieldsValue({ // 设置表单默认值
//       username: 'test'
//     })
//   }
//   submit = () => {
//     const { getFieldsValue, validateFields } = this.props.form
//     validateFields((err) => {
//         console.log('err', err)
//       }, (val) => {
//         console.log('校验成功', val)
//       }
//     )
//   }
//   render() {
//     const { getFieldDecorator } = this.props.form
//     return (
//       <div>
//         <h3>MyRCFormPage</h3>
//         {getFieldDecorator('username', {rules: [nameRules]})(
//           <Input placeholder="Username" />
//         )}
//         {getFieldDecorator('password', {rules: [passwordRules]})(
//           <Input placeholder="Password" />
//         )}
//         <button onClick={this.submit} >submit</button>
//       </div>
//     )
//   }
// }

// export default createForm(MyRCFormPage)
