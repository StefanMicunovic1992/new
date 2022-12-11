import { useState } from 'react';
import axios from 'axios';
import Navigation from '../Navigation/Navigation';
import './Administrator.css'



function Administrator() {

  const [name, setName] = useState()
  const [chanelId, setChanelId] = useState()


  const sendPodcastToDatabase = e => {

    const onePodcast = {
      name: name,
      chanelId: chanelId
    }
    const result = axios.post('http://localhost:5000/app/savePodcastInDatabase', onePodcast)
      .then(res => checkStatus(res))

    const checkStatus = (res) => {
      if(res.status == 200){
        console.log(res.status)
        const nameOfPodcast = document.getElementById('nameOfPodcast').value = '';
        console.log(nameOfPodcast);
        const chanelId = document.getElementById('chanelId').value = '';
        console.log(chanelId);
      }
    }
  }

  return (
    <div id='mainDiv'>
      <div>
        <Navigation></Navigation>
      </div>
      <div>
        <label htmlFor="nameOfPodcast">Name</label>
        <input type="text" id='nameOfPodcast' name="nameOfPodcast" onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="chanelId">chanel ID</label>
        <input type="text" id='chanelId' name="chanelId" onChange={(e) => setChanelId(e.target.value)} />
      </div>
      <input type="submit" id='btnSubmit' value="SAVE" onClick={(e) => sendPodcastToDatabase(e)} />
    </div>
  );
}

export default Administrator;
