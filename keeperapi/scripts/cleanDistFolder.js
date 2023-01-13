const fs = require('fs')

const distDir = `${__dirname}/../dist`

try {
    fs.rmSync(distDir, {recursive: true})
} catch (e) {}

console.log('Dist folder cleaned')
