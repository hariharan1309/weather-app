'use client'
import Image from "next/image"
import {useState} from 'react';

export default function Location({getWeather}:{getWeather:({lat,lon}:{lat:string,lon:string})=> void}){
    const [location, setLocation] = useState<{latitude:string;longitude:string}>({latitude:'',longitude:''});

    function getLocation() {
        if (navigator.geolocation) {
            console.log("Location");
            navigator.geolocation.getCurrentPosition(
                position => {
                    setLocation({
                        latitude: position.coords.latitude.toString(),
                        longitude: position.coords.longitude.toString(),
                    });
                    getWeather({lat: position.coords.latitude.toString(), lon: position.coords.longitude.toString()});
                },
                error => console.error('Error getting location:', error)
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }

    const handleClick = () => {
        getLocation();
    };

    return (
        <button onClick={handleClick}>
            <span className="flex gap-1 bg-slate-500 rounded-full p-2 px-auto mx-[1vw]">
                <Image src="/icons/location.png" alt="location" width={24} height={24} />
                <span>Location</span>
            </span>
        </button>
    );
}
