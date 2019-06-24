/* eslint-disable react/button-has-type */
import React, { Component } from 'react';
import { string, func } from 'prop-types';
import { POPUP_TYPE } from '../../../common/enums';
import {
  PopupOverlayWrapper,
  PopupModalWrapper,
  PopupHeader,
  PopupContent,
  PopupGroupAction,
} from './Popup.styled';
import { DefaultButton } from '../Generals/general.styles';

export default class PopupOverlay extends Component {
  static propTypes = {
    type: string,
    textContent: string,
    onClose: func,
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
    const { type, onClose } = this.props;
    const error = type === POPUP_TYPE.ERROR;
    return (
      <PopupGroupAction>
        <DefaultButton
          error={error}
          type="submit"
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
    const { type, textContent } = this.props;
    const error = type === POPUP_TYPE.ERROR;
    return (
      <PopupOverlayWrapper>
        <PopupModalWrapper>
          <PopupHeader
            error={error}
          >
            <span>{type}</span>
          </PopupHeader>
          <PopupContent>
            <p>{textContent}</p>
          </PopupContent>
          {this.renderGroupAction()}
        </PopupModalWrapper>
      </PopupOverlayWrapper>
    );
  }
}
