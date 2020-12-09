const express = require('express')
const path=require('path')
const envVariable=require('./config')
const ipl=require('./ipl')

const app = express()

app.use(express.static(path.join(__dirname, '../public')))

app.get('/matchesPerYear', function (req, res) {
    ipl.matchesPerYear_sql()
    .then((data) => {
        let output = data.reduce((acc,cur) => {
            acc[cur.season]=cur.numberOfMatches
            return acc
        },{})
        res.json(output)
    })
    .catch((error)=>{
        console.log(error)
    })
})

app.get('/matchesWonPerTeamPerYear', function (req, res) {
    ipl.matchesOwnPerTeamPerYear_sql()
    .then((data) => {
        let output=data.reduce((acc,cur) => {
        if(acc[cur.season] == undefined){
            acc[cur.season] = {}
            acc[cur.season][cur.winner] = cur.numberOfMatches
        }else{
            acc[cur.season][cur.winner] = cur.numberOfMatches
        }
        return acc
    },{})
    res.json(output)
    })
    .catch((error) => {
    console.log(error)
    })
})

app.get('/extraRunConceded', function (req, res) {
    ipl.extraRunConceded_sql()
    .then((data) => {
        let dataFormatted = data.reduce((acc,cur) => {
        acc[cur.bowling_team]=cur.extra_runs
        return acc
    },{})
    res.json(dataFormatted)
    })
    .catch((error) => {
        console.log(error)
    })
})

app.get('/topTenEconomicalBowler', function (req, res) {
    ipl.topTenEconomicalBowler_sql()
    .then((data)=>{ 
        let dataFormatted=data.reduce((acc,cur,index)=>{
        acc[index]=[cur.bowler,cur.over_runs]
        return acc
    },{})
    res.json(dataFormatted)
    })
    .catch((error)=>{
        res.json({error:'df'})
        console.log(error)
   
        })
    })

    app.use((req,res,next)=>{
        res.status(404)
        res.json({Error:'Page not found'})
        res.end()
        next()
    })

app.listen(envVariable.PORT)
console.log(`Server is started on  ${envVariable.PORT}`)

