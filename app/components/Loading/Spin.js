import React from 'react';
import { Spin, Icon } from 'antd';
import PropTypes from 'prop-types';

const loadingIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const LoadingSpin = ({ loading, children }) => (
  <Spin indicator={loadingIcon} spinning={loading}>
    {children}
  </Spin>
);

LoadingSpin.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default LoadingSpin;
