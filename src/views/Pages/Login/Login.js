import React, { Component } from 'react';
import axios from 'axios';
import {
  Form, Icon, Input, Button,
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
        axios.post(BASE_URL + '/auth/login',
          values
        )
          .then(function (response) {
            console.log('response from login ', response.data.data.token);
            localStorage.setItem('token', "Bearer " + response.data.data.token);
            self.props.history.push({
              pathname: '/',
              state: { id: 7, color: 'green' }
            })
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
              <div className="text-center mb-3"><img src="/assets/img/logo.png" /></div>
              <h2 className="text-center mb-5"></h2>
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <div className="login">

                      <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                          {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'فیلد فوق اجباری می‌باشد.' }],
                          })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="ایمیل" />
                          )}
                        </FormItem>
                        <FormItem>
                          {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'فیلد فوق اجباری می‌باشد.' }],
                          })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="رمز ورود" />
                          )}
                        </FormItem>
                        <FormItem>
                          {/* {getFieldDecorator('remember', {
                                            valuePropName: 'checked',
                                            initialValue: true,
                                        })(
                                            <Checkbox>Remember me</Checkbox>
                                        )} */}
                          {/* <Link className="login-form-forgot d-block"
                            to={{
                              pathname: '/reset-password',
                            }}>فراموشی رمز عبور</Link> */}
                          <Button type="primary" htmlType="submit" className="login-form-button mr-2">
                            ورود
                            </Button>
                          {/* یا
                            <Link className="ml-2" to={{
                            pathname: '/register',
                          }}>ثبت‌نام</Link> */}
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
