/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  ItemDetailInfoHeaderWrapper,
  ItemDetailInfoActionGroup,
  ItemDetailInfoHeadTitle,
} from 'components/Generals/ItemDetail.styled';
import { Icon, Button } from 'antd';
import { APPLICATION_STATUS } from '../../../common/enums';

class ApplicationDetailInfoHeader extends PureComponent {
  handleApprove = () => {
    const { applicationId, actions } = this.props;
    actions.applicationApprove({ _id: applicationId });
  }

  handleReject = () => {
    const { applicationId, actions } = this.props;
    actions.applicationReject({ _id: applicationId });
  }

  render() {
    const { firstName, lastName, status } = this.props;
    return (
      <ItemDetailInfoHeaderWrapper>
        <ItemDetailInfoHeadTitle>{`${firstName} ${lastName} [${status}]`}</ItemDetailInfoHeadTitle>
        <ItemDetailInfoActionGroup noTitle>
          {status === APPLICATION_STATUS.PENDING && [(<Button
            type="primary"
            onClick={this.handleApprove}
          >
            Approve
          </Button>),
          (<Button onClick={this.handleReject}>
            Reject
          </Button>)]}
          <Link to="/admin/applications" className="close-action">
            <Icon type="close" />
          </Link>
        </ItemDetailInfoActionGroup>
      </ItemDetailInfoHeaderWrapper>
    );
  }
}

ApplicationDetailInfoHeader.propTypes = {
  applicationId: PropTypes.string.isRequired,
  actions: PropTypes.shape().isRequired,
  status: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
};

export default ApplicationDetailInfoHeader;
