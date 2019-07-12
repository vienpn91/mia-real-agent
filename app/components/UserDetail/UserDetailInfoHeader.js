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

class UserDetailInfoHeader extends PureComponent {
  goToEditPage = () => {
    const { userId } = this.props;
    history.push(`/admin/users/${userId}/edit`);
  };

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
        </ItemDetailInfoActionGroup>
      </ItemDetailInfoHeaderWrapper>
    );
  }
}

UserDetailInfoHeader.propTypes = {
  userId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default UserDetailInfoHeader;
