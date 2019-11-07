import { neo4jgraphql } from 'neo4j-graphql-js';

export default {
    Query: {
        Project(object, params, ctx, resolveInfo) {
            return neo4jgraphql(object, params, ctx, resolveInfo, true);
        },
        AllProjects(object, params, ctx, resolveInfo) {
            return neo4jgraphql(object, params, ctx, resolveInfo, true);
        },
    },

    Mutation: {
        CreateProject(object, params, ctx, resolveInfo) {
            return neo4jgraphql(object, params, ctx, resolveInfo, true);
        },
        UpdateProject(object, params, ctx, resolveInfo) {
            return neo4jgraphql(object, params, ctx, resolveInfo, true);
        },
        DeleteProject(object, params, ctx, resolveInfo) {
            return neo4jgraphql(object, params, ctx, resolveInfo, true);
        },
    }
}