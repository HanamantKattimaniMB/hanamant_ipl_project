const fs=require('fs')
function matchesPerYear(match_data)
{   const output={}
    match_data.map((match)=>{
        if(output.hasOwnProperty(match['season']))
            output[match['season']]++
        else
            output[match['season']]=1
  })
    return output
}

          
function matchesWonPerTeamPerYear(match_data)
{   let output={}
    let teams=new Set()
    let seasons=new Set()

      match_data.map((match)=>{
        if(match['winner']!='')
        {
          teams.add(match['winner'])  
        }
        seasons.add(match['season'])

        if(output[match['season']])
        {
            if(output[match['season']][match['winner']])
                output[match['season']][match['winner']]++
            else
                output[match['season']][match['winner']]=1   
        }
        else
        {   output[match['season']]={}
            output[match['season']][match['winner']]=1
        }
    })
  
    let sortedSeasons=Array.from(seasons).sort((a,b)=>{return a-b})
    let sortedTeams=Array.from(teams).sort((a,b)=>{return a-b})

    let outputObj={}
    for(let season of sortedSeasons){
        outputObj[season]=[]
        for(let team of sortedTeams){
            if(output[season][team]){
                outputObj[season].push(output[season][team])
            }
            else{
                outputObj[season].push(0)
            }
        }
    }

    let matchesWithSeasonAndWin=[]
    let teamData={}
    for(let year in outputObj){
        teamData['name']=year
        teamData['data']=outputObj[year]
        matchesWithSeasonAndWin.push(teamData)
        teamData={}
    }
  
    let mainOutput={}
    mainOutput['teams']=sortedTeams
    mainOutput['matches']=matchesWithSeasonAndWin
    return mainOutput
}


function extraRunConceded(match_data,delivery_data,year)
{
    let filtered_match_data=match_data.filter(match=>match.season==year)
    const output={}
      filtered_match_data.map((match)=>{
           delivery_data.map((delivery)=>{
            if(match['id']==delivery['match_id']){
                if(output[delivery.bowling_team]){
                    output[delivery['bowling_team']]+=parseInt(delivery['extra_runs'])
                }else{
                    output[delivery['bowling_team']]=parseInt(delivery['extra_runs'])
                }

            }
        })
      })
    return output
    
}



function topTenEconomicalBowlerInSeason(match_data,delivery_data,year)
{
    let output={}
    let filtered_match_data=match_data.filter(match=>match.season==year)
    filtered_match_data.map((match)=>{
            delivery_data.map((delivery)=>{    
            if(match['id']==delivery['match_id']){
                if(output.hasOwnProperty(delivery['bowler'])){
                    output[delivery['bowler']]['run']+=parseInt(delivery['total_runs'])
                    if((delivery['wide_runs']==0) && (delivery['noball_runs']==0))
                        output[delivery['bowler']]['bowls']++
                }
                else{
                    output[delivery['bowler']]={}
                    output[delivery['bowler']]['run']=parseInt(delivery['total_runs'])
                    if((delivery['noball_runs']==0) && (delivery['wide_runs']==0))
                        output[delivery['bowler']]['bowls']=1
                    else
                        output[delivery['bowler']]['bowls']=0
                    
                }
            }
        }) 
    })
  
  
    let array=[]
    for(let bowler in output){
        let over=output[bowler].bowls/6
        let runs= output[bowler].run
        economicalRate=runs/over
        array.push([bowler,economicalRate])
    }
   
    let sortedArray=array.sort((a,b)=>{
        return a[1]-b[1]
    })

    let topTenEconomicalBowler=[]
    let count=0
    for(bowler in sortedArray){
    if(count<10)
      topTenEconomicalBowler[bowler]=sortedArray[bowler]
        count++
    }

    let topTenEconomicalBowler_obj=Object.assign({}, topTenEconomicalBowler)

    return topTenEconomicalBowler_obj
}


const storeDataToJSON = (str, path) => {
    try {
      fs.writeFileSync(path, JSON.stringify(str))
    } catch (err) {
      console.error('error occured',err)
    }
  }



 





module.exports={matchesPerYear,matchesWonPerTeamPerYear,extraRunConceded,topTenEconomicalBowlerInSeason,storeDataToJSON}