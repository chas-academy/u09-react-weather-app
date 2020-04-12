import React, {useState, useEffect } from 'react';
import { usePosition } from 'use-position';
import Axios from 'axios';
import {useAsyncEffect} from 'use-async-effect';
var moment = require('moment');


const useFetch = (url: RequestInfo) => {
  const [ data, setData ] = useState({});
  const [ loading, setLoading ] = useState(true);

  
  useAsyncEffect( async () => {
    const response = await fetch(url);
    const data = await response.json();
    const [items] = data.results;
    console.log(data);
    setData(items);
    setLoading(false);

  }, []);

  return {data, loading};
  
}


export const MainCard = () =>  {
  

  const {data, loading } = useFetch(`https://api.openweathermap.org/data/2.5/forecast?lat=35&lon=135&units=metric&appid=5a274b56354a707ffc91ac0c8eec0c72`);

  return (
    <div>{loading}</div>
  );
}