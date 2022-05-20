const path = require('path')
const fs = require('fs')


const pathFile = path.join(__dirname, 'secret-folder')

fs.readdir(pathFile, {withFileTypes: true}, (err, files) => {
    if(err) {
        throw err
    }

    files.forEach(file => {
        let pathFiles = path.join(__dirname, 'secret-folder', file.name)
        
            fs.stat(pathFiles, (err, stats) => {
                if(err) {
                    throw err
                }

                let weight = (stats.size / 1024).toFixed(2)
                let ext = path.extname(pathFiles);
                let name = path.basename(pathFiles, `${ext}`);
               
                console.log(`${name} - ${ext.slice(1, ext.length)} - ${weight}kb`)
            });
        
    })
});


