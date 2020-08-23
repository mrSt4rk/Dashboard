import React, { Component } from 'react';
import axios from 'axios';
import {
  Form, Icon, Input, Button, Checkbox, notification
} from 'antd';
import { Card, CardBody, CardGroup, Col, Container, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../../../Helpers/Api'

const FormItem = Form.Item;
class Login extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        var self = this;
        axios.post(BASE_URL + '/auth/',
          values
        )
          .then(function (response) {
            notification.open({
              message: 'پیغام سامانه',
              description:
                'رمز عبور برای شما به صورت پیامک ارسال می‌گردد و از طریق صفحه ورود می‌توانید وارد سامانه بشوید.',
              duration: 0
            });
          })
          .catch(function (error) {
            console.log(error);
          });

      }
    });
  }


  render() {

    const { getFieldDecorator } = this.props.form;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <h2 className="text-center mb-5"></h2>
              <h4 className="text-center mb-5">ایجاد کاربر</h4>
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <div className="login">

                      <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                          {getFieldDecorator('phoneNumber', {
                            rules: [{ required: true, message: 'فیلد فوق اجباری می‌باشد.' }],
                          })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="شماره تلفن" />
                          )}
                        </FormItem>
                        <FormItem>
                          {getFieldDecorator('isAdmin', {
                            valuePropName: 'checked',
                            initialValue: false,
                          })(
                            <Checkbox>ادمین باشد</Checkbox>
                          )}

                        </FormItem>
                        <FormItem>
                          <Button type="primary" htmlType="submit" className="login-form-button mr-2">
                            ثبت‌نام
                          </Button>
                          یا
                          <Link className="ml-2" to={{
                            pathname: '/login',
                          }}>ورود</Link>
                        </FormItem>
                      </Form>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Form.create()(Login);
