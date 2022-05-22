const path = require('path')
const fs = require('fs')

const pathFileIn = path.join(__dirname, 'files')
const pathFileOut = path.join(__dirname, 'files-copy')

fs.mkdir(pathFileOut, {recursive: true}, (err) => {
    if(err) {
        console.log(err)
    }

    console.log('Папка создана')

    fs.readdir(pathFileIn, {withFileTypes: true}, (err, files) => {
        if(err) {
            console.log(err)
        }
    
        files.forEach(file => {
            let pathIn = path.join(pathFileIn, file.name)
            let pathOut = path.join(pathFileOut, file.name)


            fs.copyFile(pathIn, pathOut, err => {
                if(err) {
                    console.log(err)
                }
            })            
        })

        console.log('Файлы скопированы')
    });
})


