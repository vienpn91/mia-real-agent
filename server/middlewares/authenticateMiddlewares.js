import passport from 'passport';
import { Strategy } from 'passport-facebook';

passport.use(new Strategy(
  {
    clientID: process.env.FACEBOOK_CLIENT_ID || '2013685605417773',
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '610c6e1a68b8b2e06f131f79f56d683f',
    callbackURL: '/return',
  },
  (
    (accessToken, refreshToken, profile, cb) => cb(null, profile)
  )
));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

export default passport;
