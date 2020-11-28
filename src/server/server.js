const http=require('http')
const fs=require('fs')

const PATH_INDEX_HTML='../public/index.html'
const PATH_STYLE_CSS='../public/style.css'
const PATH_APP_JS='../public/app.js'

const PATH_MATCHES_PER_YEAR='../public/output/matchesPerYear.json'
const PATH_MATCHES_OWN_PAE_TEAM_PER_YEAR='../public/output/matchesWonPerTeamPerYear.json'
const PATH_EXTRA_RUN_CONCEDED='../public/output/extraRunConceded.json'
const PATH_TOP_TEN_ECONOMICAL_BOWLER='../public/output/topTenEconomicalBowler.json'

const readFilePromise=(filename)=>{
    return new Promise((resolve,reject)=>{
        fs.readFile(filename,'utf8',(err,data)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(data)
            }
        })
    })
}

const errorHandler=(response,err)=>{
    response.writeHead(500,{
        'Content-Type':'application/json',
    })
    response.write(JSON.stringify({
       'error message' :'error is occurred in server',
    }))
    response.end()
    console.log(err)
}

const server=http.createServer((req,res)=>{
    switch(req.url){
        case '/':{
            readFilePromise(PATH_INDEX_HTML)
            .then((data)=>{
                res.writeHead(200,{'Content-Type':'text/html'})
                res.write(data)
                res.end()
            })
            .catch((err)=>{
                errorHandler(res,err)
            })
            break
        }

        case '/style.css':{
            readFilePromise(PATH_STYLE_CSS)
            .then((data)=>{
                res.writeHead(200,{'Content-Type':'text/css'})
                res.write(data)
                res.end()
            })
            .catch((err)=>{
                errorHandler(res,err)
            })
            break
        }

        case '/app.js':{
            readFilePromise(PATH_APP_JS)
            .then((data)=>{
                res.writeHead(200,{'Content-Type':'text/javascript'})
                res.write(data)
                res.end()
            })
            .catch((err)=>{
                errorHandler(res,err)
            })
            break
        }

        case '/matchesPerYear.json':{
            readFilePromise(PATH_MATCHES_PER_YEAR)
            .then((data)=>{
                res.writeHead(200,{'Content-Type':'application/json'})
                res.write(data)
                res.end()
            })
            .catch((err)=>{
                errorHandler(res,err)
            })
            break
        }


        case '/matchesWonPerTeamPerYear.json':{
            readFilePromise(PATH_MATCHES_OWN_PAE_TEAM_PER_YEAR)
            .then((data)=>{
                res.writeHead(200,{'Content-Type':'application/json'})
                res.write(data)
                res.end()
            })
            .catch((err)=>{
                errorHandler(res,err)
            })
            break
        }

        case '/extraRunConceded.json':{
            readFilePromise(PATH_EXTRA_RUN_CONCEDED)
            .then((data)=>{
                res.writeHead(200,{'Content-Type':'application/json'})
                res.write(data)
                res.end()
            })
            .catch((err)=>{
                errorHandler(res,err)
            })
            break
        }

        case '/topTenEconomicalBowler.json':{
            readFilePromise(PATH_TOP_TEN_ECONOMICAL_BOWLER)
            .then((data)=>{
                res.writeHead(200,{'Content-Type':'application/json'})
                res.write(data)
                res.end()
            })
            .catch((err)=>{
                errorHandler(res,err)
            })
            break
        }

        default:{
            res.writeHead(404,{'Content-Type':'text/html'})
            res.write("<h1><center>Error: 404 not found</center></h1>")
            break
        } 
    }
})
server.listen(3000)
console.log('server is running on port 3000 ....')

