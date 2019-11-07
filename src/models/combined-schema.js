import { neo4jgraphql } from 'neo4j-graphql-js';

export const typeDefs = `
type Movie {
  movieId: ID!
  title: String
  tagline: String
  year: Int
  dateTime: DateTime
  localDateTime: LocalDateTime
  date: Date
  actors(first: Int = 3, offset: Int = 0): [Actor] @relation(name: "ACTED_IN", direction:"IN")
}

interface Person {
	userId: ID!
  name: String
}

type Actor {
  id: ID!
  name: String
  movies: [Movie] @relation(name: "ACTED_IN", direction: "OUT")
}

type User implements Person {
  userId: ID!
  name: String
}

type Query {
  Movie(movieId: ID, title: String, year: Int, plot: String, poster: String, imdbRating: Float): [Movie]  MoviesByYear(year: Int, first: Int = 10, offset: Int = 0): [Movie]
  AllMovies: [Movie]
  MovieById(movieId: ID!): Movie
}`;

export const resolvers = {
  // root entry point to GraphQL service
  Query: {
    Movie(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true);
    },
    AllMovies(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true);
    },
    MovieById(object, params, ctx, resolveInfo) {
      return neo4jgraphql(object, params, ctx, resolveInfo, true);
    },
  }
};

// Mutation: {
//   CreateGenre(object, params, ctx, resolveInfo) {
//     return neo4jgraphql(object, params, ctx, resolveInfo, true);
//   },
//   CreateMovie(object, params, ctx, resolveInfo) {
//     return neo4jgraphql(object, params, ctx, resolveInfo, true);
//   },
//   AddMovieGenre(object, params, ctx, resolveInfo) {
//     return neo4jgraphql(object, params, ctx, resolveInfo, true);
//   }
// }
