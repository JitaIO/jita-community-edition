const {merge} = require('lodash');
const {mergeSchemas} = require('graphql-tools');
const {printSchema} = require('graphql');
const {makeAugmentedSchema} = require('neo4j-graphql-js');
const PersonModel = require('./PersonModel');

// If you had Query fields not associated with a specific type you could put them here
const Query = `
    scalar DateTime
    type Query {
        _empty: String
    }
    type Mutation {
        _empty: String
    }
`;

const typeDefs = [
    Query, 
    PersonModel.typeDef,
]

const resolvers = {};

const schema = makeAugmentedSchema({
    config: {
        query: true,
        mutation: true
    },
    typeDefs: printSchema(
        mergeSchemas({
            schemas: typeDefs
        })
    ),
    resolvers: merge(
        resolvers,
        PersonModel.resolvers,
    ),
});

module.exports = schema;