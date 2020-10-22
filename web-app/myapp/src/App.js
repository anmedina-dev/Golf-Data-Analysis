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
  //Distinct years a player has played
  const [distinctPlayerYears, setDistinctYears] = useState([]);
  const [distinctPlayerYearsReversed, setDistinctYearsReversed] = useState([]);

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
  }, [years]);

  useEffect(() =>{
    getTournDropdown();
  }, [tourneys]);

  useEffect(() =>{
    getPlayerDropdown();
  }, [playerTourns])

  useEffect(() => {
    getPlayerStats();
  }, [stats])


  useEffect(() => {
    getDistinctPlayedYears();
  }, [distinctPlayerYears])


  useEffect(() => {
    getArrayTester();
  }, [rankTWAvg])

  useEffect(() => {
    getRankTWAvg();
  }, [])


  //////////DROPDOWN MENU GETTERS//////////  
  //Get players in a specific tournament in a specific year
  const getTournScores = async() => {
    if(sYear && sTourney){
      const res = await axios.get(`/api/golf/everytourney/${sYear.value}/${sTourney.value}`)
      const data = res.data
      setScores(data)
    }else{
      const res = await axios.get('/api/golf')
      const data = res.data
      setScores(data)
    }
  }
  //Get years for dropdown menu
  const getThemYears = async() => {
    const res = await axios.get('/api/golf/getyears')
    setYearsDropdown(res.data)
  }

  //Get tournaments for the dropdown menu
  const getTournDropdown = async() => {
    const res = await axios.get(`/api/golf/specificyear/${sYear.value}`)
    const data = res.data
    setTourneysDropdown(data)
  }

  //Get names for the dropdown menu
  const getPlayerDropdown = async() => {
    const res = await axios.get(`/api/golf/player/${sYear.value}/${sTourney.value}`)
    const data = res.data
    setPlayerDropdown(data)
  }

  //Get all stats of a players from all tournaments found in database
  const getPlayerStats = async() => {
    const res = await axios.get(`/api/golf/stat/${sPlayer.value}`)
    const data = res.data
    //console.log(data)
    setStats(data)
  }

  //Get distinct years a player has played
  const getDistinctPlayedYears = async() => {
    const res = await axios.get(`/api/golf/distinctyearsplayed/${sPlayer.value}`)
    const data = res.data
    setDistinctYears(data)
    setDistinctYearsReversed(data.reverse())
  }

  //Get the average Rank This Week for a player per year
  //Length of this array should be same as player's distinct years played
  const getRankTWAvg = async() => {
    let avgList = []
    console.log(distinctPlayerYearsReversed)
    var i, x;
    for(i = 0; i < distinctPlayerYearsReversed.length; i++) {
      const res = await axios.get(`/api/golf/ranktw/${distinctPlayerYearsReversed[i]}/${sPlayer.value}`)
      const data = res.data
      let sum = 0
      for(x = 0; x < data.length; x++) {
        sum += data[x]
      }
      avgList.push(sum/data.length)
    }
    setRankTWAvg(avgList)
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

  const getArrayTester = async() => {
    console.log(rankTWAvg)
  }


  let lineData = {
    labels: distinctPlayerYearsReversed,
    datasets: [
      {
        label: `${sPlayer.value}'s Average This Week Rank`,
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


  return (
    <div className="App">
      <div className="DataInput">
        <h1>TESTING</h1>
        <Dropdown classname = "myYearSelect" options={years} value={sYear} onChange={newYearSetter} placeholder="Select a year" />
        <Dropdown options={tourneys} value={sTourney} onChange={newTourneySetter} placeholder="Select a tournament" />
        <Dropdown options={playerTourns} value={sPlayer} onChange={newPlayerDropSetter} placeholder="Select a player" />
        <button onClick={getRankTWAvg}>Find Average Player</button>

      </div>
      <div className="DataOutput">
        {/*
        {scores.length > 0 && 
        <div><h3>{scores[0].Year} {scores[0].Title}</h3></div>
        }
        {scores.map(scores => (
          <div key={scores._id}>{scores.Name}</div>
        ))}

        */}


        <div className = "RankTW-LineChart">
          <Line data={lineData}/>
        </div>

      </div>
    </div>
  );
}

export default App;
