import React, {Component} from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row
} from 'reactstrap';
import {Form, Input, Button, Checkbox, message} from 'antd';
import axios from "axios";
import {BASE_URL} from "../../Helpers/Api";



var token = JSON.parse(localStorage.getItem("token"));
let config = {
  headers: {
    Authorization: token,
    Accept: 'application/json'
  }
}

class ChangePassword extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        axios.post( BASE_URL + '/auth/change-password',
          values,
          config
        )
          .then(function (response) {
            message.success('رمز عبور با موفقیت تغییر یافت.');
          })
          .catch(error => ({ error }));
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="animated fadeIn">
        <Row className="justify-content-center">
          <Col xs="6" md="6">
            <Card>
              <CardHeader>
                <strong>تغییر رمز عبور</strong>
              </CardHeader>
              <CardBody>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Item>
                    {getFieldDecorator('newPassword', {
                      rules: [{ required: true, message: 'رمز عبور جدید را وارد کنید' }],
                    })(
                      <Input
                        type="text"
                        placeholder="رمز جدید"
                      />,
                    )}
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      ثبت
                    </Button>
                  </Form.Item>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}



export default Form.create()(ChangePassword);
