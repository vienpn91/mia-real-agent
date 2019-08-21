/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import history from 'utils/history';
import {
  ItemDetailInfoHeaderWrapper,
  ItemDetailInfoActionGroup,
  ItemDetailInfoHeadTitle,
} from 'components/Generals/ItemDetail.styled';
import { IconStyled } from 'components/Generals/General.styled';
import { Button, Popconfirm } from 'antd';
import { toI18n } from '../../utils/func-utils';

class UserDetailInfoHeader extends PureComponent {
  goToEditPage = () => {
    const { userId } = this.props;
    history.push(`/admin/users/${userId}/edit`);
  };

  handleRemove = () => {
    const { removeUser, userId } = this.props;
    removeUser(userId);
  }

  render() {
    const { username } = this.props;
    return (
      <ItemDetailInfoHeaderWrapper>
        <ItemDetailInfoHeadTitle>{username}</ItemDetailInfoHeadTitle>
        <ItemDetailInfoActionGroup noTitle>
          <IconStyled className="icon-pencil" onClick={this.goToEditPage} />
          <Link to="/admin/users" className="close-action">
            <IconStyled className="icon-close" />
          </Link>
          <Popconfirm
            title={toI18n('ADMIN_USERS_DETAIL_CONFIRM')}
            onConfirm={this.handleRemove}
            okText={toI18n('FORM_YES')}
            cancelText={toI18n('FORM_NO')}
          >
            <Button>
              {toI18n('ADMIN_USERS_DETAIL_REMOVE')}
            </Button>
          </Popconfirm>
        </ItemDetailInfoActionGroup>
      </ItemDetailInfoHeaderWrapper>
    );
  }
}

UserDetailInfoHeader.propTypes = {
  userId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  removeUser: PropTypes.func.isRequired,
};

export default UserDetailInfoHeader;
