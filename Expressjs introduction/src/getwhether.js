const express = require('express')
const axios = require('axios')
const dotenv = require('dotenv').config()
const key = process.env.WHEATHER_API_KEY;
const getDataByCity=async(city,cb)=>{
        
        
       const url=`http://api.openweathermap.org/geo/1.0/direct?q=${city}&{GJ}&{IN}&limit=10&appid=${key}`;
       try {
                const res = await axios.get(url);
                console.log(res.data[1].lat,res.data[1].lon)

                cb({lat:res.data[1].lat,lon:res.data[1].lon});
       } catch (error) {
            cb(undefined,error)
       }
}

const getwhetherCall = async(lat,lon,cb)=>{
    const url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
    try {
        const res = await axios.get(url);
        console.log(res)
        cb(res.data.main)
    } catch (error) {
        console.log(error)
        cb(undefined,error)
    }
}

module.exports={getDataByCity,getwhetherCall}