import React from 'react';
import styled from 'react-emotion';
import _ from 'lodash';
import { VictoryChart, VictoryLegend, VictoryAxis, VictoryStack, VictoryBar } from 'victory';
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
  }, []);
};

/**
 * Maps generation collection to a visualization collection.
 *
 * @param {Array.<Object>} generationCollection The Pokemon collection sorted by Generation.
 * @returns {Array.<Object>}                    The collection mapped to data.
 */
const mapGenerationToVisualization = (generationCollection) => {
  return generationCollection.map(generation => {
    let generationNumber = generation[0].generation;

    return {
      x: generationNumber,
      y: generation.length
    }
  });
}

const mapPokemonByType = (typeCollection) => {
  const keyedByType = Object.keys(typeCollection);

  return keyedByType.map(type => {
    return {
      x: type.replace(/^\w/, char => char.toUpperCase()),
      y: typeCollection[type].length
    }
  });
};

const PokemonWrapper = styled.div({
  fontFamily: `-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif`,
  fontSize: 16
});

const Description = styled.div({
  border: '1px solid #DDDDDD',
  display: 'block',
  width: '92%',
  height: 120,
  borderRadius: 5,
  boxShadow: `0px 2px 2px 0px rgba(0,0,0,0.10)`,
  padding: '0px 20px 10px 30px',
  marginBottom: 10
});

const Byline = styled.p({
  marginLeft: 60,
  fontWeight: 400,
  fontSize: 14
});

const GraphWrapper = styled.div({
  display: 'block',
  borderRadius: 5,
  width: '92%',
  border: '1px solid #DDDDDD',
  boxShadow: `0px 2px 2px 0px rgba(0,0,0,0.10)`,
  padding: '0px 20px 10px 30px',
});

storiesOf('Pokemon', module)
  .add('Number of Ghost Pokemon', () => {
    const totalPrimaryGhostPokemon = pokemonData.filter(pokemon => pokemon.type1 === 'ghost');
    const totalSecondaryGhostPokemon = pokemonData.filter(pokemon => pokemon.type2 === 'ghost');
    const allGhostPokemon = pokemonData.filter(pokemon => pokemon.type1 === 'ghost' || pokemon.type2 === 'ghost');
    const primaryByGeneration = reducerByKey(totalPrimaryGhostPokemon, 'generation');
    const secondaryByGeneration = reducerByKey(totalSecondaryGhostPokemon, 'generation');
    const sortedPrimaryByGeneration = mapGenerationToVisualization(primaryByGeneration);
    const sortedSecondaryByGeneration = mapGenerationToVisualization(secondaryByGeneration);

    return (
      <PokemonWrapper>
        <Description>
          <p>Total Pokemon with Ghost type as their primary type: {totalPrimaryGhostPokemon.length}</p>
          <p>Total Pokemon with Ghost type as their secondary type: {totalSecondaryGhostPokemon.length}</p>
          <p>Adding up to a total of {allGhostPokemon.length} Ghost type Pokemon across 8 generations <sup>*</sup> </p>
        </Description>

        <GraphWrapper>
          <VictoryChart
            width={500}
            height={300}
            domainPadding={{ x: 15 }}
            domain={{ y: [0, 10]}}
            >
            <VictoryLegend
              x={20}
              gutter={20}
              orientation="horizontal"
              style={{ data: { strokeWidth: 2, fontSize: 10 } }}
              data={[
                { name: 'Primary Ghost Type', symbol: { fill: '#78719D' }},
                { name: 'Secondary Ghost Type', symbol: { fill: '#A39BB4' }}
              ]}
            />
            <VictoryAxis tickFormat={(t) => `Gen ${Math.round(t)}`}/>
            <VictoryAxis dependentAxis={true} />
            <VictoryStack style={{
              data: { stroke: "black", strokeWidth: 1 }
              }}>
              <VictoryBar
                style={{
                  data: {
                    fill: '#78719D'
                  }
                }}
                data={sortedPrimaryByGeneration} />
              <VictoryBar
                style={{
                  data: {
                    fill: '#A39BB4'
                  }
                }}
                data={sortedSecondaryByGeneration}
              />
            </VictoryStack>
          </VictoryChart>
          <Byline> <sup>*</sup> Based on 801 Pokedex entries, excluding Alolan forms </Byline>
        </GraphWrapper>
      </PokemonWrapper>
    );
  })
  .add('Ghost Pokemon vs Other Types', () => {
    const primaryPokemonByType = reducerByKey(pokemonData, 'type1');
    const mappedPrimaryPokemonByType = mapPokemonByType(primaryPokemonByType);
    const sortedPrimaryPokemoneyByType = _.sortBy(mappedPrimaryPokemonByType, [(type) => type.y])
    const typeColorScale=[
      '#557287',
      '#EC1E75',
      '#90D6F4',
      '#6C8079',
      '#3A3C74',
      '#51959E',
      '#A1492F',
      '#646582',
      '#683892',
      '#785327',
      '#E5E54A',
      '#95472B',
      '#B2252D',
      '#AD3377',
      '#49A25D',
      '#3AD061',
      '#CFA3AF',
      '#2061E1'
    ];

    return (
      <GraphWrapper>
        <VictoryChart
          padding={{ top: 20, bottom: 30, left: 60 }}
          width={600}
          height={450}
          domainPadding={{ y: 10 }}>
          <VictoryBar
            horizontal
            colorScale={typeColorScale}
            style={{
              data: { fill: data => typeColorScale[data._x - 1] }
            }}
            data={sortedPrimaryPokemoneyByType}
          />
        </VictoryChart>
      </GraphWrapper>
    );
  });
