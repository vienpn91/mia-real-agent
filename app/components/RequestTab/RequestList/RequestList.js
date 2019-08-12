import React, { PureComponent } from 'react';
import { func, arrayOf, shape } from 'prop-types';
import RequestItem from '../RequestItem/RequestItem';

export class RequestList extends PureComponent {
  static propTypes = {
    requestList: arrayOf(shape()).isRequired,
    onAccept: func.isRequired,
    onCancel: func.isRequired,
  }

  render() {
    const { onAccept, onCancel, requestList } = this.props;
    return (
      <div>
        {requestList.map(request => (
          <RequestItem
            request={request}
            onAccept={onAccept}
            onCancel={onCancel}
          />
        ))}
      </div>
    );
  }
}

export default RequestList;
