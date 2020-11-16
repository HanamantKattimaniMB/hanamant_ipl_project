const fs=require('fs')
function matchesPerYear(row,perYearMatchCount){
    if(perYearMatchCount.hasOwnProperty(row['season']))
        perYearMatchCount[row['season']]++
    else
        perYearMatchCount[row['season']]=0
    return perYearMatchCount
}


function matchesWonPerTeamPerYear(row,objectToStoreOutput)
{
  if(objectToStoreOutput.hasOwnProperty(row['season']+"  "+row['winner']))
  objectToStoreOutput[row['season']+"  "+row['winner']]++
   else
   objectToStoreOutput[row['season']+"  "+row['winner']]=1
   return objectToStoreOutput
}


function extraRunPerTeamInYear(row,year,extraRun)
{
  if(row['season']==year)
  {
      if(extraRun.hasOwnProperty(row['winner']))
      extraRun[row['winner']] += parseInt(row['win_by_runs'])
      else
      extraRun[row['winner']] =parseInt(row['win_by_runs'])       
  } 
  return extraRun
}



function getId(row,matchIdInYear,year,column)
{
  if(row['season']==year)
    {  
        if(!(matchIdInYear.hasOwnProperty(row[column])))
          matchIdInYear[row['id']] = 0
    }
    return matchIdInYear
}

function extraRunConceded(row1,extra_runs)
{
if(extra_runs.hasOwnProperty(row1['match_id']))
extra_runs[row1['match_id']]+=parseInt(row1['extra_runs'])
return extra_runs
}



function topTen(economicalBowler)
{
  var sort_economicalBowler = [];
  for (var bowler in economicalBowler) {
    sort_economicalBowler.push([bowler, economicalBowler[bowler]]);
    }

    sort_economicalBowler.sort(function(a, b) {
      return a[1] - b[1];
  });
  
  
  return sort_economicalBowler
}



const storeDataToJSON = (str, path) => {
    try {
      fs.writeFileSync(path, JSON.stringify(str))
    } catch (err) {
      console.error(err)
    }
  }



module.exports={matchesPerYear,matchesWonPerTeamPerYear,extraRunPerTeamInYear,getId,extraRunConceded,topTen,storeDataToJSON}

