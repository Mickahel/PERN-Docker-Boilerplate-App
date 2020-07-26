import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
//import { UserContext } from 'context/Providers/UserProvider';

function Dashboard(props){

    const history = useHistory();



    return(
        <div>
            <button onClick={()=>{history.push("/about")}}>about</button>
            <button onClick={()=>{
                navigator.serviceWorker.register('service-worker.js').then(response=> console.log("RSP:",response)).catch(error =>console.log("Error:", error))}}>register SW</button>
        </div>
    )
}

export default Dashboard