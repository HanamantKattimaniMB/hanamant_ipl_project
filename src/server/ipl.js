
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

module.exports={matchesPerYear,matchesWonPerTeamPerYear,extraRunPerTeamInYear}

