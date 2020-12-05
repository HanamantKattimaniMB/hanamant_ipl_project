function matchesPerYear() {
    fetch("/matchesPerYear")
        .then((resp) => {
            if (resp.ok === true) {
                return resp.json()
            }
            else {
                throw new Error("Error occurred in response")
            }
        })
        .then((data) => {
            let array=[]
            for(let year in data){
                array.push([year,data[year]])
            }

            Highcharts.chart('chart1', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Number of Matches played per year',
                    style: {
                        fontSize: '2.5em'
                    }
                },
               
                xAxis: {
                    type: 'category',
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                }, 
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Number of matches'
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: 'Matches in 2017: <b>{point.y}</b>'
                },
                series: [{
                    name: 'Number Of matches',
                    data: array
                  ,
                }]
            });
                          
        }).catch((err) => {
            console.log("error occurred", err)
        })
}
matchesPerYear()

function matchesWonPerTeamPerYear() {
    fetch("/matchesWonPerTeamPerYear")
        .then((resp) => {
            if (resp.ok === true) {
                return resp.json()
            }
            else {
                throw new Error("No response from server")
            }
        })
        .then((data) => {

            let teams = new Set()
            let season = new Set()
            for(let year in data){
                for(let team in Object.values(data[year])){
                    let obj_team=Object.keys(data[year])
                    teams.add(obj_team[team])
                }
                season.add(year)
            }
            
            let sortedTeams = Array.from(teams).sort((a,b) => {return a-b})
            let sortedSeasons = Array.from(season).sort((a,b) => {return a-b})
        
            let outputObj = {}
            for(let season of sortedSeasons){
                outputObj[season] = []
                for(let team of sortedTeams){
                    if(data[season][team]){
                        outputObj[season].push(data[season][team])
                    }
                    else{
                        outputObj[season].push(0)
                    }
                }
            }


            let matchesWithSeasonAndWin = []
            let teamData = {}
            for(let year in outputObj){
                teamData['name'] = year
                teamData['data'] = outputObj[year]
                matchesWithSeasonAndWin.push(teamData)
                teamData = {}
            }

            let mainOutput = {}
            mainOutput['teams'] = sortedTeams
            mainOutput['matches'] = matchesWithSeasonAndWin
            
            let team = mainOutput.teams
            let winner = mainOutput.matches

  
            Highcharts.chart('chart2', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Matches own per team per year',
                    style:{
                        fontSize: '2.5em'
                    }
                },
                xAxis: {
                    categories: team,
                    title:{
                        text: 'IPL Teams',
                        style:{
                            color: '#A18723',
                            fontSize: '1.2em',
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Number of matches own',
                        style:{
                            color: '#A18723',
                            fontSize: '1.2em'
                        }
                    }
                },
                legend: {
                    reversed: true
                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                },
                series: winner
            });

                          
        }).catch((err) => {
            console.log("error occured", err)
        })
}
matchesWonPerTeamPerYear()


function extraRunConceded() {
    fetch("/extraRunConceded")
        .then((resp) => {
            if (resp.ok === true) {
                return resp.json()
            }
            else {
                throw new Error("Error occurred in response")
            }
        })
        .then((data) => {
            let team = Object.keys(data)
            let extraConcededRuns = Object.values(data)


            Highcharts.chart('chart3', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Extra runs conceded per team in the year 2016',
                    style: {
                        fontSize: '2.5em'
                    }
                },

                xAxis: {
                    categories: team,
                    title: {
                        text: 'Team Names',
                        style: {
                            color: '#A18723',
                            fontSize: '1.2em'
                        }
                    }
                },
                yAxis: {
                    labels: {
                        overflow: 'justify'
                    },
                    title: {
                        text: 'Extra Run',
                        style: {
                            color: '#A18723',
                            fontSize: '1.2em'
                        }
                    },
                },
                legend: {
                    enabled: false
                },
                series: [{
                    name: 'Extra runs',
                    data: extraConcededRuns
                }],
            })
        }).catch((err) => {
            console.log("error occured", err)
        })
}
extraRunConceded()


function topTenEconomicalBowler() {
    fetch("/topTenEconomicalBowler")
        .then((resp) => {
             if (resp.ok === true) {
                return resp.json()
             }
            else {
               throw new Error("Error occured in response")
            }
        })
        .then((data) => {
            let topbowler=Object.values(data)

            Highcharts.chart('chart4', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Top ten economical bowlers in 2015'
                    ,style: {
                        fontSize: '2.5em'
                    }
                },
                xAxis: {
                    type: 'category',
                    title: {
                        text: 'Players',
                        style: {
                            color: '#A18723',
                            fontSize: '1.2em'
                        }
                    },
                    labels: {
                        rotation: -45,
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Economical Rate'
                    }
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: 'Economy Rate: <b>{point.y:.1f}</b>'
                },
                series: [{
                    name: 'Economy Rate',
                    data: topbowler,
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#FFFFFF',
                        align: 'right',
                        format: '{point.y:.1f}', 
                        y: 10, 
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                }]
            })
        }).catch((err) => {
            console.log("error occurred", err)
        })
}
topTenEconomicalBowler()



