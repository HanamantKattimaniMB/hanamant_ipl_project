const http=require('http')
const fs=require('fs')
const url=require('url')



const readFilePromise=(filename)=>{
  
    return new Promise((resolve,reject)=>{
        fs.readFile(filename,'utf8',(err,data)=>{
            if(err)
                reject(err)
            else
                resolve(data)
        })
    })
}

const errorHandlerCallback=(request,response,err)=>{
    console.log(err)
    response.writeHead(500,{
        'Content-Type':'application/json',
    })
    response.write(JSON.stringify({
        message:'error in server',
    }))
    response.end();
}

const server=http.createServer((req,res)=>{
    console.log(req.url)
    switch(req.url){
        case '/':{
            readFilePromise('../public/index.html')
            .then((data)=>
            {
                res.writeHead(200,{'Content-Type':'text/html'})
                res.write(data)
                res.end()
            })
            .catch((err)=>{
                errorHandlerCallback(res,err)
            })
            break
        }

        case '/style.css':{
            readFilePromise('../public/style.css')
            .then((data)=>
            {
                res.writeHead(200,{'Content-Type':'text/css'})
                res.write(data)
                res.end()
            })
            .catch((err)=>{
                errorHandlerCallback(res,err)
            })
            break
        }

        case '/app.js':{
            readFilePromise('../public/app.js')
            .then((data)=>
            {
                res.writeHead(200,{'Content-Type':'text/javascript'})
                res.write(data)
                res.end()

            })
            .catch((err)=>{
                errorHandlerCallback(res,err)
            })
            break
        }

        case '/matchesPerYear.json':{
            readFilePromise('../public/output/matchesPerYear.json')
            .then((data)=>
            {
                res.writeHead(200,{'Content-Type':'application/json'})
                res.write(data)
                res.end()
            })
            .catch((err)=>{
                errorHandlerCallback(res,err)
            })
            break
        }


        case '/matchesWonPerTeamPerYear.json':{
            readFilePromise('../public/output/matchesWonPerTeamPerYear.json')
            .then((data)=>
            {
                res.writeHead(200,{'Content-Type':'application/json'})
                res.write(data)
                res.end()
            })
            .catch((err)=>{
                errorHandlerCallback(res.err)
            })
            break
        }

        case '/extraRunConceded.json':{
            readFilePromise('../public/output/extraRunConceded.json')
            .then((data)=>
            {
                res.writeHead(200,{'Content-Type':'application/json'})
                res.write(data)
                res.end()
            })
            .catch((err)=>{
                errorHandlerCallback(res.err)
            })
            break
        }


        case '/topTenEconomicalBowler.json':{
            readFilePromise('../public/output/topTenEconomicalBowler.json')
            .then((data)=>
            {
                res.writeHead(200,{'Content-Type':'application/json'})
                res.write(data)
                res.end()
            })
            .catch((err)=>{
                errorHandlerCallback(res.err)
            })
            break
        }
        default:{
            res.writeHead(404,{'Content-Type':'text/html'})
            res.write("<strong>404 not found</strong>")
            break
        }
        
    }
  //res.end()
})

server.listen(8000)
console.log('server running...........')

