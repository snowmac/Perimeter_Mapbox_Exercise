import { graphql, printSchema } from 'graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { expect, test } from 'vitest';
import typeDefs from './typedefs';

// const schema = makeExecutableSchema({ typeDefs });

test('Schema should be valid', () => {
  expect(() => makeExecutableSchema({ typeDefs })).not.toThrow();
});

test('Schema snapshot', () => {
  const schema = makeExecutableSchema({ typeDefs });
  expect(printSchema(schema)).toMatchSnapshot();
});

// test('Polygon type should have correct fields', async () => {
//   const introspectionQuery = `
//       {
//         __type(name: "Polygon") {
//           name
//           fields {
//             name
//             type {
//               name
//               kind
//             }
//           }
//         }
//       }
//     `;
//   const result = await graphql(schema, introspectionQuery);
//   expect(result.data.__type.fields).toEqual([
//     { name: 'id', type: { name: 'Int', kind: 'SCALAR' } },
//     { name: 'name', type: { name: 'String', kind: 'SCALAR' } },
//     { name: 'coordinates', type: { name: 'String', kind: 'SCALAR' } },
//     { name: 'properties', type: { name: 'String', kind: 'SCALAR' } },
//     { name: 'mapbox_id', type: { name: 'String', kind: 'SCALAR' } },
//     { name: 'work_session_id', type: { name: 'String', kind: 'SCALAR' } },
//     { name: 'work_session', type: { name: 'WorkSession', kind: 'OBJECT' } },
//     { name: 'updated_at', type: { name: 'String', kind: 'SCALAR' } },
//     { name: 'created_at', type: { name: 'String', kind: 'SCALAR' } },
//   ]);
// });
