/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import {
  string, func, node,
  oneOfType,
  bool,
} from 'prop-types';
import { POPUP_TYPE } from '../../../common/enums';
import {
  PopupOverlayWrapper,
  PopupModalWrapper,
  PopupHeader,
  PopupContent,
  PopupGroupAction,
} from './Popup.styled';
import { DefaultButton } from '../Generals/general.styles';
import LoadingSpin from '../Loading';

export default class PopupOverlay extends Component {
  static propTypes = {
    type: string,
    loading: bool,
    content: oneOfType([string, node]),
    onSubmit: func,
    onClose: func,
  }

  static defaultProps = {
    loading: false,
  }

  renderConfirmPopup = () => {
    const { onClose } = this.props;
    return (
      <PopupGroupAction>
        <DefaultButton type="submit">Accept</DefaultButton>
        <DefaultButton cancel onClick={onClose}>Cancel</DefaultButton>
      </PopupGroupAction>
    );
  }

  renderMessagePopup = () => {
    const { type, onClose, onSubmit } = this.props;
    const error = type === POPUP_TYPE.ERROR;
    return (
      <PopupGroupAction>
        <DefaultButton
          error={error}
          type="button"
          onClick={onSubmit}
        >
          Ok
        </DefaultButton>
        <DefaultButton cancel onClick={onClose}>Cancel</DefaultButton>
      </PopupGroupAction>
    );
  }

  renderGroupAction = () => {
    const { type } = this.props;
    if (type === POPUP_TYPE.CONFIRM) {
      return this.renderConfirmPopup();
    }
    return this.renderMessagePopup();
  }

  render() {
    const { type, content, loading } = this.props;
    const error = type === POPUP_TYPE.ERROR;
    return (
      <PopupOverlayWrapper>
        <PopupModalWrapper>
          <LoadingSpin loading={loading}>
            <PopupHeader
              error={error}
            >
              <span>{type}</span>
            </PopupHeader>
            <PopupContent>
              {content}
            </PopupContent>
            {this.renderGroupAction()}
          </LoadingSpin>
        </PopupModalWrapper>
      </PopupOverlayWrapper>
    );
  }
}
