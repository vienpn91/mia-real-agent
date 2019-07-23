import React, { PureComponent } from 'react';
import {
  Modal, Row, Col, Button,
} from 'antd';
import { func, shape, bool } from 'prop-types';

export class ApplicationDetailEducationDetail extends PureComponent {
  static propTypes = {
    isOpen: bool.isRequired,
    handleClose: func.isRequired,
    education: shape(),
  }

  render() {
    const { handleClose, education, isOpen } = this.props;
    const {
      school, degree,
      gpa, certificate,
    } = education || {};
    return (
      <Modal
        onCancel={handleClose}
        visible={isOpen}
        footer={[
          (
            <Button onClick={handleClose}>
              Close
            </Button>
          ),
        ]}
      >
        <Row gutter={32}>
          <Col sm={12} xs={24}>
            School
          </Col>
          <Col sm={12} xs={24}>
            {school}
          </Col>
        </Row>
        <Row gutter={32}>
          <Col sm={12} xs={24}>
            Degree
          </Col>
          <Col sm={12} xs={24}>
            {degree}
          </Col>
        </Row>
        <Row gutter={32}>
          <Col sm={12} xs={24}>
            GPA
          </Col>
          <Col sm={12} xs={24}>
            {gpa}
          </Col>
        </Row>
        <Row gutter={32}>
          <Col sm={12} xs={24}>
            Certificate
          </Col>
          <Col sm={12} xs={24}>
            {certificate}
          </Col>
        </Row>
      </Modal>
    );
  }
}

export default ApplicationDetailEducationDetail;
