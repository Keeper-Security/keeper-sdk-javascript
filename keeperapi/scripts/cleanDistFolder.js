const fs = require('fs')

const distDir = `${__dirname}/../dist`

fs.rmdirSync(distDir, {recursive: true})

console.log('Dist folder cleaned')
