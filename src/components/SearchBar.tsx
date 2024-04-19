import React, { useState, useEffect } from 'react';
import Location from './Location';

const SearchBar = ( {getWeather}:{getWeather:({lat,lon}:{lat:string,lon:string})=> void}) => {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [items,setItems]=useState([]);
  
  useEffect(()=>{
    async function fetchCities (){
        try {
            const baseURL = 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records';
            const selectParams = 'geoname_id,name,cou_name_en,coordinates';
            // const orderByParam = 'order_by=name ASC';
            const limitParam = 'limit=5';
            // const suggest = 'where=startsWith(name, "At")';
            const suggest = `where=suggest(name, "${search}")`;
            // Construct the final URL with all parameters
            const finalURL = `${baseURL}?&select=${selectParams}&${suggest}&${limitParam}`;//&where=${searchParam}
    
          const response = await fetch(finalURL);
          const responseData = await response.json();
          setItems(responseData.results);
          console.log(responseData.results);
          } catch (error) {
            console.error('Error fetching city suggestions:', error);
          }}
    if(search.length>0){
      fetchCities();
    }
    else{
      setItems([]);
    }
  },[search])
  return (
    <section className="flex flex-row w-full mx-auto items-center">
      <div className=" bg-gray-50 py-6 flex flex-col items-center justify-center relative sm:py-12 w-full">
          <input
            onClick={() => setOpen(!open)}
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Here..."
            className="py-3 px-3 w-4/5 rounded-full shadow font-thin focus:outline-none focus:shadow-lg focus:shadow-slate-200 duration-100 shadow-gray-100 ring-[1px] ring-slate-300 focus:ring-slate-400 "
          />
        {open && items.length>0 && (
          <ul
            onClick={() => setOpen(!open)}
            className="w-2/3 z-10 absolute top-1/2 mt-[2rem] "
          >
            {items.map((item:any, index) => (
              <li
                key={index}
                className="w-full text-gray-700 px-4 py-1 gap-1 mx-1 shadow-sm bg-white cursor-pointer hover:bg-slate-100"
                onClick={() => getWeather({lat: item.coordinates.lat, lon:item.coordinates.lon})}
              >
                {item.name+", "+item.cou_name_en}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex-shrink-0">
        <Location getWeather={getWeather}/>
      </div>
    </section>
  );
};

export default SearchBar;
