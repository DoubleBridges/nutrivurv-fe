import auth0 from '../../lib/Auth0/auth0'

export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, { redirectTo: '/journal/user' })
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
}
