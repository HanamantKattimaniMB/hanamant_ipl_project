const csv = require('csv-parser');
const fs = require('fs');

fs.createReadStream('../data/matches.csv')
  .on('error',()=>{
    console.log('Error has occured')
    })
  .pipe(csv())
  .on('data', (row) => {
   console.log(row)
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });