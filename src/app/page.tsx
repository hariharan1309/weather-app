'use client';
import Climate from "@/components/Climate";
import SearchBar from "@/components/SearchBar";
import Table from "@/components/Table";
import { City, WeatherData } from "@/components/types";
import { useEffect, useState ,useRef} from "react";
import Toggle from '@/components/Toggle'

export default function Home() {
  const [data, setData] = useState<City[]>([]); // Initialize with empty array
  const [showClimate,setShowClimate]=useState(false);
  const [curClimate,setCurClimate]=useState<WeatherData|null >(null)
  const [dataType,setDataType]=useState<"f"| "c">("f");
  const [offset,setOffSet]=useState(0);
  const [hasNext,setHasNext]=useState(true);
  const fetchData = async () => {
    const baseURL = 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records';
    const selectParams = 'geoname_id,name,cou_name_en,population,timezone,coordinates';
    const limitParam = 'limit=50';
    const orderParam="orderby=name ASC"
    const finalURL = `${baseURL}?select=${selectParams}&${limitParam}&offset=${offset}`;//&where=${searchParam}
    const response = await fetch(finalURL);
    const responseData = await response.json();
    const totalRecords = responseData.total_count;
    const remainingRecords = totalRecords - (offset + 50);
    const hasMoreData = remainingRecords > 0;
    setHasNext(hasMoreData);

    const values = responseData.results.map((record: any) => ({
      id: record.geoname_id,
      name: record.name,
      countryName: record.cou_name_en,
      population: record.population,
      timeZone: record.timezone,
      coordinates: {
        lon: record.coordinates.lon,
        lat: record.coordinates.lat
      }
    }));
    console.log("");
    setData((prev) => {
      const newData = [...prev]; 
      values.forEach((newValue:any) => {
        if (!newData.some((existingItem) => existingItem.id === newValue.id)) {
          newData.push(newValue);         }
      });
      return newData; // Return the updated array
    });

  };
  const getWeather=async()=>{
    const apiKey='171e27ebebbc08a6bab106bc1270030d';
    const resp=await fetch(`http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${apiKey}`)
    const data=await resp.json();
    console.log(data);
  }
  const getSingleWeather = async ({ lat, lon }: { lat: string, lon: string }) => {
    try {
      const apiKey = '171e27ebebbc08a6bab106bc1270030d';
      const unit=dataType==='f'?'imperial':'metric'
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      
      const values = {
        cloud: data.clouds.all,
        feels_like: data.main.feels_like,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temp: data.main.temp,
        temp_max: data.main.temp_max,
        temp_min: data.main.temp_min,
        visibility: data.visibility,
        wind_speed: data.wind.speed,
        wind_deg: data.wind.deg,
        weather: data.weather[0],
        timezoneOffset: data.timezone, // Updated to timezone offset in seconds
        sunrise: data.sys.sunrise * 1000, // Convert seconds to milliseconds
        sunset: data.sys.sunset * 1000, // Convert seconds to milliseconds
        condition:''
      };
  
      const currentTime = new Date().getTime();
      console.log(values);
      if (currentTime > values.sunrise && currentTime < values.sunset) {
        values.condition='day';
      } else {
        values.condition='night';
      }
      // console.log(values);
      setCurClimate(values);
      setShowClimate(true);  
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

    useEffect(() => {
      fetchData();
      getWeather();
      const handleScroll = () => {
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        const clientHeight = document.documentElement.clientHeight || window.innerHeight;
        const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
      
        if (scrolledToBottom && hasNext) {
          console.log("Scrolled to the bottom of the page offset:"+offset);
          // Fetch more data
          setOffSet(offset + 50);
        }
      };
      
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [offset, hasNext]);
  return (
    <main className="base relative">
      <div onClick={()=>{showClimate===true?setShowClimate(false):null}}>
          <div className="flex bg-gray-50 items-center sticky top-0 z-20 shadow-lg mx-auto ">
            <div className="min-w-[85%] flex-grow-1">
              <SearchBar getWeather={getSingleWeather}/>
            </div>
            <div className="flex flex-row gap-1">
                <span className="text-xl font-semibold">{dataType.toUpperCase()}</span>
                <Toggle setDataType={setDataType}/>
            </div>
          </div>
        <div className="md:px-[10vw]  py-[1vw] flex flex-col gap-2">
          <Table data={data} getWeather={getSingleWeather}/>
        </div>
      </div>
      <div>
      {showClimate && data!==null &&
        <div className="fixed top-[6vh] left-[6vw]  right-[6vw] rounded-xl shadow-md z-30 ">
            <Climate data={curClimate} setShowClimate={setShowClimate} dataType={dataType} />
        </div>
      }
      </div>
    </main>
  );
}
