const envVariable = require('./config')
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : envVariable.DB_HOST,
  user     : envVariable.DB_USER,
  password : envVariable.DB_PASS,
  database : envVariable.DB_NAME,
})

connection.connect()

connection.query('USE ipl',(error) => {
    if(error){
      throw error;
    } 
  });

let createTableDeliveries = 'CREATE TABLE IF NOT EXISTS deliveries(match_id INT,inning INT,batting_team VARCHAR(60),bowling_team VARCHAR(60),over INT,ball INT,batsman VARCHAR(60),non_striker VARCHAR(60),bowler VARCHAR(60),is_super_over BOOLEAN,wide_runs INT,bye_runs INT,legbye_runs INT, noball_runs INT, penalty_runs INT, batsman_runs INT, extra_runs INT, total_runs INT, player_dismissed VARCHAR(60), dismissal_kind VARCHAR(60), fielder VARCHAR(60));'
let createTableMatches = 'CREATE TABLE IF NOT EXISTS matches(Id INT PRIMARY KEY,season INT,city VARCHAR(20),date DATE,team1 VARCHAR(30) NOT NULL,team2 VARCHAR(30) NOT NULL,toss_winner VARCHAR(30),toss_decision VARCHAR(10),result VARCHAR(10),dl_applied BOOLEAN,winner VARCHAR(30),win_by_runs INT,win_by_wickets INT,player_of_match VARCHAR(30), venue VARCHAR(50),umpire1 VARCHAR(30),umpire2 VARCHAR(30),umpire3 VARCHAR(30));'

function creatTable(createTableTableName){
  connection.query(createTableTableName,(error) => {
    if(error){
      throw error;
    } 
  })
}

creatTable(createTableDeliveries)
creatTable(createTableMatches)

let loadMatchesData=`LOAD DATA LOCAL INFILE '/home/lakan/MB/testing/hanamant_ipl_project/src/data/matches.csv' INTO TABLE matches FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;`
let loadDeliveriesData=`LOAD DATA LOCAL INFILE '/home/lakan/MB/testing/hanamant_ipl_project/src/data/deliveries.csv' INTO TABLE deliveries FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;`
function  loadCSV(loadDataInTableName){
    return new Promise((resolve,reject) => {
      connection.query(loadDataInTableName,(error, matchesOwnPerTeamPerYear)=> {
          if(error){
             return reject(error)
          } else{
            return resolve(matchesOwnPerTeamPerYear)
          }
        })
    })
  }
  
function loadDataIfNotLoaded(NumberOfRowInTable,loadDataInTable){
  connection.query(NumberOfRowInTable,(error,count) => {
    if(error){
      throw error;
    } 
    if(count == 0){       
        loadCSV(loadDataInTable)
        .catch((error)=>{
          console.log(error)
        })   
    }else{
      //Already data is loaded
    }
  });
}
  
let NumberOfRowInMatches='select count(*) from matches'
let NumberOfRowInDeliveries='select count(*) from deliveries'
loadDataIfNotLoaded(NumberOfRowInMatches,loadMatchesData)
loadDataIfNotLoaded(NumberOfRowInDeliveries,loadDeliveriesData)

function  matchesPerYear_sql(){
  return new Promise((resolve,reject) => {
    connection.query('SELECT season,count(season) as numberOfMatches FROM matches GROUP BY season', (error, matchesPerYear) => {
        if(error){
           return reject(error)
        } else{
          return resolve(matchesPerYear)
        }
      })
  })
}

function  matchesOwnPerTeamPerYear_sql(){
  return new Promise((resolve,reject) => {
    connection.query('SELECT season,winner,COUNT(winner) as numberOfMatches  FROM matches WHERE winner!="" GROUP BY season,winner ORDER BY season;', (error, matchesOwnPerTeamPerYear) => {
        if(error){
           return reject(error)
        } else{
          return resolve(matchesOwnPerTeamPerYear)
        }
      })
  })
}

function  extraRunConceded_sql(){
  return new Promise((resolve,reject) => {
    connection.query('SELECT d.bowling_team, SUM(d.extra_runs) as extra_runs FROM deliveries d JOIN matches m ON m.id = d.match_id WHERE m.season = 2016 GROUP BY d.bowling_team', (error, extraRunConceded) => {
        if(error){
           return reject(error)
        } else{
          return resolve(extraRunConceded)
        }
      })
  })
}

function  topTenEconomicalBowler_sql(){
  return new Promise((resolve,reject) => {
    connection.query('SELECT bowler, ((runs*1.0)/(overs*1.0))AS over_runs FROM(SELECT bowler , ((count(ball) *1.0) /(6 * 1.0))AS overs, SUM(total_runs)AS runs FROM deliveries JOIN matches ON deliveries.match_id = matches.id  WHERE matches.season = 2015 AND wide_runs=0 AND noball_runs = 0 GROUP BY bowler)inter ORDER BY over_runs LIMIT 10;', (error, topTenEconomicalBowlers) => {
        if(error){
           return reject(error)
        } else{
          return resolve(topTenEconomicalBowlers)
        }
      })
  })
}

module.exports = {
  matchesPerYear_sql,
  matchesOwnPerTeamPerYear_sql,
  extraRunConceded_sql,
  topTenEconomicalBowler_sql,
}


