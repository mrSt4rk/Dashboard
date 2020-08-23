import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row
} from 'reactstrap';
import { Button, Form, Input } from "antd";
import { Spin } from "antd";

class EditAdminUser extends Component {
  state = { loading: false };

  componentDidMount() {
    this.props.fetchAdminUser();
  }

  componentDidUpdate(prevProps) {

    if (this.props.user && this.props.user.adminUser && this.props.user.adminUser !== prevProps.user.adminUser) {
      this.props.form.setFieldsValue({
        name: this.props.user.adminUser.name
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        var self = this;
        if (self.props.user) {
          values = { ...values };
        }
        self.props.updateAdminUser(values);
      }
    });
  }

  render() {
    const { loading } = this.props.user;
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="animated fadeIn">
        <Row className="justify-content-center">
          <Col xs="6" md="6">
            <Card>
              <CardHeader>
                <strong>ویرایش کاربر ادمین</strong>
              </CardHeader>
              <CardBody>
                <Spin spinning={this.props.user.loading} delay={500}>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Item label="">
                      {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'نام اجباری می‌باشد.' }],
                      })(
                        <Input
                          type="text"
                          placeholder="نام"
                        />
                      )}
                    </Form.Item>

                    <Form.Item label="">
                      {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'رمز عبور اجباری می‌باشد.' }],
                      })(
                        <Input
                          type="password"
                          placeholder="رمز عبور"
                        />
                      )}
                    </Form.Item>

                    <Form.Item label="">
                      {getFieldDecorator('password_confirmation', {
                        rules: [{ required: true, message: 'تکرار رمز عبور اجباری می‌باشد.' }],
                      })(
                        <Input
                          type="password_confirmation"
                          placeholder=" تکرار رمز عبور"
                        />
                      )}
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        ثبت
                      </Button>
                    </Form.Item>
                  </Form>
                </Spin>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(EditAdminUser);
