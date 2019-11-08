import { neo4jgraphql } from 'neo4j-graphql-js';

export default {
    Query: {
        Milestone(object, params, ctx, resolveInfo) {
            return neo4jgraphql(object, params, ctx, resolveInfo, true);
        },
        Milestones(object, params, ctx, resolveInfo) {
            return neo4jgraphql(object, params, ctx, resolveInfo, true);
        },
    },
    Mutation: {
        CreateMilestone(object, params, ctx, resolveInfo) {
            return neo4jgraphql(object, params, ctx, resolveInfo, true);
        },
        UpdateMilestone(object, params, ctx, resolveInfo) {
            return neo4jgraphql(object, params, ctx, resolveInfo, true);
        },
        DeleteMilestone(object, params, ctx, resolveInfo) {
            return neo4jgraphql(object, params, ctx, resolveInfo, true);
        },
    },
}