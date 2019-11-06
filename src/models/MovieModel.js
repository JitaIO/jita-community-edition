const { neo4jgraphql } = require('neo4j-graphql-js');

const typeDef = `
extend type Query {
  Movie(title: String!): Movie
  Movies: [Movie]
}

type Movie {
  title: String
  released: Int
  tagline: String
}
`;


const resolvers = {
  Query: {
      Movie(object, params, ctx, resolveInfo) {
        return neo4jgraphql(object, params, ctx, resolveInfo, true);
      },
      Movies(object, params, ctx, resolveInfo) {
        return neo4jgraphql(object, params, ctx, resolveInfo, true);
      },
  },
  Mutation: {
    CreateMovie(object, params, ctx, resolveInfo) {
        return neo4jgraphql(object, params, ctx, resolveInfo, true);
    },
    UpdateMovie(object, params, ctx, resolveInfo) {
        return neo4jgraphql(object, params, ctx, resolveInfo, true);
    },
    DeleteMovie(object, params, ctx, resolveInfo) {
        return neo4jgraphql(object, params, ctx, resolveInfo, true);
    },
  }
};

const MovieModel = { typeDef, resolvers };
module.exports = MovieModel;