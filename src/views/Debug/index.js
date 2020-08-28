import React, { useState, useContext, useEffect } from "react";
import RoundLoader from "components/RoundLoader";
import "./style.scss";
import { Card, CardContent, CardActions, CardHeader } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import useFetch from "hooks/useFetch";
import JSONPretty from "react-json-pretty";
function Debug(props) {
  const { fetch: fetch1, data: data1, loading: loading1, error} = useFetch();
  const { fetch: fetch2, data: data2, loading: loading2} = useFetch();


  const options = {
    addBaseUrl: false,
    addHeaders: false,
    url: "https://jsonplaceholder.typicode.com/todos/1",
    method: "GET"
  }
  const handleApi1 = async ()=>{
    try{
      let result1 = fetch1(options)
    } catch(e){

    }
  }

  const handleApi2 =  async ()=>{
    try{
      let result2 = fetch2(options)
    } catch(e){

    }
  }
  


  useEffect(() => {
    handleApi1();
    handleApi2();

  }, []);


  if (loading1) return <RoundLoader />;
  return (
    <div className="flex flex-col justify-center  items-center h-full">
      <Button
        onClick={() => {
          handleApi1();
        }}
        variant="contained"
        color="secondary"
      >
        try Api
      </Button>

      <Card >
        <CardHeader title="Anomalie" />
        <CardContent className="cardebug">

          {error ? (
            <div>error</div>
          ) : (
            <>
              <JSONPretty id="json-pretty" data={data1}></JSONPretty>
              <JSONPretty id="json-pretty" data={data2}></JSONPretty>
            </>
            )}
        </CardContent>
      </Card>

    </div>
  );
}

export default Debug;
