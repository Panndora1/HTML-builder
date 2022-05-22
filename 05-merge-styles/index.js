const path = require('path')
const fs = require('fs')

const stylePath = path.join(__dirname, 'styles')
const newStyleFile = path.join(__dirname, 'project-dist', 'bundle.css')

const writeFile = fs.createWriteStream(newStyleFile, 'utf-8')

fs.readdir(stylePath, {withFileTypes: true}, (err, files) => {
    if(err) {
        console.log(err)
    }

    files.forEach(file => {
        let pathFiles = path.join(__dirname, 'styles', file.name)
       
        if(path.extname(pathFiles) == '.css') {
            const stream = fs.createReadStream(pathFiles, 'utf-8')

            stream.on('error', (err) => {
                throw err
            })
            
            stream.on('data', (chunk) => {
                //console.log(chunk)

                fs.appendFile(newStyleFile, `\n ${chunk}` , (err) => {
                    console.log(err)
                })

            })

        }         
    }) 

});