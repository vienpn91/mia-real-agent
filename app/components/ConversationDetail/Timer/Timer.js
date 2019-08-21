import React from 'react';
import Timer from 'react-compound-timer';
import Numeral from 'numeral';
import { Translation } from 'react-i18next';
import {
  TimerContainer, TimerStyled,
  TimerTitle, TimerValue,
} from './Timer.styled';

const TimerWrapper = () => (
  <Translation>
    {
      t => (
        <TimerContainer>
          <TimerStyled span={8}>
            <TimerTitle>
              {t('CONV_MESSAGE_BOX_TIMER_TOTAL')}
            </TimerTitle>
            <TimerValue>
              <span>
                <Timer
                  initialTime={Math.random() * 1000000}
                  formatValue={value => Numeral(value).format('00')}
                >
                  <Timer.Minutes />
            :
                  <Timer.Seconds />
                </Timer>
              </span>
            </TimerValue>
          </TimerStyled>
          <TimerStyled span={8}>
            <TimerTitle>
              {t('CONV_MESSAGE_BOX_TIMER_BILLABLE')}
            </TimerTitle>
            <TimerValue>
              <span>
                <Timer
                  initialTime={Math.random() * 1000000}
                  formatValue={value => Numeral(value).format('00')}
                >
                  <Timer.Minutes />
            :
                  <Timer.Seconds />
                </Timer>
              </span>
            </TimerValue>
          </TimerStyled>
          <TimerStyled span={8}>
            <TimerTitle>
              {t('CONV_MESSAGE_BOX_TIMER_HOLD')}
            </TimerTitle>
            <TimerValue>
              <span>
                <Timer
                  initialTime={Math.random() * 1000000}
                  formatValue={value => Numeral(value).format('00')}
                >
                  <Timer.Minutes />
            :
                  <Timer.Seconds />
                </Timer>
              </span>
            </TimerValue>
          </TimerStyled>
        </TimerContainer>
      )}
  </Translation>
);

export default TimerWrapper;
