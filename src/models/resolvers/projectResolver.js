import { neo4jgraphql } from 'neo4j-graphql-js';
import v4 from 'uuid/v4';
import { getNow } from '../Utils';

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
            params.UUID = (params.UUID === undefined) ? v4() : params.UUID;
            params.created_date = (params.created_date === undefined) ? getNow() : params.created_date;
            params.last_updated = (params.last_updated === undefined) ? getNow() : params.last_updated;
            
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