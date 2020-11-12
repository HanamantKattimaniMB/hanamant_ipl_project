
function matchesPerYear(row,perYearMatchCount){
    if(perYearMatchCount.hasOwnProperty(row['season']))
        perYearMatchCount[row['season']]++
    else
        perYearMatchCount[row['season']]=0
    return perYearMatchCount
}

module.exports={matchesPerYear}

