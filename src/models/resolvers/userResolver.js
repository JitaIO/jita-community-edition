import dotenv from 'dotenv';
import { neo4jgraphql } from 'neo4j-graphql-js';
import v4 from 'uuid/v4';
import bcrypt from 'bcrypt';
import { getNow } from '../../lib/Utils';

dotenv.config();

const userResolver = {
    Query: {
        User(object, params, ctx, resolveInfo) {
            return neo4jgraphql(object, params, ctx, resolveInfo, true);
        },
        Users(object, params, ctx, resolveInfo) {
            return neo4jgraphql(object, params, ctx, resolveInfo, true);
        },
    },
    Mutation: {
        CreateUser(object, params, ctx, resolveInfo) {
            
            params.UUID = (params.UUID !== undefined) ? params.UUID : v4();
            params.created_date = params.last_updated = getNow();
            params.activated = false;
            params.hash = bcrypt.hashSync(params.password, parseInt(process.env.BCRYPT_SALT_ROUND));

            return neo4jgraphql(object, params, ctx, resolveInfo, true);
        },

        UpdateUser(object, params, ctx, resolveInfo) {
            if(bcrypt.compareSync(params.password, params.hash)===true){
                params.last_updated = getNow();
                return neo4jgraphql(object, params, ctx, resolveInfo, true);
            } else {
                console.log(params);
            }
        },

        DeleteUser(object, params, ctx, resolveInfo) {
            return neo4jgraphql(object, params, ctx, resolveInfo, true);
        },
    },
}

export default userResolver;