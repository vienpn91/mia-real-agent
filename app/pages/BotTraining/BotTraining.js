import React from 'react';
import TrainingBox from '../../components/TrainingBox';
import EntityList from '../../components/EntityList';
import { BotTrainningWrapper, Seperator } from './styles';

const BotTraining = () => (
  <BotTrainningWrapper>
    <TrainingBox />
    <Seperator />
    <EntityList />
  </BotTrainningWrapper>
);

export default BotTraining;
