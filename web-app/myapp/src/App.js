import React, {useEffect, useState} from 'react'
import './App.css'
//import Select from 'react-select'
import 'bootstrap/dist/css/bootstrap.min.css'
//import Golf from '../../models/golf';
import axios from 'axios'


function App() {

  const [scores, setScores] = useState([]);

  useEffect(() => {
    getTournScores();
  }, []);


  // Read

  /*
  const getScores = async () => {
    const res = await axios.get('/api/golf')
    const data = res.data
    setScores(data)
  }
  */

  //Get specific tournament
  const getTournScores = async(e=0) => {
    if(e){
      e.preventDefault();    
      const {tournamentTitle, year} = e.target
      console.log(tournamentTitle.value)
      console.log(year.value)
      let yearly =  year.value
      let tournamently =  tournamentTitle.value
      let temp = `/api/golf/${yearly}/${tournamently}`
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


  return (
    <div className="App">
      <div className="DataInput">
        <h1>TESTING</h1>
        <form onSubmit={e => getTournScores(e)}>
            <label htmlFor="tournamentTitle">Tournament:</label>
            <input type="text" name="tournamentTitle" />
            <label htmlFor="year">Year:</label>
            <input type="number" name="year"/>
            <button type="submit">Check Tournament</button>
        </form>
      </div>
      <div className="DataOutput">
        <div key={scores._id}>{scores.Tournament}</div>
        {scores.map(scores => (
          <div key={scores._id}>{scores.Name}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
