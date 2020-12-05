const http=require('http')
const fs=require('fs')
const envVariable=require('./config')

const ipl=require('./ipl')

const PATH_INDEX_HTML='../public/index.html'
const PATH_STYLE_CSS='../public/style.css'
const PATH_APP_JS='../public/app.js'

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

        case '/matchesPerYear':{
            ipl.matchesPerYear_sql()
            .then((data)=>{
                let output=data.reduce((acc,cur)=>{
                    acc[cur.season]=cur.numberOfMatches
                    return acc
                },{})
                let stringifyOutput=JSON.stringify(output)
                res.writeHead(200,{'Content-Type':'application/json'})
                res.write(stringifyOutput)
                res.end()
            }).catch((error)=>{
                console.log(error)
            })  
            break
        }

        case '/matchesWonPerTeamPerYear':{
            ipl.matchesOwnPerTeamPerYear_sql()
                .then((data)=>{
                let output=data.reduce((acc,cur)=>{
                    if(acc[cur.season]==undefined){
                        acc[cur.season]={}
                        acc[cur.season][cur.winner]=cur.numberOfMatches
                    }else{
                        acc[cur.season][cur.winner]=cur.numberOfMatches
                    }
                    return acc
                },{})
              
                let stringifyMatchesWonPerTeamPerYear=JSON.stringify(output)
                res.writeHead(200,{'Content-Type':'application/json'})
                res.write(stringifyMatchesWonPerTeamPerYear)
                res.end()
                })
                .catch((error)=>{
                console.log(error)
                })
            break
        }

        case '/extraRunConceded':{
            ipl.extraRunConceded_sql()
            .then((data)=>{
    
            let dataFormatted=data.reduce((acc,cur)=>{
                acc[cur.bowling_team]=cur.extra_runs
                return acc
            },{})
            let stringifyData=JSON.stringify(dataFormatted)
           
            res.writeHead(200,{'Content-Type':'application/json'})
            res.write(stringifyData)
            res.end()

            }).catch((error)=>{
              console.log(error)
            })
            break
        }

        case '/topTenEconomicalBowler':{
            ipl.topTenEconomicalBowler_sql()
            .then((data)=>{
                
                let dataFormatted=data.reduce((acc,cur,index)=>{
                    acc[index]=[cur.bowler,cur.over_runs]
                    return acc
                },{})
        

                let stringifyTopTenEconomicalBowler=JSON.stringify(dataFormatted)
                res.writeHead(200,{'Content-Type':'application/json'})
                res.write(stringifyTopTenEconomicalBowler)
                res.end()
            })
            .catch((error)=>{
            console.log(error)
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
server.listen(envVariable.PORT)
console.log('server is running on port 3000 ....')

