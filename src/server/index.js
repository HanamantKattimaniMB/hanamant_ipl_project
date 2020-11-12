const csv = require('csv-parser');
const fs = require('fs');
const ipl= require('./ipl')
let perYearMatchCount={}
let objectToStoreOutput={}
let year='2016'
let extraRun={}
fs.createReadStream('../data/matches.csv')
  .on('error',()=>{
    console.log('Error has occured')
    })
  .pipe(csv())
  .on('data', (row) => {

    perYearMatchCount=ipl.matchesPerYear(row,perYearMatchCount)
    objectToStoreOutput=ipl.matchesWonPerTeamPerYear(row,objectToStoreOutput)

    extraRun=ipl.extraRunPerTeamInYear(row,year,extraRun)

  })
  .on('end', () => {
    console.log("\n\n\nMatch count per year   :\n",perYearMatchCount)
    console.log(perYearMatchCount);
    console.log("\n\n\nNumber of matches won per year per team   :\n",objectToStoreOutput)
    console.log("\n\n\nExtra run conceded Per team in year 2016   :\n",extraRun)
  });