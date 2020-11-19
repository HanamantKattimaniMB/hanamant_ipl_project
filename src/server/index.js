
const fs=require('fs')
const csv=require('csvtojson')
const ipl=require('./ipl')
csv()
.fromFile('../data/matches.csv')
.then((match_data)=>{
    // que1
    let output1=ipl.matchesPerYear(match_data)
    ipl.storeDataToJSON(output1,'../public/output/matchesPerYear.json')
    //que2
    output2=ipl.matchesWonPerTeamPerYear(match_data)
    ipl.storeDataToJSON(output2,'../public/output/matchesWonPerTeamPerYear.json')
    
    csv()
    .fromFile('../data/deliveries.csv')
   
            
    .then((delivery_data)=>{
        //que3
       output3=ipl.extraRunConceded(match_data,delivery_data,'2016')
        ipl.storeDataToJSON(output3,'../public/output/extraRunConceded.json')
       //que4
        output4=ipl.topTenEconomicalBowlerInSeason(match_data,delivery_data,'2015')
        ipl.storeDataToJSON(output4,'../public/output/topTenEconomicalBowler.json')
            }).catch((err)=>{
                if(err)
                {
                    console.log("error occured")
                }
            })
           
}).catch((err)=>{
    if(err)
    {
        console.log("error occured")
    }
})

    

