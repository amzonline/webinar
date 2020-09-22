import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Cognito({
      clientId: '6fr59jqi5aop9c6re8tjnlev64', //process.env.COGNITO_CLIENT_ID,
      clientSecret: 'sqa9c2vc67h8d2h3kfb3jimp9ve4uop02avnm1q1niba5kv50nd', //process.env.COGNITO_CLIENT_SECRET,
      domain: 'nextjs-coginto-demo.auth.ap-northeast-2.amazoncognito.com', //process.env.COGNITO_DOMAIN,
    }),
    // ...add more providers here
  ],

  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,
}

export default (req, res) => NextAuth(req, res, options)