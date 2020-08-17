import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import useFetch from 'hooks/useFetch'
import PaymentOutlinedIcon from '@material-ui/icons/PaymentOutlined';
import RoundLoader from 'components/RoundLoader'
import "./style.scss";


function Dashboard(props) {
  const themeContext = useContext(ThemeContext);
  const {data} = useFetch({
    url: "https://api.exchangeratesapi.io/latest",
    addBaseUrl:false,
    addHeaders:false,
    method: "GET"
  })
  console.log(data)
  useEffect(() => {
    themeContext.setTitle("dashboard.dashboard", <PaymentOutlinedIcon />)
  }, [])
  return (
    <div>
      {Object.keys(data.rates).map(key=>(
        <p key={key}>-<strong>{key}:</strong>{data.rates[key]}</p>
      ))}
    </div>
  )
}

export default Dashboard;
