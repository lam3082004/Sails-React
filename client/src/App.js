import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [pingResponse, setPingResponse] = useState(null);

  useEffect(() => {
    fetch('http://localhost:1337/api/ping')
      .then(response => response.json())
      .then(data => setPingResponse(data.message))
      .catch(error => console.error('Error fetching ping:', error));
  }, []);


  return (
    <div className="App">
      <h1>WelCome to My CNS</h1>
      <p className="ping-text">
        Ping Response: <span className="ping-response">{pingResponse || 'Loading...'}</span>
      </p>
    </div>
  );
}

export default App;
