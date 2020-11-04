import React, {useEffect, useState} from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'
import axios from 'axios'
import {Line} from 'react-chartjs-2'

function App() {

  //Player statistics in each tournament
  const [stats, setStats] = useState([]);
  const [rankTWAvg, setRankTWAvg] = useState([]);
  const [scoresInYear, setScoresInYear] = useState([]);
  const [ranksInYear, setRanksInYear] = useState([]);
  //Distinct years a player has played
  const [distinctPlayerYears, setDistinctYears] = useState([]);

  //A players played in tournaments in a year
  const [playerPlayedTourneysInYear, setPlayerPlayedTourneysInYear] = useState([]);

  //Dropdown menu options 
  const [years, setYearsDropdown] = useState([]);
  const [tourneys, setTourneysDropdown] = useState([]); 
  const [playerTourns, setPlayerDropdown] = useState([]);
  //temp for the dataoutput
  const [scores, setScores] = useState([]);
  //Option menu selected
  const [sYear, setSelectYear]  = useState(0);
  const [sTourney, setSelectTourney]  = useState('');
  const [sPlayer, setSelectPlayer] = useState('');


  ////////useEffects 
  useEffect(() => {
    getTournScores();
  }, [scores]);

  useEffect(() => {
    getThemYears();
  }, []);

  useEffect(() =>{
    getTournDropdown();
  }, [sYear]);

  useEffect(() =>{
    getPlayerDropdown();
  }, [sTourney])

  useEffect(() => {
    getPlayerStats();
  }, [sPlayer])


  useEffect(() => {
    getDistinctPlayedYears();
  }, [sPlayer])

/*
  useEffect(() => {
    getArrayTester();
  }, [rankTWAvg])
*/

  useEffect(() => {
    getRankTWAvg();
  }, [distinctPlayerYears])

  useEffect(() => {
    getPlayerPlayedTourneysInYear();
  }, [sPlayer])

  useEffect(() => {
    getPlayerScoresInYear();
  }, [sPlayer])

  useEffect(() => {
    getPlayerRanksInYear();
  }, [sPlayer])


  //////////DROPDOWN MENU GETTERS//////////  
  //Get players in a specific tournament in a specific year
  const getTournScores = async() => {
    if(sYear && sTourney){
      const res = await axios.get(`https://golfda.herokuapp.com/api/golf/everytourney/${sYear.value}/${sTourney.value}`)
      const data = res.data
      setScores(data)
    }else{
      const res = await axios.get('https://golfda.herokuapp.com/api/golf')
      const data = res.data
      setScores(data)
    }
  }
  //Get years for dropdown menu
  const getThemYears = async() => {
    const res = await axios.get('https://golfda.herokuapp.com/api/golf/getyears')
    const data = res.data
    setYearsDropdown(data.reverse())
  }

  //Get tournaments for the dropdown menu
  const getTournDropdown = async() => {
    const res = await axios.get(`https://golfda.herokuapp.com/api/golf/specificyear/${sYear.value}`)
    const data = res.data
    setTourneysDropdown(data)
  }

  //Get names for the dropdown menu
  const getPlayerDropdown = async() => {
    const res = await axios.get(`https://golfda.herokuapp.com/api/golf/player/${sYear.value}/${sTourney.value}`)
    const data = res.data
    //console.log(sTourney.value)
    //console.log(sYear.value)
    //console.log(data)
    setPlayerDropdown(data)
  }

  //Get all stats of a players from all tournaments found in database
  const getPlayerStats = async() => {
    const res = await axios.get(`https://golfda.herokuapp.com/api/golf/stat/${sPlayer.value}`)
    const data = res.data
    //console.log(data)
    setStats(data)
  }

  //Get distinct years a player has played
  const getDistinctPlayedYears = async() => {
    const res = await axios.get(`https://golfda.herokuapp.com/api/golf/distinctyearsplayed/${sPlayer.value}`)
    const data = res.data
    //console.log(data)
    //console.log(data.reverse())
    setDistinctYears(data)
  }

  //Get the average Rank This Week for a player per year
  //Length of this array should be same as player's distinct years played
  const getRankTWAvg = async() => {
    let avgList = []
    var i, x;
    for(i = 0; i < distinctPlayerYears.length; i++) {
      const res = await axios.get(`https://golfda.herokuapp.com/api/golf/ranktw/${distinctPlayerYears[i]}/${sPlayer.value}`)
      const data = res.data
      let sum = 0
      for(x = 0; x < data.length; x++) {
        sum += data[x]
      }
      avgList.push(sum/data.length)
    }
    setRankTWAvg(avgList)
    //console.log(distinctPlayerYears)
  }

  //Get the tournament a specific player has played in a specfic year
  const getPlayerPlayedTourneysInYear = async() => {
    const res = await axios.get(`https://golfda.herokuapp.com/api/golf/playedtournsyear/${sYear.value}/${sPlayer.value}`)
    const data = res.data
    setPlayerPlayedTourneysInYear(data)
  }

  //Get the Rank of specific player in each tournament in a specific year
  const getPlayerRanksInYear = async() => {
    const res = await axios.get(`https://golfda.herokuapp.com/api/golf/playerranksinyear/${sYear.value}/${sPlayer.value}`)
    const data = res.data
    let fixedData = []
    var x
    for(x = 0; x < data.length; x++){
      fixedData.push(data[x]["Rank This Week"])
    }
    setRanksInYear(fixedData)
  }

   //Get the Average Strokes of specific player in each tournament in a specific year
  const getPlayerScoresInYear = async() => {
    const res = await axios.get(`https://golfda.herokuapp.com/api/golf/playerscoresinyear/${sYear.value}/${sPlayer.value}`)
    const data = res.data
    let fixedData = []
    var x
    for(x = 0; x < data.length; x++){
      fixedData.push(data[x].Average)
    }
    setScoresInYear(fixedData)
  }

  //// OPTIONS MENU ONSUBMIT FUNCTIONS///////
  //When a year is selected
  function newYearSetter(option){   
    setSelectYear(option)
  }

  //When a tournament is selected
  const newTourneySetter = async(option) =>{   
    setSelectTourney(option)
  }

  //When a player is selected
  const newPlayerDropSetter = async(option) =>{   
    setSelectPlayer(option)
  }




  //////Misc. functions

  /*
  const getArrayTester = async() => {
    console.log(rankTWAvg)
  }
*/

  //////// Charts

  //Average Rank Per Year Line Chart
  let playerAvgRankLineChart = {
    labels: distinctPlayerYears,
    datasets: [
      {
        label: `${sPlayer.value}'s Average Rank Every Year`,
        data: rankTWAvg,
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
      }
    ]
  }

  //Scores in everytournament in a year and the tournament they played in
  const rankScoreLine = {
    labels: playerPlayedTourneysInYear,
    datasets: [
      {
        type: 'line',
        label: `${sPlayer.value}'s Scores in ${sYear.value}`,
        borderColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 2,
        fill: false,
        data: scoresInYear,
        yAxisID: 'y-axis-2',
      },
      {
        type: 'line',
        label: `${sPlayer.value}'s Ranks in ${sYear.value}`,
        data: ranksInYear,
        borderColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 2,
        fill: false,
        yAxisID: 'y-axis-1',
      },
    ],
  }

  const scoreRankOptions = {
    scales: {
      yAxes: [
        {
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
        },
        {
          type: 'linear',
          display: true,
          position: 'right',
          id: 'y-axis-2',
          gridLines: {
            drawOnArea: false,
          },
        },
      ],
    },
  }
  

  return (
    <div className="App">
      <div className="DataInput">        
        <h1>PGA Tour Data Visualization</h1>
        <Dropdown classname = "myYearSelect" options={years} value={sYear} onChange={newYearSetter} placeholder="Select a year" />
        <Dropdown options={tourneys} value={sTourney} onChange={newTourneySetter} placeholder="Select a tournament" />
        <Dropdown options={playerTourns} value={sPlayer} onChange={newPlayerDropSetter} placeholder="Select a player" />

      </div>
      <div className="DataOutput container-fluid">
        <div className="row">

          <div className = "col-xs-12 col-md-6 col-lg-6">
            <div className="BackgroundWhite">
              <Line  data={playerAvgRankLineChart}/>
            </div>
          </div>

          <div className = "col-xs-12 col-md-6 col-lg-6">
            <div className="BackgroundWhite">
              <Line data={rankScoreLine} options={scoreRankOptions}/> 
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
