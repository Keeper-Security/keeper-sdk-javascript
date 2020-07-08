const version = require('../package.json').version

if (!version.includes('beta')) {
  throw new Error('Error: package.json version must include word "beta"')
}
