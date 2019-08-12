import React, { PureComponent } from 'react';
import RequestList from '../../containers/RequestList';

export class RequestTab extends PureComponent {
  render() {
    return (
      <div>
        <RequestList />
      </div>
    );
  }
}

export default RequestTab;
