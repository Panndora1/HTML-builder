const path = require('path')
const fs = require('fs')

const folderDist = path.join(__dirname, 'project-dist');
const folderDistAssets = path.join(__dirname, 'project-dist', 'assets');


//copy assets


fs.mkdir(folderDist, {recursive: true}, (err) => {
    if(err) {
        console.log(err)
    }
})


fs.mkdir(folderDistAssets, {recursive: true}, (err) => {
    if(err) {
        console.log(err)
    }
})


const PathAssets = path.join(__dirname, 'assets');


fs.readdir(PathAssets, (err, files) => {
    if(err) {
        console.log(err)
    }

files.forEach(folder => {

    let pathFolders = path.join(__dirname, folder)
    let pathToAssetsFolders = path.join(PathAssets, path.basename(pathFolders))
    

    fs.mkdir(path.join(folderDistAssets, path.basename(pathFolders)), {recursive: true}, (err) => {
        if(err) {
            console.log(err)
        }         
    })

    fs.readdir(pathToAssetsFolders, (err, files) => {
        if(err) {
            console.log(err)
        }

        files.forEach(file => {

            let pathIn = path.join(pathToAssetsFolders, file)
            let pathOut = path.join(path.join(folderDistAssets, path.basename(pathFolders)), file)

            fs.copyFile(pathIn, pathOut, err => {
                if(err) {
                    console.log(err)
                }
            })           
        })

    })
     
})
})

//merge styles

const stylePath = path.join(__dirname, 'styles')
const newStyleFile = path.join(__dirname, 'project-dist', 'style.css')

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

// create html

const htmlPath = path.join(__dirname, 'template.html')
const newHtmlFile = path.join(__dirname, 'project-dist', 'index.html')

const writeHtmlFile = fs.createWriteStream(newHtmlFile, 'utf-8')
const components = path.join(__dirname, 'components')

const readTemp = fs.createReadStream(htmlPath, 'utf-8');
let data = '';

readTemp.on('error', (err) => {
    throw err
})

readTemp.on('data', (chunk) => {

    data = chunk;

    fs.readdir(components, {withFileTypes: true}, (err, files) => {
        if(err) {
            console.log(err)
        }

        files.forEach(file => {

            let acc = ''
            
            let name = path.basename(path.join(components, file.name), '.html');

            let fileCompRead = fs.createReadStream(path.join(components, file.name), 'utf-8')
            
            fileCompRead.on('data', (chunk) => {
                acc += chunk
            })

            fileCompRead.on('end', () => {

                data = data.replace(`{{${name}}}`, acc);
                fs.writeFile(newHtmlFile, data, err => {
                    if(err) {
                        console.log(err)
                    }
                })
                //console.log(data)
                
            })

        })
    })

    
})