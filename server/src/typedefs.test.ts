import { graphql, printSchema } from 'graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { expect, test } from 'vitest';
import typeDefs from './typedefs';

test('Schema should be valid', () => {
  expect(() => makeExecutableSchema({ typeDefs })).not.toThrow();
});

test('Schema snapshot', () => {
  const schema = makeExecutableSchema({ typeDefs });
  expect(printSchema(schema)).toMatchSnapshot();
});
