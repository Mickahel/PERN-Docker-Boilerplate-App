import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
//import { UserContext } from 'context/Providers/UserProvider';

function About(props){

    const history = useHistory();



    return(
        <div>
            <button onClick={()=>{history.push("/team")}}>team</button>
        </div>
    )
}

export default About