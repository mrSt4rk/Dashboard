import React from 'react';
import { Table, Spin } from 'antd';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row
} from 'reactstrap';
import EditUser from './EditUser'
import { Button, Form, Input, Select } from "antd";
import Users from '../../reducers/user/user.interface';
const { Option } = Select;
let filters: [{ column: [{ id: string, type: string }, { status: Array<{ id: number, value: string }>, type: string }, { created_at: string, type: string }, { type: string }] }] = [{ column: [{ id: 'id', type: 'input' }, { status: [{ id: 0, value: 'active' }, { id: 1, value: 'waiting' }], type: 'select' }, { created_at: '', type: 'date' }, { type: 'submit' }] }];

interface Props {
  usersList: (values: any) => void,
  fetchUser: (id: number) => void,
  updateSingleUser: () => void,
  fetchedUsers: {
    users: Users[],
    loading: boolean,
    singleUser: Object
  },
  form: any
}

const UsersList: React.FunctionComponent<Props> = (props) => {

  const [openModal, setOpenModal] = React.useState(false);
  const [rowId, setRowId] = React.useState(0);



  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
    },
    {
      title: 'Master',
      dataIndex: 'Master',
      key: 'Master',
    },
    {
      title: 'Affiliate',
      dataIndex: 'Affiliate',
      key: 'Affiliate',
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: 'Mobile',
      dataIndex: 'Mobile',
      key: 'Mobile',
    },
    {
      title: 'Ballance',
      dataIndex: 'Ballance',
      key: 'Ballance',
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: (text: string, record: any) =>
        props.fetchedUsers.users.length >= 1 ? (
          <span>
            <a onClick={() => handleEdit(record.key)}>ویرایش </a>
          </span>

        ) : null,
    },
  ];




  React.useEffect(() => {

    props.usersList(null);
  }, []);


  const handleEdit = (id: number) => {
    props.fetchUser(id)
    setRowId(id);
    setOpenModal(!openModal);
  }

  const handleModal = () => {
    setOpenModal(!openModal);
  }

  const loadForm = () => {
    const items: any[] = [];

    filters.map((item: any, i) => {
      item.column.forEach((ii: any, x: number) => {
        switch (ii.type) {
          case 'input':
            items.push(<Form.Item key={x} label={ii.id}>
              {props.form.getFieldDecorator(ii.id, {
                rules: [],
              })(
                <Input
                  type="text"
                  placeholder={ii.id}
                />)}
            </Form.Item>);
            break;
          case 'select':
            items.push(<Form.Item label="تایید">
              {props.form.getFieldDecorator('status', {
                rules: [],
              })
                (<Select>
                  {ii.status.map((opt: any) => (
                    <Option key={opt.id} value={opt.value}>{opt.value}</Option>
                  ))}
                </Select>)}
            </Form.Item>);
            break;
          case 'date':
            items.push(<Form.Item label="تاریخ ایجاد">
              {props.form.getFieldDecorator('created_at_from', {
                rules: [],
              })
                (<Input type="date" placeholder="تاریخ ایجاد" />)}
            </Form.Item>)
            break;
          case 'submit':
            items.push(<Form.Item>
              <Button type="primary" htmlType="submit">
                ثبت
              </Button>
            </Form.Item>)
            break;
        }
      })

    });

    return items;
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFields((err: any, values: any) => {
      if (!err) {
        values = { ...values };
        props.usersList(values);
      }
    });
  }



  return (

    <div className="animated fadeIn">
      <Row className="justify-content-center">
        <Col xs="12" md="12">
          <Card>
            <CardHeader>
              <strong>فهرست کاربران</strong>
            </CardHeader>
            <CardBody>
              <Spin spinning={props.fetchedUsers.loading} delay={500}>
                <Form onSubmit={handleSubmit}>{loadForm()}</Form>
                {props.fetchedUsers.users && <Table className="rtl text-right" columns={columns} pagination={{ pageSize: 5 }} dataSource={props.fetchedUsers.users} />}
              </Spin>
              <EditUser dispatch={props.updateSingleUser} handleModal={handleModal} user={props.fetchedUsers.singleUser} open={openModal} handleSubmit={handleEdit} rowId={rowId} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )


}

export default Form.create()(UsersList);
