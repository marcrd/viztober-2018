import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/spooky.js');
}

configure(loadStories, module);
