import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
//import { UserContext } from 'context/Providers/UserProvider';

function Team(props){

    const history = useHistory();



    return(
        <div>
            <button onClick={()=>{history.push("/dashboard")}}>dashboard</button>
        </div>
    )
}

export default Team