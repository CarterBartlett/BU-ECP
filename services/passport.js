const gstore = require("gstore-node")();
const googleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const keys = require("../config/keys");
const Datastore = gstore.ds;

const User = require("../models/user");

// Serialize user (retrieve id from current user object)
passport.serializeUser((user, cb) => {
  cb(null, user[Datastore.KEY].id);
});

// Deserialize user (retrieve user from Google Cloud based on id)
passport.deserializeUser(async (id, cb) => {
  const qry = await User.get(id);
  const user = qry.plain();
  cb(null, user);
});

passport.use(
  new googleStrategy(
    {
      clientID: keys.googleClientId,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, cb) => {
      // Try to get an existing user
      try {
        const query = await User.findOne({ googleId: profile.id });
        const user = query.plain();
        cb(null, user);
      } catch (err) {
        switch (err.code) {
          case "ERR_ENTITY_NOT_FOUND": // If previous error occurred due to no entity, create one!
            const user = await createNewUser(profile); // Put this into a seperate function to help readability!
            cb(null, user);
            break;
          default:
            cb(err, null);
        }
      }
    }
  )
);

/**
 * Creates a new user based on provided Google profile
 * @param {Object} Google profile 
 * @returns {Object} User object
 */
async function createNewUser(profile) {
  const googleId = profile.id;
  const firstName = profile.name.givenName;
  const lastName = profile.name.familyName;
  const personalEmail = profile.emails[0].value;

  const newUserQuery = await new User({
    googleId,
    firstName,
    lastName,
    personalEmail
  }).save();

  const user = newUserQuery.entityData;

  return user;
}
