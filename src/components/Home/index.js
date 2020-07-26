import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
//import { UserContext } from 'context/Providers/UserProvider';

function Home(props){

    const history = useHistory();
  //  const userContext = useContext(UserContext);

    useEffect(()=>{
        redirect()
    },[])


    const redirect = () => {
        history.push('/dashboard')
    /*    if (userContext.user) {
            history.push('/dashboard')
        } else {
            history.push('/auth/login')
        }*/
    }

    return(
        <div></div>
    )
}

export default Home