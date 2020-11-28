const csv=require('csvtojson')
const ipl=require('./ipl')

const PATH_MATCHES_PER_YEAR='../public/output/matchesPerYear.json'
const PATH_MATCHES_WON_PER_TEAM_PER_YEAR='../public/output/matchesWonPerTeamPerYear.json'
const PATH_EXTRA_RUN_CONCEDED='../public/output/extraRunConceded.json'
const PATH_TOP_TEN_ECONOMICAL_BOWLER='../public/output/topTenEconomicalBowler.json'

const PATH_DATASET_MATCHES='../data/matches.csv'
const PATH_DATASET_DELIVERIES='../data/deliveries.csv'

csv()
.fromFile(PATH_DATASET_MATCHES)
.then((match_data)=>{

    let output1 = ipl.matchesPerYear(match_data)
    ipl.storeDataToJSON(output1,PATH_MATCHES_PER_YEAR)
    
    output2 = ipl.matchesWonPerTeamPerYear(match_data)
    ipl.storeDataToJSON(output2,PATH_MATCHES_WON_PER_TEAM_PER_YEAR)
    
    csv()
    .fromFile(PATH_DATASET_DELIVERIES)
    .then((delivery_data)=>{
        output3 = ipl.extraRunConceded(match_data,delivery_data,'2016')
        ipl.storeDataToJSON(output3,PATH_EXTRA_RUN_CONCEDED)

        output4 = ipl.topTenEconomicalBowlerInSeason(match_data,delivery_data,'2015')
        ipl.storeDataToJSON(output4,PATH_TOP_TEN_ECONOMICAL_BOWLER)
        })
        .catch((err)=>{
                if(err){
                    console.log("File not exists")
                }
            })
           
}).catch((err)=>{
    if(err){
        console.log("File not exists")
    }
})


    

