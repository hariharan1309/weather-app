import { Dispatch, SetStateAction } from "react";

export type City={
    id:string
    name:string;
    countryName:string;
    population:number;
    timeZone:string;
    coordinates:{
        lon:string,
        lat:string
    }
}

export type WeatherData= {
    cloud: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    };
    timezoneOffset: number;
    sunrise: number;
    sunset: number;
    condition: string;
  }
  
  export type ImgProp = {
    icon: string;
    bg: string;
};

export type ClimateType={ 
    data: WeatherData;
    setShowClimate: Dispatch<SetStateAction<boolean>>;
    dataType: string;
  }
export type ClimateCardType={
  data:WeatherData;
  img:ImgProp;
  dataType:string;
}