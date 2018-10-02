import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'react-emotion';
import { VictoryBar } from 'victory';
import { storiesOf } from '@storybook/react';
// https://www.kaggle.com/rounakbanik/pokemon
import pokemonData from '../datasets/pokemon.csv';

/**
 * Breaks down collections by key.
 *
 * @param {Array.<Object>} collection The collection to sort.
 * @param {string}         keyName    The key to sort the collection by.
 * @returns {Array.<Object>}          The sorted collection.
 */
const reducerByKey = (collection, keyName) => {
  return collection.reduce((acc, obj) => {
    var key = obj[keyName];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
};

const PokemonWrapper = styled.div({
  fontFamily: `-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif`
})

storiesOf('Pokemon', module)
  .add('Number of Ghost Pokemon', () => {
    return (
      <PokemonWrapper>
        <p>Total Pokemon with Ghost type as their primary type: {totalPrimaryGhostPokemon.length}</p>
        <p>Total Pokemon with Ghost type as their secondary type: {totalSecondaryGhostPokemon.length}</p>
      </PokemonWrapper>
    );
  });

// Build out Pokemon Data set
const totalPrimaryGhostPokemon = pokemonData.filter(pokemon => pokemon.type1 === 'ghost');
const totalSecondaryGhostPokemon = pokemonData.filter(pokemon => pokemon.type2 === 'ghost');
const primaryByGeneration = reducerByKey(totalPrimaryGhostPokemon, 'generation');
const secondaryByGeneration = reducerByKey(totalSecondaryGhostPokemon, 'generation');
