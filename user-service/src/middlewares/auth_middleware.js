//#region Import statements
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { get_user_by_id } from "../services/user_service.js";
//#endregion

//#region jwt strategy option
const option = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};
//#endregion

//#region passport config
passport.use(
  new Strategy(option, async (payload, cb) => {
    try {
      const user = await get_user_by_id(payload.id);
      if (user) return cb(null, user);
      return cb(null, false);
    } catch (error) {
      return cb(error, false);
    }
  })
);
//#endregion
