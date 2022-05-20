const path = require('path')
const fs = require('fs')


const pathFile = path.join(__dirname, 'text.txt')

//console.log(pathFile)

const stream = fs.createReadStream(pathFile, 'utf-8')

stream.on('error', (err) => {
    throw err
})

stream.on('data', (chunk) => {
    console.log(chunk)
})
