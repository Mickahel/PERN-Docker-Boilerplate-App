import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
//import { UserContext } from 'context/Providers/UserProvider';

function Dashboard(props){

    const history = useHistory();



    return(
        <div>
            <button onClick={()=>{history.push("/about")}}>about</button>
        </div>
    )
}

export default Dashboard