import { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment/min/moment-with-locales';
import { string, shape } from 'prop-types';
import { withTranslation } from 'react-i18next';
import { getSystemLanguage } from '../../reducers/system';

class Translator extends Component {
  static propTypes = {
    lng: string.isRequired,
    i18n: shape().isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.lng !== this.props.lng;
  }

  render() {
    const { lng, i18n } = this.props;
    moment.locale(lng === 'vn' ? 'vi' : 'en');
    i18n.changeLanguage(lng);
    return null;
  }
}

const mapStateToProp = state => ({
  lng: getSystemLanguage(state),
});

export default withTranslation()(connect(mapStateToProp)(Translator));
