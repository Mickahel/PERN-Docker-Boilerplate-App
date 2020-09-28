import React, { useEffect, useContext } from "react";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import "./style.scss";
import Button from '@material-ui/core/Button';
import useFetch from 'hooks/useFetch'
function Dashboard(props) {
  const themeContext = useContext(ThemeContext);
  const {fetch} = useFetch()


  const handleClick =async ()=>{
    try{
      console.log("hrllo")
      let result = await fetch({
        url:"v1/app/user/test/notification",
        method:"POST"
      })
      console.log(result)

    }catch(e){
      console.log("error in dashboard", e )
    }
  }
  useEffect(() => {
    themeContext.setTitle("dashboard.dashboard", <DashboardOutlinedIcon />)
  }, [])
  return (
    <div className="dashboard">
      <Button variant="contained" color="primary" onClick={handleClick}>
  send notifications
</Button>
    </div>
  )
}

export default Dashboard;
