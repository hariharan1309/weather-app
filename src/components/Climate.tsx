'use client'
// Climate.tsx
import { ClimateType, ImgProp } from "./types";
import Card2 from "./ClimateCard";
import { climates } from "./images";
import { useState, useEffect } from "react";
import ClimateCard from "./ClimateCard";
// import { WeatherData } from "./types";

export default function Climate({ data, setShowClimate,dataType }: ClimateType) {
    const getClimateImage = (weather: string, day: boolean) => {
        const indexValue = climates.findIndex((climate) => climate.name.toLowerCase().includes(weather.toLowerCase()));
        const climate = climates[indexValue?indexValue:0];
        console.log(climate);
        const index = climate.value;
        const bgImage = climate.img;
        console.log("Climate:", climate, "Index:", index, "Day:", day)

        let res = `https://openweathermap.org/img/wn/${index}${day ? 'd' : 'n'}@2x.png`;
        console.log("Image URL:", res,"BG",bgImage);
        setImgData({ icon: res, bg: bgImage });
    };

    const isDay = () => {
        return data.condition === 'day';
    };

    useEffect(() => {
        getClimateImage(data.weather.main, isDay());
    }, [data]);

    const [imgData, setImgData] = useState<ImgProp | null>(null);
    return (
        <div className="flex flex-col z-20 w-full">
            {imgData !== null && 
            <div className="relative ">
                <ClimateCard data={data} img={imgData} dataType={dataType} />
                <span className="absolute top-0 right-0 text-lg rounded-tr-lg rounded-bl-lg font-semibold px-5 py-2 cursor-pointer bg-slate-500 text-white " onClick={()=>{setShowClimate(false)}}>close </span>
            </div>}
        </div>
    );
}
