//Cấu hình passport strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const passport = require('passport');
const User = require('../models/User')


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const { email, name } = profile._json
    if (!email) {
      return done(new Error('Không lấy được email từ tài khoảng google'))
    }
    let user = await User.findOne({ email })
    if (!user) {
      user = await User.create({
        username: name,
        email,
        isVerified: true,
        authType: 'google'
      })
    }
    return done(null, user)
  } catch (error) {
    return done(error)
  }
}))
