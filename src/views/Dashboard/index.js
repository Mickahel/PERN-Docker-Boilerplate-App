import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import useFetch from 'hooks/useFetch'
import PaymentOutlinedIcon from '@material-ui/icons/PaymentOutlined';
import "./style.scss";
import axios from 'axios'
import RoundLoader from 'components/RoundLoader'

function Dashboard(props) {
  const themeContext = useContext(ThemeContext);
  const { fetch, data } = useFetch()

  const loadData = async () => {
    // console.log(await fetch({
    //   url:"/v1/admin/server/healthcheck",
    //   method:"GET"}))

  }

  useEffect(() => {
    themeContext.setTitle("dashboard.dashboard", <PaymentOutlinedIcon />)
    loadData()
  }, [])
  //return <div className="dashboard"></div>
  //return <RoundLoader/>
  return (
    <div className="dashboard">
      <div>a</div>
      <br></br>
      <div>a</div>
      <br></br>
      <div>a</div>
      <br></br>
      <div>a</div>
      <br></br>
      <div>a</div>
      <br></br>
      <div>a</div>
      <br></br>
      <div>a</div>
      <br></br>
      <div>a</div>
      <br></br>
      <div>a</div>
      <br></br>
      <div>a</div>
      <br></br>
      <div>a</div>
      <br></br>
      <div>a</div>
      <br></br>
      <div>a</div>
      <br></br>
      <div>a</div>
      <br></br>
      <div>a</div>
      <br></br>
      <div>a</div>
      <br></br>
      <div>a</div>
      <br></br>
      <div>a</div>
      <br></br>
      <div>a</div>
      <br></br>
      <div>a</div>
      <br></br>
      <div>a</div>
      <br></br>
      <div>a</div>
      <br></br>
      <div>a</div>
      <br></br>
      <div>a</div>
      <br></br>
      <div>a</div>
      <br></br>
      <div>a</div>
      <br></br>
      <div>a</div>
      <br></br>
      <div>a</div>
      <br></br>
      <div>a</div>
      <br></br>
      <div>a</div>
      <br></br>
      <div>a</div>
      <br></br>
      <div>a</div>
      <br></br>
      <div>a</div>
      <br></br>
      <div>b</div>
      <br></br>
    </div>
  )
}

export default Dashboard;
