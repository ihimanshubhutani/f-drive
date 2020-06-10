// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const { authenticateUser } = require('./userDataHandler').default.default;
// const { fetchInfoFromUserId } = require('./userDataHandler').default.default;
// // Used to serialize the user for session
// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// // Used to deserialize the user
// passport.deserializeUser((iuser, done) => {
//   const user = iuser;
//   fetchInfoFromUserId(user.id)
//     .then(result => {
//       user.username = result.username;
//       user.verification = result.verifiedAt;
//       user.email = result.email;
//       done(null, user);
//     });
// });

// passport.use('user-authentication', new LocalStrategy(
//   (username, password, done) => {
//     authenticateUser(username, password)
//       .then(result => {
//         if (result) {
//           return done(null, result);
//         }
//         return done(null, false);
//       });
//   },
// ));
