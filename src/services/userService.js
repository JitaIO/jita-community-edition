import { isNil } from "lodash";
import apolloClient from "../controllers/apolloClient";
import gql from "graphql-tag";

const UserService = {
  checkValidateUserByUUID: async (uuid) => {
    try {
      const user = (
        await apolloClient.query({
          variables: {
            uuid
          },
          query: gql`
            query User($uuid: String) {
              User(UUID: $uuid) {
                UUID
                email
                name
                activated
                hash
              }
            }
          `
        })
      ).data.User;
      if (isNil(user) || user.activate == false) {
        return false;
      }
      return true;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }
};

export default UserService;
