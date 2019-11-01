const { neo4jgraphql } = require('neo4j-graphql-js');

const typeDef = `
extend type Query {
  Person(name: String!): Person
  People: [Person]
}

type Person {
  name: String
  born: String
}
`;


const resolvers = {
  Query: {
      Person(object, params, ctx, resolveInfo) {
        return neo4jgraphql(object, params, ctx, resolveInfo, true);
      },
      People(object, params, ctx, resolveInfo) {
        return neo4jgraphql(object, params, ctx, resolveInfo, true);
      },
  },
  Mutation: {
    CreatePerson(object, params, ctx, resolveInfo) {
        return neo4jgraphql(object, params, ctx, resolveInfo, true);
    },
    UpdatePerson(object, params, ctx, resolveInfo) {
        return neo4jgraphql(object, params, ctx, resolveInfo, true);
    },
    DeletePerson(object, params, ctx, resolveInfo) {
        return neo4jgraphql(object, params, ctx, resolveInfo, true);
    },
  }
};

const PersonModel = { typeDef, resolvers };
module.exports = PersonModel;