import React from 'react';
import ReactDOM from 'react-dom';
import { VictoryBar } from 'victory';
import { storiesOf } from '@storybook/react';

storiesOf('Initial Test', module)
  .add('Spooky', () => (
    <VictoryBar />
  ));
