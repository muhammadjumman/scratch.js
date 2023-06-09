const fs = require('fs')
const path = require('path');


// This parse the list or let's say the order of the html file from the index.html file
// You need to have [[nav, header, footer]]
// This written in you html file in the order how you want to render the component
function parseList(indexHtml){
    const start = indexHtml.search(/\[\[/)
    const end = indexHtml.search(/\]\]/)
    const listText = indexHtml.slice(start+2, end)
    const list = listText.split(',')

    return list
}


// This writes the index.html for the dist folder, that will be used for production
// This writes the html, and it writes the link, and script tag for css and js respectively
function getFile(dir,ast){
    const htmlPath = path.join(dir, 'index.html')
    const indexHtml = fs.readFileSync(htmlPath, 'utf8')
    let fullFile;
    const list = parseList(indexHtml)

    function addHtml(){
        const reBody = /<\/?body\s*>/g 
        const index = indexHtml.match(reBody)
        const start = indexHtml.search(index[0])
        const end = indexHtml.search(index[1])
        const slice1 = indexHtml.slice(0, start+index[0].length)
        const slice2 = indexHtml.slice(end)
        let html = ''
        list.forEach((f)=>{
            const htmlName = f.trim()
            html += ast.html[htmlName]
        })
        fullFile = slice1 + html + slice2
    }
    
    function addCss(){
        const match = /<\/title\s*>/
        const index = fullFile.match(match)
        const titleIndex = fullFile.search(match)
        const slice1 = fullFile.slice(0, titleIndex+index[0].length)
        const slice2 = fullFile.slice(titleIndex+index[0].length)
        let css = ''
        list.forEach((c)=>{
            let cTag = c.trim()
            css += `    <link rel="stylesheet" href="/${cTag}.css">\n`
        })
        fullFile = slice1+'\n'+ css + slice2
    }
    

    function addJS(){
        const match = /<\/title\s*>/
        const index = fullFile.match(match)
        const titleIndex = fullFile.search(match)
        const slice1 = fullFile.slice(0, titleIndex+index[0].length)
        const slice2 = fullFile.slice(titleIndex+index[0].length)
        let js = ''
        list.forEach((c)=>{
            let sTag = c.trim()
            js += `    <script defer="true" src="${sTag}.js"></script>\n`
        })
        fullFile = slice1+'\n'+ js + slice2
    }

    addHtml()
    addCss()
    addJS()
    return fullFile
}


// This build the dist(distribution) folder and its file without the assets
function build(file,dir,ast){
    const htmlPath = path.join(dir, 'index.html')
    const indexHtml = fs.readFileSync(htmlPath, 'utf8')
    const  distDir = path.join(dir, 'dist')
    const indexFile = path.join(distDir, 'index.html')
    if (!fs.existsSync(distDir)) fs.mkdirSync('dist')
    fs.writeFileSync(indexFile, file)
    const list = parseList(indexHtml)
    list.forEach((f)=>{
        let file = f.trim()
        let filePathCss = path.join(distDir, `${file}.css`)
        let filePathJs = path.join(distDir, `${file}.js`)
        fs.writeFileSync(filePathCss, ast.style[file])
        fs.writeFileSync(filePathJs, ast.script[file])
    })
}


// This is the ast(Abstract Syntax Tree) parser
function getAst(src,files){

    // The AST object
    const ast = {html:{}, style:{}, script:{}}

    function buildAst(file){
        const filePath = path.join(src, file)
        const read = fs.readFileSync(filePath, 'utf8')
        const reHtml = /<\/?html\s*>/g;
        const reStyle = /<\/?style\s*>/g;
        const reScript = /<\/?script\s*>/g;

        function getHtml(){
            const index = read.match(reHtml)
            const start = read.search(index[0])
            const end = read.search(index[1])
            const html = read.slice(start+6, end)
            return html
        }

        function getStyle(){
            const index = read.match(reStyle)
            const start = read.search(index[0])
            const end = read.search(index[1])
            const style = read.slice(start+7, end)
            return style
        }

        function getScipt(){
            const index = read.match(reScript)
            const start = read.search(index[0])
            const end = read.search(index[1])
            const script = read.slice(start+8, end)
            return script
        }

        const html = getHtml()
        const style = getStyle()
        const script = getScipt()

        const fileName = file.replace('.html', '')
        ast.html[fileName] = html
        ast.style[fileName] = style
        ast.script[fileName] = script
        
    }
    files.forEach((file)=>{
        buildAst(file)
    })
    return ast
}

// This copy file from the public dir to the dist dir
function assets(dir){
    const public = path.join(dir, 'public')
    const dist = path.join(dir, 'dist')
    const files = fs.readdirSync(public)
    
    files.forEach((file)=>{
        const sourcePath = path.join(public, file)
        const distPath = path.join(dist, file)
        fs.copyFileSync(sourcePath, distPath)
    })
}


// The main self invoking function

( function(){
    const cDir = process.cwd()
    const src = path.join(cDir, 'src')
    const files = fs.readdirSync(src)

    const ast = getAst(src, files)
    const file = getFile(cDir, ast)
    build(file,cDir,ast)
    assets(cDir)
})()
