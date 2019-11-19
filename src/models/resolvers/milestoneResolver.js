import { neo4jgraphql } from 'neo4j-graphql-js';
import v4 from 'uuid/v4';
import { getNow } from '../../lib/Utils';

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
            params.UUID = (params.UUID === undefined) ? v4() : params.UUID;
            params.created_date = (params.created_date === undefined) ? getNow() : params.created_date;
            params.last_updated = (params.last_updated === undefined) ? getNow() : params.last_updated;
            
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