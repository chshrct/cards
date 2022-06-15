import { ONE, ZERO } from 'constant';

export function getRandomArbitrary(min: number, max: number): number {
  const minF = Math.ceil(min);
  const maxF = Math.floor(max);
  return Math.floor(Math.random() * (maxF - minF + ONE)) + minF;
}

export function weightedRandom<T>(items: T[], weights: number[]): T {
  if (items.length !== weights.length) {
    throw new Error('Items and weights must be of the same size');
  }
  if (!items.length) {
    throw new Error('Items must not be empty');
  }

  const cumulativeWeights = [] as number[];

  for (let i = 0; i < weights.length; i += ONE) {
    cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - ONE] || ZERO);
  }

  const maxCumulativeWeight = cumulativeWeights[cumulativeWeights.length - ONE];

  const randomNumber = maxCumulativeWeight * Math.random();

  for (let itemIndex = 0; itemIndex < items.length; itemIndex += ONE) {
    if (cumulativeWeights[itemIndex] >= randomNumber) {
      return items[itemIndex];
    }
  }
  return items[ZERO];
}
