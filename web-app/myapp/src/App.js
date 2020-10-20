import React, {useEffect, useState} from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'
import axios from 'axios'
var _ = require('underscore')

function App() {

  //Working on right now
  const [distinctPlayerYears, setDistinctYears] = useState([]);

  //Player 
  const [stats, setStats] = useState([]);
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

  ////////    useEffects 
  useEffect(() => {
    getTournScores();
  }, []);

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
  })





  //////////DROPDOWN MENU GETTERS//////////  
  //Get players in a specific tournament in a specific year
  //Fix to update (not necessary)
  const getTournScores = async(option=0) => {
    if(option){

      let temp = `/api/golf/everytourney/${sYear.value}/${option.label}`
      const res = await axios.get(temp)
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
    let temp = `/api/golf/specificyear/${sYear.value}`
    const res = await axios.get(temp)
    const data = res.data
    setTourneysDropdown(data)
  }

  //Get names for the dropdown menu
  const getPlayerDropdown = async() => {
    const temp = `/api/golf/player/${sYear.value}/${sTourney.value}`
    const res = await axios.get(temp)
    const data = res.data
    setPlayerDropdown(data)
  }

  //Get all stats of a players from all tournaments found in database
  const getPlayerStats = async() => {
    //console.log(sPlayer.value)
    let temp = `/api/golf/stat/${sPlayer.value}`
    const res = await axios.get(temp)
    const data = res.data
    //console.log(data)
    setStats(data)
  }

  const getDistinctPlayedYears = () => {
    findYearsInPlayerCareer()
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

  //Find the years a player has played
  const findYearsInPlayerCareer = () =>{
    const dYears = _.keys(_.countBy(stats, function(stats) { return stats.Year; }));
    //console.log(dYears)
  }

  return (
    <div className="App">
      <div className="DataInput">
        <h1>TESTING</h1>
        <Dropdown classname = "myYearSelect" options={years} value={sYear} onChange={newYearSetter} placeholder="Select a year" />
        <Dropdown options={tourneys} value={sTourney} onChange={newTourneySetter} placeholder="Select a tournament" />
        <Dropdown options={playerTourns} value={sPlayer} onChange={newPlayerDropSetter} placeholder="Select a player" />  

      </div>
      <div className="DataOutput">
        {scores.length > 0 && 
        <div><h3>{scores[0].Year} {scores[0].Title}</h3></div>
        }
        {scores.map(scores => (
          <div key={scores._id}>{scores.Name}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
