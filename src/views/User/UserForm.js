import React, { Component } from 'react';
import { Button, Form, Input, Select } from "antd";
const { Option } = Select;
class UserForm extends Component {


  componentDidMount() {
    if (this.props.status === 'update') {
      this.props.form.setFieldsValue({
        name: this.props.user.Name,
        verification: this.props.user.verification,
        language_id: this.props.user.language_id,
        status: this.props.user.Status,
        user_level: this.props.user.user_level
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        var self = this;
        if (self.props.user) {
          var id = { id: self.props.user.ID }
          values = { ...values, ...id };
        }
        self.props.handleSubmit(values);
      }
    });
  }


  fillVerification() {
    const items = [{ id: 0, value: 'normal' }, { id: 1, value: 'need_verify' }, { id: 2, value: 'pending_verification' }, { id: 3, value: 'verified' }];
    return items.map(i => (
      <Option key={i.id} value={i.value}>{i.value}</Option>
    ));

  }

  fillStatus() {
    const items = [{ id: 0, value: 'active' }, { id: 1, value: 'waiting' }, { id: 2, value: 'banned' }];
    return items.map(i => (
      <Option key={i.id} value={i.value}>{i.value}</Option>
    ))
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="نام">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'نام اجباری می‌باشد.' }],
            })(
              <Input
                type="text"
                placeholder="نام"
              />
            )}
          </Form.Item>

          <Form.Item label="تایید">
            {getFieldDecorator('verification', {
              rules: [{ required: true, message: 'تایید اجباری می‌باشد.' }],
            })(
              <Select>
                {this.fillVerification()}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="زبان">
            {getFieldDecorator('language_id', {
              rules: [{ required: true, message: 'زبان اجباری می‌باشد.' }],
            })(
              <Input
                type="text"
                placeholder="زبان"
              />
            )}
          </Form.Item>
          <Form.Item label="سطح کاربر">
            {getFieldDecorator('user_level', {
              rules: [{ required: true, message: 'سطح کاربر اجباری می‌باشد.' }],
            })(
              <Input
                type="text"
                placeholder="سطح کاربر"
              />
            )}
          </Form.Item>
          <Form.Item label="وضعیت">
            {getFieldDecorator('status', {
              rules: [{ required: true, message: '.وضعیت اجباری می‌باشد.' }],
            })(
              <Select>
                {this.fillStatus()}
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              ثبت
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}


export default Form.create()(UserForm);
