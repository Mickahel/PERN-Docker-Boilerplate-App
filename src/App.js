import React, {useState,useEffect} from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';
import useFetcher from './useFetcher';

function App() {
  const [data, setData] = useState()
  const {fetch,  data: fetchedData , loading, error} = useFetcher()


  const loadData = async ()=>{
    await fetch({
      method:"GET",
      url: "posts"
    })
  }
  useEffect(()=>{
    loadData()
  },[])

  const callBackendAPI = ()=>{
    console.log("callingBEAPI")
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/upAndRunning`).then(result =>{
      setData({
        text: result.data,
        count: data ? ++data.count : 1
    })})
  }
  console.log(Boolean(loading), Boolean(fetchedData))
  if(loading==false && fetchedData==false) console.log("HEY")
  if(loading) return <img src={logo} className="App-logo" alt="logo" />
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={()=>{callBackendAPI()}}>
          <span style={{color:"#61dafb", fontWeight:"bold"}}>Click <code>Here</code> </span>to call the API from server.
        </p>
        {data && <p>I'm the Server, I would like to tell you "{data.text}" and I've been called {data.count} times</p>}
        <p>Backend URL: {process.env.REACT_APP_BACKEND_URL}</p>
        <button style={{backgroundColor:"#61dafb", boxShadow:"none", color:"white", fontWeight:"bold", padding:"10px", border:"unset", borderRadius:"10px",fontSize:"20px"}}>TRIGGER API</button>
        <div style={{marginTop:"40px"}}>
          <p>List:</p>
          <ul>
          {fetchedData.map((post)=>{
            return <li key={post.title}>{post.title}</li>
          })}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
