import React, { useState } from 'react';
import './App.css';

function App() {

  const [url, setUrl] = useState("")
  const [err, setErr] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const baseUrl = 'http://localhost:3000'

  const handleSubmit = async () => {
    const longUrl = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        longUrl: url
      })
    }
    try {
      const response = await fetch(baseUrl + '/url/shorten', longUrl)
      const resUrl = await response.json()
      if (response.ok) {
        setErr("")
        setShortUrl(resUrl.shortUrl)
      }
      else {
        console.log(response)
        setShortUrl("")
        setErr(`${response.status} Error`)
      }
    } catch (err) {
      setErr("Error")
    }
  }
    
  return (
    <div className="App">
      <header className="App-header">
        <h1>URL Shortener</h1>
        <input onChange={(e) => setUrl(e.target.value)} value={url}></input>
        <button onClick={() => handleSubmit()}>Enter</button>
        <a href={shortUrl} style={{color: "white"}} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
        <p>{err}</p>
      </header>
    </div>
  );
}

export default App;
