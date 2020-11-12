const csv = require('csv-parser');
const fs = require('fs');
const ipl= require('./ipl')
let perYearMatchCount={}
fs.createReadStream('../data/matches.csv')
  .on('error',()=>{
    console.log('Error has occured')
    })
  .pipe(csv())
  .on('data', (row) => {

    perYearMatchCount=ipl.matchesPerYear(row,perYearMatchCount)
  })
  .on('end', () => {

    console.log(perYearMatchCount);
  });