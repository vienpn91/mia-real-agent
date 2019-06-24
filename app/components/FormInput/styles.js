import styled, { css } from 'styled-components';
import { Button, Form, Input } from 'antd';

export const InputGroupPrepend = styled.div`
  padding: 0 15px;
  border: 1px solid var(--zigvy-col-border);
  border-right: none;
  height: 100%;
  display: flex;
  align-items: center;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  color: var(--zigvy-col-extra-light-grey);
  font-family: 'Proxima Nova Rg';
`;

export const Break = styled.div`
  flex-basis: 100%;
  width: 0px;
  height: 0px;
  overflow: hidden;
`;
export const Label = styled.span`
  margin-left: 30px;
`;

export const CheckMark = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: #fff;
    border: 1px solid var(--zigvy-col-border);
    border-radius: 4px;
`;

export const CheckBoxWrapper = styled.label`
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: flex;
  align-items: center;
  height: 20px;
  
  input[type=checkbox] {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    width: 0;
    height: 0;
  }
  
  input:checked ~ ${CheckMark} {
    display: flex;
    justify-content: center;
    align-items: center;
    
    span {
      display: block;
      width: 12px;
      height: 12px;
      background-color: var(--zigvy-col-blue);
      border-radius: 3px;
    }
  }
  
  &:hover {
    ${CheckMark} {
      
    }
  }
`;

export const DatePickerWrapper = styled.div`
  .react-datepicker-wrapper {
    display: block;
  }
  
  .react-datepicker__input-container {
    display: block;
  }
`;

export const AddParamButton = styled(Button).attrs({
  className: 'add-param-button',
})`
  right: 35px !important;
`;

export const FormItemStyled = styled(Form.Item).attrs({
  className: 'ant-form-item__richEditor',
})``;

export const InputWrapper = styled.div`
  width: 100%;
  text-align: left;
  margin-bottom: 30px;
`;

export const InputStyled = styled(Input)`
  width: 100% !important;
  height: 36px !important;
  border: 0 !important;
  padding: 8px !important;
  outline: 0 none !important;
  transition: border-color .2s linear !important;
  border-bottom: 1px solid #000 !important;
  -webkit-font-smoothing: antialiased !important;
  border-radius: 0 !important;
  background: transparent !important;
  &:focus {
    box-shadow: none !important;
    border: 1px solid #000 !important;
    border-radius: 2px !important;
  }
  &:hover {
    transition: all 300ms ease;
    background-color: #ddd;
  }
`;

export const InputWrapperStyled = styled(Form.Item)`
  color: #000;
  label{
    float: left;
    ::after{
      content: '' !important;
    }
  }
  .ant-select-selection {
    background-color: transparent;
    border-radius: 0px;
    border: none;
    border-bottom: 1px solid #000;
    &:focus {
      box-shadow: none;
      border-radius: 2px;
      border: 1px solid #000;
    }
    &:hover {
      border-color: #000;
    }
    .anticon-down {
      color: #000;
    }
  }
  .ant-select-open .ant-select-selection {
    border-color: #000;
  }
  .ant-select-selection__rendered {
    outline: none;
  }
`;
