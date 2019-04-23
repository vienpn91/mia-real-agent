import React, { Component } from 'react';
import CreatableSelect from 'react-select/lib/Creatable';
import {
  TrainWrapper,
  TrainTitle,
  TrainUserInput,
  TrainAddEntityBtn,
  TrainValidateBtn,
  TrainEntityWrapper,
  TrainSubTitle,
  TrainMiaResponseInput,
  TrainerUserInputWrapper,
  TrainerUserInputPlaceHolder,
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
    border: 'none',
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
    const selectionObj = window.getSelection();
    const selectedText = selectionObj.toString();
    // console.log(selectionObj);
    // console.log(selectedText);
  }

  handleEntitySelected = (entity) => {
    this.setState({ entity });
  }

  focusToInput = () => {
    this.userSayInp.current.focus();
  }

  render() {
    const {
      userSay, miaResponse, entity,
    } = this.state;
    const enableValidate = userSay && miaResponse && entity;

    return (
      <TrainWrapper>
        <TrainTitle>Mia Training</TrainTitle>
        <TrainSubTitle>You can train your bot by adding more examples</TrainSubTitle>
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
        <TrainEntityWrapper>
          <TrainAddEntityBtn>
            <i className="icon-add" />
          </TrainAddEntityBtn>
          <CreatableSelect
            isSearchable
            isClearable
            placeholder="Add a new entity"
            value={entity}
            onChange={this.handleEntitySelected}
            options={options}
            styles={ReactSelectStyle}
          />
        </TrainEntityWrapper>
        <TrainMiaResponseInput
          placeholder="Mia response"
          value={miaResponse}
          onChange={this.handleInput('miaResponse')}
        />
        <TrainValidateBtn
          active={enableValidate}
        >
          <i className="icon-check" />
          Validate
        </TrainValidateBtn>
      </TrainWrapper>
    );
  }
}


export default TrainingBox;
