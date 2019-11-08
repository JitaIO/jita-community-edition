import { neo4jgraphql } from 'neo4j-graphql-js';

export default {
    Query: {
        Task(object, params, ctx, resolveInfo) {
            return neo4jgraphql(object, params, ctx, resolveInfo, true);
        },
        Tasks(object, params, ctx, resolveInfo) {
            return neo4jgraphql(object, params, ctx, resolveInfo, true);
        },
    },
    Mutation: {
        CreateTask(object, params, ctx, resolveInfo) {
            return neo4jgraphql(object, params, ctx, resolveInfo, true);
        },
        UpdateTask(object, params, ctx, resolveInfo) {
            return neo4jgraphql(object, params, ctx, resolveInfo, true);
        },
        DeleteTask(object, params, ctx, resolveInfo) {
            return neo4jgraphql(object, params, ctx, resolveInfo, true);
        },
    },
}