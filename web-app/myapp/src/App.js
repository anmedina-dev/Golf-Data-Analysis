import React, {useEffect, useState} from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'
import axios from 'axios'

function App() {

  const [scores, setScores] = useState([]);
  const [years, setYears] = useState([]);
  const [tourneys, setTourneysDropdown] = useState([]);
  const [sYear, setSelectYear]  = useState(0);
  const [sTourney, setSelectTourney]  = useState('');

  useEffect(() => {
    getTournScores();
  }, []);

  useEffect(() => {
    getThemYears();
  }, []);

  useEffect(() =>{
    getTournDropdown();
  }, [tourneys]);




  //Get specific tournament
  const getTournScores = async(e=0) => {
    if(e){
      e.preventDefault();    
      const {tournamentTitle, year} = e.target
      let temp = `/api/golf/${year.value}/${tournamentTitle.value}`
      const res = await axios.get(temp)
      const data = res.data
      setScores(data)
      year.value = ''
      tournamentTitle.value = ''
    }else{
      const res = await axios.get('/api/golf')
      const data = res.data
      setScores(data)
    }
  }

  const getThemYears = async() => {
    const res = await axios.get('/api/golf/getyears')
    setYears(res.data)
    //console.log(years)
  }

  const getTournDropdown = async() => {
    let temp = `/api/golf/${sYear.value}`
    const res = await axios.get(temp)
    const data = res.data
    setTourneysDropdown(data)
  }

  function newYearSetter(option){   
    setSelectYear(option)
    console.log(option.label)
    //console.log(years)
    //console.log(sYear)
    getTournDropdown()
    console.log(scores)
  }

  const newTourneySetter = async(option) =>{   
    setSelectTourney(option)
    console.log(sYear)
    console.log(option.label)

    let temp = `/api/golf/${sYear.value}/${option.label}`
    const res = await axios.get(temp)
    const data = res.data
    setScores(data)
  }

  return (
    <div className="App">
      <div className="DataInput">
        <h1>TESTING</h1>
        <Dropdown classname = "myYearSelect" options={years} value={sYear} onChange={newYearSetter} placeholder="Select a year" />
        <Dropdown options={tourneys} value={sTourney} onChange={newTourneySetter} placeholder="Select a tournament" />  
        {/*
        <form onSubmit={e => getTournScores(e)}>
            <label htmlFor="tournamentTitle">Tournament:</label>
            <input type="text" name="tournamentTitle" />
            <label htmlFor="year">Year:</label>
            <input type="number" name="year"/>
            <button type="submit">Check Tournament</button>
        </form>
        */}
      </div>
      <div className="DataOutput">
        {scores.length > 0 && 
        <div><h3>{scores[0].Title}</h3></div>
        }
        {scores.map(scores => (
          <div key={scores._id}>{scores.Name}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
