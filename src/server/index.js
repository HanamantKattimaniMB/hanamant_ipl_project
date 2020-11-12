const csv = require('csv-parser');
const fs = require('fs');
const ipl= require('./ipl')
let perYearMatchCount={}
let objectToStoreOutput={}
fs.createReadStream('../data/matches.csv')
  .on('error',()=>{
    console.log('Error has occured')
    })
  .pipe(csv())
  .on('data', (row) => {

    perYearMatchCount=ipl.matchesPerYear(row,perYearMatchCount)
    objectToStoreOutput=ipl.matchesWonPerTeamPerYear(row,objectToStoreOutput)
  })
  .on('end', () => {
    console.log("\n\n\nMatch count per year   :\n",perYearMatchCount)
    console.log(perYearMatchCount);
    console.log("\n\n\nNumber of matches own per year per team   :\n",objectToStoreOutput)
  });