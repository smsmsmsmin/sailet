const jwt = require('jsonwebtoken')

function getUserId(context) {
  const Authorization = context.event.headers.Authorization || context.event.headers.authorization;
  console.log(context.event.headers);
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const { userId } = jwt.verify(token, process.env.APP_SECRET)
    return userId
  }

  throw new AuthError()
}

class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}

module.exports = {
  getUserId,
  AuthError
}

