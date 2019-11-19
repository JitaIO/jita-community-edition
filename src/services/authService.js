import jwt from "jsonwebtoken";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import userService from "./userService";

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const JWT_ALGORITHM = process.env.JWT_ALGORITHM || "HS256";
const JWT_ACCESS_TOKEN_EXPIRES_IN = process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || "30m";
const JWT_REFRESH_TOKEN_EXPIRES_IN = process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || "7d";

const AuthService = {
  getAccessToken: uuid => {
    return sign(uuid, JWT_ACCESS_TOKEN_EXPIRES_IN, "access");
  },

  getRefreshToken: uuid => {
    return sign(uuid, JWT_REFRESH_TOKEN_EXPIRES_IN, "refresh");
  },

  getStrategy: () => {
    const jwtOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
      algorithms: JWT_ALGORITHM
    };
    return new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
      console.log("Request \x1b[36m[Payload]\x1b[0m %s", JSON.stringify(jwt_payload));
      if (jwt_payload.token_type != "access") {
        return done(null, false);
      }
      try {
        return done(null, await userService.checkValidateUserByUUID(jwt_payload.uuid));
      } catch (error) {
        return done(error, false);
      }
    });
  }
};

function sign(uuid, expiresin, token_type) {
  return jwt.sign({ uuid, token_type }, JWT_SECRET, {
    algorithm: JWT_ALGORITHM,
    expiresIn: expiresin
  });
}

export default AuthService;
