import React from "react";
import Grid from '@mui/material/GridLegacy';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Prayer from "./Prayer";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";
import moment from "moment";
moment.locale("ar"); // without this line it didn't work
import "moment/dist/locale/ar-sa";
import { useState, useEffect } from "react"; 

export default function MainContent() {
  // States
  const [nextPrayerIndex, setNextPrayerIndex] = useState(0);
const [timings, setTimings] = useState({
        Fajr: "04:50",
            Dhuhr: "12:59",
            Asr: "16:36",
            Maghrib: "19:34",
            Isha: "20:57",
});

const [remainingTime, setRemainingTime] = useState("")

const [selectedCity, setSelectedCity] = useState({
  displayName: "القاهرة",
  apiName: "Cairo",
});


const [today, setToday] = useState("")


const availableCities = [ 
  {
    displayName: "القاهرة",
    apiName: "Cairo",
  },
  {
    displayName: "الاسكندرية",
    apiName: "Alexandria",
  },
  {
    displayName: "الجيزة",
    apiName: "Giza",
  },
];

    const prayerArray = [
      {key: "Fajr", displayName: "الفجر"},
      {key: "Dhuhr", displayName: "الظهر"},
      {key: "Asr", displayName: "العصر"},
      {key: "Maghrib", displayName: "المغرب"},
      {key: "Isha", displayName: "العشاء"},
    ];
    const getTimings = async () =>  {
    console.log("calling the api");
    const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?country=Egypt&city=${selectedCity.apiName}`
    );
  setTimings(response.data.data.timings);
  };
useEffect(() => {
    getTimings();

}, [selectedCity]);

useEffect(() => {
     let interval = setInterval(() => {
      setupCountdownTimer();
((t) => {
  return t - 1;
});
  }, 1000);
  
  const t = moment();
  setToday(t.format("MMM, Do YYYY | h:mm"));

return () => {
  clearInterval(interval);
};
}, [timings]);


const setupCountdownTimer = () => {
    const momentNow = moment();

    let PrayerIndex = 2;

    if(
      momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) && 
      momentNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))
    ){
      PrayerIndex = 1;
  }else if (
      momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) && 
      momentNow.isBefore(moment(timings["Asr"], "hh:mm"))
    ){
      PrayerIndex = 2;
  }else if (
      momentNow.isAfter(moment(timings["Asr"], "hh:mm")) && 
      momentNow.isBefore(moment(timings["Maghrib"], "hh:mm"))
    ){
      PrayerIndex = 3;
  } else if (
      momentNow.isAfter(moment(timings["MAghrib"], "hh:mm")) && 
      momentNow.isBefore(moment(timings["Isha"], "hh:mm"))
    ){
      PrayerIndex = 4;
  } else{
      PrayerIndex = 0;
  }
      setNextPrayerIndex(PrayerIndex);

  const nextPrayerObject = prayerArray[PrayerIndex];
  const nextPrayerTime = timings[nextPrayerObject.key];
  const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm");

  let remainingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow);



  if(remainingTime < 0) {
    const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
    const fajrToMidnightDiff = nextPrayerTimeMoment.diff(
      moment("00:00:00", "hh:mm:ss"));

const totalDiffernce = midnightDiff + fajrToMidnightDiff;
remainingTime = totalDiffernce;
  }

    console.log(remainingTime);

  const durationRemainingTime = moment.duration(remainingTime);

setRemainingTime(`${
  durationRemainingTime.seconds()} :
 ${durationRemainingTime.minutes()} :
  ${durationRemainingTime.hours()}`)


  console.log("the next prayer is", nextPrayerTime);
  console.log(momentNow.isBefore(moment(timings["Fajr"], "hh:mm")));

    const Isha = timings["Isha"];
    const IshaMoment = moment(Isha, "hh:mm")
    console.log(momentNow.isBefore(IshaMoment));
};

      const handleCityChange = (event) => {
        const cityObject = availableCities.find((city) => {
          return city.apiName == event.target.value;
        });
    console.log("the new value is", event.target.value);
    setSelectedCity(cityObject);
  };






    return (
<>
{/* Top Row */}
<Grid container>
    <Grid xs={6}>
        <div>
            <h2>{today}</h2>
            <h1>{selectedCity.displayName}</h1>

            {/* <h2>{timer}</h2 */}
        </div>
    </Grid>

    <Grid xs={6} >
        <div>
            <h2>متبقي حتي صلاة  {prayerArray[nextPrayerIndex].displayName}</h2>
            <h1>{remainingTime}</h1>
        </div>
    </Grid>
    </Grid>
    {/* Top Row */}
    <Divider style={{ borderColor: "white", opacity: "0.1", margin: "20px"}} />

{/* prayes cards */}
<Stack direction="row" justifyContent={"space-around"} style={{marginTop: "30px", display: "flex", gap: "20px"}} >
    <Prayer name="الفجر" 
    time= {timings.Fajr} 
    image= "https://newsroom.info/UploadCache/libfiles/7/1/800x450o/314.jpg"/>
    <Prayer name="الظهر" 
    time= {timings.Dhuhr} 
    image= "https://www.elaosboa.com/wp-content/uploads/2023/02/elaosboa02453.webp"/>
    <Prayer name="العصر" 
    time= {timings.Asr} 
    image= "https://www.dar-alifta.org/images/Fatwa/prayer21-05-2023.jpg"/>
    <Prayer name="المغرب" 
    time= {timings.Maghrib} 
    image= "https://www.mobtada.com/resize?src=uploads/images/2022/04/16503174770.jpg&w=750&h=450&zc=0&q=70"/>
    <Prayer name="العشاء" 
    time= {timings.Isha}
     image= "https://img.parlmany.com/large/33537.jpg"/>
</Stack>
{/* prayes cards */}

{/* select */}
  <Grid container justifyContent="center" style={{ marginTop: "40px" }}>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
        <span style={{color: "white"}}>المدينة</span>
        </InputLabel>
        <Select
        style={{color: "white"}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
        //   value={age}
          label="Age"
          onChange={handleCityChange}
        >
          {availableCities.map((city) => {
                return (
          <MenuItem value={city.apiName} key={city.apiName}
          >
            {city.displayName}
          </MenuItem>
                )
          })}  
        </Select>
      </FormControl>
      </Grid>
      </Grid>
      {/* Select */}
</>
);
}

