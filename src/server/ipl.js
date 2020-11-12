
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

module.exports={matchesPerYear,matchesWonPerTeamPerYear}

