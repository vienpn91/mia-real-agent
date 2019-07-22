import React from 'react';
import PropTypes from 'prop-types';
import {
  ItemDetailListItem,
  ItemDetailInput,
  ItemDetailName,
  ItemStatus,
} from 'components/Generals/ItemDetail.styled';
import history from 'utils/history';

class UserListItem extends React.PureComponent {
  onClick = () => {
    const {
      item: { _id },
    } = this.props;

    history.push(`/admin/applications/${_id}`);
  };

  render() {
    const { item: application, active } = this.props;
    const { firstName, lastName, status } = application;

    return (
      <ItemDetailListItem active={active} onClick={this.onClick}>
        <ItemDetailInput>
          <input type="checkbox" />
        </ItemDetailInput>
        <ItemDetailName>
          {`${firstName} ${lastName}`}
          <ItemStatus>
            {status}
          </ItemStatus>
        </ItemDetailName>
      </ItemDetailListItem>
    );
  }
}

UserListItem.propTypes = {
  active: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
};

export default UserListItem;
