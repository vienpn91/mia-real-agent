/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import Scrollbar from 'components/Scrollbar';
import SpinnerLoading from 'components/PageLoading/SpinnerLoading';
import { ItemDetailInfoWrapper } from 'components/Generals/ItemDetail.styled';
import ErrorContent from 'components/ErrorContent';
import ApplicationDetailInfoContent from './ApplicationDetailInfoContent';
import ApplicationDetailInfoHeader from './ApplicationDetailInfoHeader';

const scrollStyle = {
  height: 'calc(100vh - 90px)',
  width: '100%',
};

class applicationDetailInfo extends PureComponent {
  componentDidMount() {
    const { applicationId, fetchApplicationSingle } = this.props;

    fetchApplicationSingle(applicationId);
  }

  componentDidUpdate(prevProps) {
    const { applicationId, fetchApplicationSingle } = this.props;
    const { applicationId: prevapplicationId } = prevProps;

    if (prevapplicationId !== applicationId) {
      fetchApplicationSingle(applicationId);
    }
  }

  render() {
    const { applicationDetail } = this.props;

    if (_isEmpty(applicationDetail) || applicationDetail.isLoading) {
      return (
        <ItemDetailInfoWrapper>
          <SpinnerLoading />
        </ItemDetailInfoWrapper>
      );
    }

    if (applicationDetail.error) {
      return (
        <ItemDetailInfoWrapper>
          <ErrorContent error={applicationDetail.error} />
        </ItemDetailInfoWrapper>
      );
    }

    const { _id, firstName, lastName } = applicationDetail;

    return (
      <ItemDetailInfoWrapper>
        <ApplicationDetailInfoHeader applicationId={_id} firstName={firstName} lastName={lastName} />
        <Scrollbar autoHide style={scrollStyle}>
          <ApplicationDetailInfoContent applicationDetail={applicationDetail} />
        </Scrollbar>
      </ItemDetailInfoWrapper>
    );
  }
}

applicationDetailInfo.propTypes = {
  applicationId: PropTypes.string.isRequired,
  fetchApplicationSingle: PropTypes.func.isRequired,
  applicationDetail: PropTypes.object.isRequired,
};

export default applicationDetailInfo;
