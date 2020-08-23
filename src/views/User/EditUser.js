import React, { Component } from 'react';
import { Modal } from "antd";
import UserForm from "./UserForm";

class EditUser extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      id: props.rowId
    };
  }

  handleSubmit = (values) => {
    this.props.dispatch(this.props.rowId, values)
    this.props.handleModal()
  }
  render() {
    return (
      <div>
        <Modal
          title="ویرایش اطلاعات کاربر"
          visible={this.props.open}
          onCancel={this.props.handleModal}
          footer={null}
        >
          <UserForm user={this.props.user} status="update" handleSubmit={this.handleSubmit} />
        </Modal>
      </div>
    );
  }
}

export default EditUser;
