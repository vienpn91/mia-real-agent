import React, { Component } from 'react';
import CreatableSelect from 'react-select/lib/Creatable';
import {
  TrainWrapper,
  TrainTitle,
  TrainUserInput,
  TrainBtnGroup,
  TrainValidateBtn,
  TrainEntityWrapper,
  TrainSubTitle,
  TrainMiaResponseInput,
  TrainerUserInputWrapper,
  TrainerUserInputPlaceHolder,
  TrainResponseWrapper,
  TrainSelectedEntityWrapper,
  TrainSelectedEntity,
  TrainAddResponseBtn,
} from './styles';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const ReactSelectStyle = {
  container: base => ({
    ...base,
    width: '100%',
    border: 'none',
    outline: 'none',
  }),
  control: base => ({
    ...base,
    boxShadow: 'none',
    border: '1px solid black',
    outline: 'none',
  }),
};

class TrainingBox extends Component {
  constructor(props) {
    super(props);

    this.userSayInp = React.createRef();
    this.userSayLabel = React.createRef();
  }

  state = {
    userSay: '',
    miaResponse: '',
    entity: '',
    intent: '',
    entityValue: '',
    currentSelectedText: '',
    intentOptions: options,
    entityOptions: options,
    valueOptions: options,
  }

  handleInput = fieldName => ({ target }) => {
    this.setState({
      [fieldName]: target.value,
    });
  }

  handleUserSayInp = () => {
    const userSay = this.userSayInp.current.innerHTML;
    this.setState({
      userSay,
    });
  }

  handleSelection = () => {
    const { valueOptions } = this.state;
    const selectionObj = window.getSelection();
    const selectedText = selectionObj.toString();
    let entityValue = valueOptions.find(eV => eV.value === selectedText);

    if (!entityValue && !!selectedText.trim()) {
      entityValue = { value: selectedText, label: selectedText };
      this.setState({
        valueOptions: [...valueOptions, entityValue],
      });
    }
    this.setState({
      currentSelectedText: selectedText,
      entityValue,
    });
    // console.log(selectionObj);
    // console.log(selectedText);
  }

  handleEntitySelected = (entity) => {
    this.setState({ entity });
  }

  handleIntentSelected = (intent) => {
    this.setState({ intent });
  }

  handleValueSelected = (entityValue) => {
    this.setState({ entityValue });
  }

  handleEntityCreated = (entity) => {
    const { entityOptions } = this.state;
    const newOption = {
      value: entity,
      label: entity,
    };
    this.setState({
      entityOptions: [...entityOptions, newOption],
      intent: newOption,
    });
  }

  handleIntentCreated = (intent) => {
    const { intentOptions } = this.state;
    const newOption = {
      value: intent,
      label: intent,
    };
    this.setState({
      intentOptions: [...intentOptions, newOption],
      intent: newOption,
    });
  }

  handleValueCreated = (entityValue) => {
    const { valueOptions } = this.state;
    const newOption = {
      value: entityValue,
      label: entityValue,
    };
    this.setState({
      valueOptions: [...valueOptions, newOption],
      entityValue: newOption,
    });
  }

  focusToInput = () => {
    this.userSayInp.current.focus();
  }

  renderEntityBox = () => {
    const {
      entity, currentSelectedText,
      entityOptions,
    } = this.state;
    const entityPlaceholderMessage = `Select or add a new entity ${currentSelectedText ? `for ${currentSelectedText}` : ''}`;

    if (currentSelectedText) {
      return (
        <TrainEntityWrapper>
          <CreatableSelect
            isSearchable
            isClearable
            value={entity}
            options={entityOptions}
            placeholder={entityPlaceholderMessage}
            styles={ReactSelectStyle}
            onChange={this.handleEntitySelected}
            onCreateOption={this.handleEntityCreated}
          />
        </TrainEntityWrapper>
      );
    }
    return null;
  }

  renderUserSay = () => {
    const {
      userSay,
    } = this.state;

    return (
      <TrainerUserInputWrapper>
        <TrainUserInput
          contentEditable
          onInput={this.handleUserSayInp}
          onSelect={this.handleSelection}
          ref={this.userSayInp}
        />
        {
          !userSay ? (
            <TrainerUserInputPlaceHolder
              onClick={this.focusToInput}
            >
              User says
            </TrainerUserInputPlaceHolder>
          ) : null
        }

      </TrainerUserInputWrapper>
    );
  }

  renderIntentBox = () => {
    const {
      intent, intentOptions,
    } = this.state;

    return (
      <TrainEntityWrapper>
        <CreatableSelect
          isSearchable
          isClearable
          value={intent}
          options={intentOptions}
          placeholder="Select or add a new intent"
          styles={ReactSelectStyle}
          onChange={this.handleIntentSelected}
          onCreateOption={this.handleIntentCreated}
        />
      </TrainEntityWrapper>
    );
  }

  renderResponseBox = () => {
    const {
      miaResponse, entity,
      entityValue, valueOptions,
    } = this.state;

    if (!entity) return null;

    return (
      <TrainResponseWrapper>
        <TrainSelectedEntityWrapper>
          <TrainSelectedEntity>{entity.value || 'DMM'}</TrainSelectedEntity>
          <CreatableSelect
            isSearchable
            isClearable
            value={entityValue}
            options={valueOptions}
            placeholder="Select a value for this entity"
            styles={ReactSelectStyle}
            onChange={this.handleValueSelected}
            onCreateOption={this.handleValueCreated}
          />
        </TrainSelectedEntityWrapper>
        <TrainMiaResponseInput
          placeholder="Mia response"
          value={miaResponse}
          onChange={this.handleInput('miaResponse')}
        />
      </TrainResponseWrapper>
    );
  }

  render() {
    const {
      userSay, miaResponse,
      entity, intent, entityValue,
    } = this.state;
    const enableAddRes = entity && miaResponse && entityValue;
    const enableValidate = enableAddRes && userSay && intent;

    return (
      <TrainWrapper>
        <TrainTitle>Mia Training</TrainTitle>
        <TrainSubTitle>You can train your bot by adding more examples</TrainSubTitle>
        {this.renderUserSay()}
        {this.renderIntentBox()}
        {this.renderEntityBox()}
        {this.renderResponseBox()}
        <TrainBtnGroup>
          <TrainAddResponseBtn
            active={enableAddRes}
          >
            Add Response
          </TrainAddResponseBtn>
          <TrainValidateBtn
            active={enableValidate}
          >
            <i className="icon-check" />
            Validate
          </TrainValidateBtn>
        </TrainBtnGroup>
      </TrainWrapper>
    );
  }
}


export default TrainingBox;
