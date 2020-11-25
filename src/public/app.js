//1
function matchesPerYear() {
    fetch("/matchesPerYear.json")
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
                    text: 'Matches per year'
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
                    name: 'Population',
                    data: array
                  ,
                }]
            });
                          
        }).catch((err) => {
            console.log("error occurred", err)
        })
}
matchesPerYear()
//2
function matchesWonPerTeamPerYear() {
    fetch("/matchesWonPerTeamPerYear.json")
        .then((resp) => {
            if (resp.ok === true) {
                return resp.json()
            }
            else {
                throw new Error("Error occurred in response")
            }
        })
        .then((data) => {

            let team=data.teams
            let winner=data.matches

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

//3
function extraRunConceded() {
    fetch("/extraRunConceded.json")
        .then((resp) => {
            if (resp.ok === true) {
                return resp.json()
            }
            else {
                throw new Error("Error occurred in response")
            }
        })
        .then((data) => {
          //  console.log(data)
            let team = Object.keys(data)
            let extraConcededRuns = Object.values(data)
           // console.log(team)


            Highcharts.chart('chart3', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Extra run conceded',
                    style: {
                        fontSize: '2.5em'
                    }
                },
                subtitle: {
                    text: 'Extra runs conceded per team in the year 2016',
                    style: {
                        fontSize: '1.2em'
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
                    name: 'runs',
                    data: extraConcededRuns
                }],
            })
        }).catch((err) => {
            console.log("error occured", err)
        })
}
extraRunConceded()
//4
function topTenEconomicalBowler() {
    fetch("/topTenEconomicalBowler.json")
        .then((resp) => {
             if (resp.ok === true) {
                return resp.json()
             }
            else {
               throw new Error("Error occured in response")
            }
        })
        .then((data) => {
            console.log(data)

            let topbowler=Object.values(data)

            Highcharts.chart('chart4', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Top ten economical bowlers in ipl'
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
                    name: 'Population',
                    data: topbowler,
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#FFFFFF',
                        align: 'right',
                        format: '{point.y:.1f}', // one decimal
                        y: 10, // 10 pixels down from the top
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                }]
            })


        }).catch((err)=>{
            console.log("error occured", err)
        })
}
topTenEconomicalBowler()



