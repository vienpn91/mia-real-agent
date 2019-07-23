import React, { PureComponent } from 'react';
import {
  Modal, Row, Col, Button,
} from 'antd';
import moment from 'moment';
import { func, shape, bool } from 'prop-types';
import { DATE_TIME_FORMAT } from '../../utils/constants';

export class ApplicationDetailExperienceDetail extends PureComponent {
  static propTypes = {
    isOpen: bool.isRequired,
    handleClose: func.isRequired,
    experience: shape(),
  }

  render() {
    const { handleClose, experience, isOpen } = this.props;
    const {
      title, company,
      from, to,
      isWorking, roleDescription,
    } = experience || {};
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
            Title
          </Col>
          <Col sm={12} xs={24}>
            {title}
          </Col>
        </Row>
        <Row gutter={32}>
          <Col sm={12} xs={24}>
            Company
          </Col>
          <Col sm={12} xs={24}>
            {company}
          </Col>
        </Row>
        <Row gutter={32}>
          <Col sm={12} xs={24}>
            From
          </Col>
          <Col sm={12} xs={24}>
            {moment(from).format(DATE_TIME_FORMAT.DATE)}
          </Col>
        </Row>
        <Row gutter={32}>
          <Col sm={12} xs={24}>
            To
          </Col>
          <Col sm={12} xs={24}>
            {isWorking ? 'Now' : moment(to).format(DATE_TIME_FORMAT.DATE)}
          </Col>
        </Row>
        <Row gutter={32}>
          <Col sm={12} xs={24}>
            Title
          </Col>
          <Col sm={12} xs={24}>
            {title}
          </Col>
        </Row>
        <Row gutter={32}>
          <Col sm={12} xs={24}>
            Role description
          </Col>
          <Col sm={12} xs={24}>
            {roleDescription}
          </Col>
        </Row>
      </Modal>
    );
  }
}

export default ApplicationDetailExperienceDetail;
