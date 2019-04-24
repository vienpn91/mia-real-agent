import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CreatableSelect from 'react-select/lib/Creatable';
import ResponseBox from '../../containers/ResponseBox';
import {
  TrainWrapper,
  TrainTitle,
  TrainUserInput,
  TrainBtnGroup,
  TrainValidateBtn,
  TrainEntityWrapper,
  TrainSubTitle,
  TrainerUserInputWrapper,
  TrainerUserInputPlaceHolder,
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
    width: '33%',
    flex: 1,
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
  static propTypes = {
    updateField: PropTypes.func.isRequired,
    intent: PropTypes.objectOf(PropTypes.any),
    userSay: PropTypes.string,
    miaResponse: PropTypes.string,
    entity: PropTypes.objectOf(PropTypes.any),
    value: PropTypes.objectOf(PropTypes.any),
  }

  static defaultProps = {
    intent: null,
    miaResponse: '',
    entity: null,
    value: null,
    userSay: '',
  }

  constructor(props) {
    super(props);

    this.userSayInp = React.createRef();
    this.userSayLabel = React.createRef();
  }

  componentDidMount() {
    this.focusToInput();
  }

  state = {
    intentOptions: options,
    valueOptions: options,
  }

  handleUserSayInp = () => {
    const { updateField } = this.props;
    const userSay = this.userSayInp.current.innerHTML;
    updateField('userSay', userSay);
  }

  handleSelection = () => {
    const { updateField } = this.props;
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

    const { anchorOffset = 0 } = selectionObj;

    updateField('selectedText', selectedText);
    updateField('start', anchorOffset);
    updateField('end', anchorOffset + selectedText.length);
    updateField('value', entityValue);
    // console.log(selectionObj);
    // console.log(selectedText);
  }

  handleIntentSelected = (intent) => {
    const { updateField } = this.props;
    updateField('intent', intent);
  }

  handleIntentCreated = (intent) => {
    const { intentOptions } = this.state;
    const newOption = {
      value: intent,
      label: intent,
    };
    this.handleIntentSelected(newOption);
    this.setState({
      intentOptions: [...intentOptions, newOption],
    });
  }

  focusToInput = () => {
    this.userSayInp.current.focus();
  }

  renderUserSay = () => {
    const {
      userSay,
    } = this.props;

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
      intentOptions,
    } = this.state;
    const { userSay, intent } = this.props;

    return (
      <TrainEntityWrapper>
        <CreatableSelect
          isSearchable
          isClearable
          isDisabled={!userSay}
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

  renderButtonGroup = () => {
    const {
      userSay, intent,
      miaResponse,
      entity, value,
    } = this.props;
    const enableAddRes = entity && miaResponse && value;
    const enableValidate = enableAddRes && userSay && intent;

    return (
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
    );
  }

  render() {
    const { entities } = this.props;
    return (
      <TrainWrapper>
        <TrainTitle>Mia Training</TrainTitle>
        <TrainSubTitle>You can train your bot by adding more examples</TrainSubTitle>
        {this.renderUserSay()}
        {this.renderIntentBox()}
        <ResponseBox />
        {this.renderButtonGroup()}
      </TrainWrapper>
    );
  }
}


export default TrainingBox;
