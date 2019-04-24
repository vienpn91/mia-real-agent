import React, { Component } from 'react';
import CreatableSelect from 'react-select/lib/Creatable';
import PropTypes from 'prop-types';
import {
  TrainEntityWrapper,
  TrainMiaResponseInput,
  TrainResponseWrapper,
  TrainSelectWrapper,
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

class ResponseBox extends Component {
  static propTypes = {
    updateField: PropTypes.func.isRequired,
    response: PropTypes.string,
    selectedText: PropTypes.string,
    entity: PropTypes.objectOf(PropTypes.any),
    entityValue: PropTypes.objectOf(PropTypes.any),
  }

  static defaultProps = {
    selectedText: '',
    response: '',
    entity: '',
    entityValue: '',
  }

  state = {
    entityOptions: options,
    valueOptions: options,
  }

  handleMiaResponseInput = ({ target }) => {
    const { updateField } = this.props;
    updateField('response', target.value);
  }


  handleValueCreated = (entityValue) => {
    const { updateField } = this.props;
    const { valueOptions } = this.state;
    const newOption = {
      value: entityValue,
      label: entityValue,
    };

    updateField('value', newOption);
    this.setState({
      valueOptions: [...valueOptions, newOption],
    });
  }


  handleEntitySelected = (entity) => {
    const { updateField } = this.props;
    updateField('entity', entity);
  }

  handleValueSelected = (entityValue) => {
    const { updateField } = this.props;
    updateField('value', entityValue);
  }

  handleEntityCreated = (entity) => {
    const { updateField } = this.props;
    const { entityOptions } = this.state;
    const newOption = {
      value: entity,
      label: entity,
    };
    updateField('intent', newOption);
    this.setState({
      entityOptions: [...entityOptions, newOption],
    });
  }

  renderEntityBox = () => {
    const { entityOptions } = this.state;
    const { entity, selectedText } = this.props;
    const entityPlaceholderMessage = `Select or add a new entity ${selectedText ? `for ${selectedText}` : ''}`;

    return (
      <TrainEntityWrapper>
        <CreatableSelect
          isSearchable
          isClearable
          isDisabled={!selectedText}
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


  renderValueBox = () => {
    const { valueOptions } = this.state;
    const { entityValue, entity } = this.props;

    return (
      <TrainEntityWrapper>
        <CreatableSelect
          isSearchable
          isClearable
          isDisabled={!entity}
          value={entityValue}
          options={valueOptions}
          placeholder="Select a value for this entity"
          styles={ReactSelectStyle}
          onChange={this.handleValueSelected}
          onCreateOption={this.handleValueCreated}
        />
      </TrainEntityWrapper>
    );
  }

  renderResponseBox = () => {
    const { response, entity } = this.props;

    return (
      <TrainResponseWrapper>
        <TrainMiaResponseInput
          disabled={!entity}
          placeholder="Mia response"
          value={response}
          onChange={this.handleMiaResponseInput}
        />
      </TrainResponseWrapper>
    );
  }

  render() {
    return (
      <>
        <TrainSelectWrapper>
          {this.renderEntityBox()}
          {this.renderValueBox()}
        </TrainSelectWrapper>
        {this.renderResponseBox()}
      </>
    );
  }
}

ResponseBox.propTypes = {

};

export default ResponseBox;
