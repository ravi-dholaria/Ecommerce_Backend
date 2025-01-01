//#region import statements
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
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
      const user = { id: payload.id };
      return cb(null, user);
    } catch (error) {
      return cb(error, false);
    }
  })
);

export const is_authenticated = passport.authenticate("jwt", {
  session: false,
});
