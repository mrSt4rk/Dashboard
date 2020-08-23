import React, { Component } from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row
} from 'reactstrap';


class Dashboard extends Component {
  constructor(props) {
    super(props);

    console.log('dashboard props', props);

  }




  loading = () => <div className="animated fadeIn pt-1 text-center">در حال بارگذاری...</div>;

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">

          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
