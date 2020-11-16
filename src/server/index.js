const csv = require('csv-parser');
const fs = require('fs');
const ipl= require('./ipl')

let perYearMatchCount={}
let objectToStoreOutput={}
let extra_runs={}
let matchIdInYear={}
let allBowlerInYear={}
let economicalBowler={}


fs.createReadStream('../data/matches.csv')
  .on('error',()=>{
    console.log('Error has occured')
    })
  .pipe(csv())
  .on('data', (row) => {
    //que1
    perYearMatchCount=ipl.matchesPerYear(row,perYearMatchCount)
    
    //que2
    objectToStoreOutput=ipl.matchesWonPerTeamPerYear(row,objectToStoreOutput)
    //que3
    matchIdInYear=ipl.getId(row,matchIdInYear,'2016','winner')  
    extra_runs=matchIdInYear

    //que4 
    matchIdInYear=ipl.getId(row,matchIdInYear,'2016','winner') 
    allBowlerInYear=matchIdInYear

  })
  .on('end', () => {

                  fs.createReadStream('../data/deliveries.csv')
                  .pipe(csv())
                  .on('data', (row1) => {
                    //que3
                    extra_runs=ipl.extraRunConceded(row1,extra_runs)

                    //que4
                    if(allBowlerInYear.hasOwnProperty(row1['match_id'])){
                      if(economicalBowler.hasOwnProperty(row1['bowler']))
                        economicalBowler[row1['bowler']]+=parseInt(row1['total_runs'])
                      else
                        economicalBowler[row1['bowler']]=0
                      }
                   
                  })
                  .on('end', () => {
                    
                    ipl.storeDataToJSON(extra_runs,'../public/output/extraRunConceded.json')

                    let topTenEconomicalBowler=ipl.topTen(economicalBowler)
                    ipl.storeDataToJSON(topTenEconomicalBowler,'../public/output/topTenEconomicalBowler.json')
                    
                    
                  });

    
    ipl.storeDataToJSON(perYearMatchCount,'../public/output/matchesPerYear.json')
    
    ipl.storeDataToJSON(objectToStoreOutput,'../public/output/matchesWonPerTeamPerYear.json')
    
  });

 
  




