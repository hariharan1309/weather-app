import Image from 'next/image';
import {ClimateCardType } from './types';
import TempGif from '/images/temperature.gif'

const ClimateCard = ({data,img,dataType}:ClimateCardType) => {
  const today = new Date();
  const dayOfWeek = today.getDay();
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  const dayName = daysOfWeek[dayOfWeek];
  
  function formatDate(date: Date): string {

    const day: number = date.getDate();
    const month: number = date.getMonth() + 1; 
    const year: number = date.getFullYear() % 100; 

    const formattedDay: string = day < 10 ? '0' + day : day.toString();
    const formattedMonth: string = month < 10 ? '0' + month : month.toString();

    return  formattedDay + '/' + formattedMonth + '/' + year;
}
  const curDate=formatDate(today);
  console.log(data)

  return (
    <div className="w-full p-[2vh] lg:p-[10vh] justify-center items-center bg-cover rounded-lg relative " style={{ backgroundImage: `url(${img.bg})`}}>
      <div className="flex flex-wrap w-[80%] lg:w-full mx-auto" >
        <div className="w-full lg:w-1/2 flex rounded-lg backdrop-blur-lg">
          <div className="rounded-lg py-6 pl-8 pr-32 w-full bg-gradient-to-br from-slate-50 via-transparent via-transparent to-slate-50 text-slate-600">
            <div className="mb-10 flex flex-col gap-5 ">
              <h2 className="font-bold text-3xl leading-none pb-1">{dayName}</h2>
              <h3 className="leading-none pb-2 pl-1">{curDate}</h3>
              {/* <p className="flex aling-center opacity-75">
                <Image src="/icons/location.png" alt="location" width={24} height={24} />
                París, FR
              </p> */}
            </div>
            <div className="text-center flex flex-row items-center flex-evenly flex-wrap justify-center">
                <img src={img.icon} alt={data.weather.main} className="lg:w-[6vw] w-[10vw]" />
              <div>
                <strong className="leading-none text-3xl block font-weight-bolder text-nowrap">{data.temp} º {dataType.toUpperCase()}</strong>
                <b className="text-xl block font-bold text-nowrap">{data.weather.description.toUpperCase()}</b>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex lg:-ml-2 -mt-2 
        ">
          <div className="lg:my-3  bg-gradient-to-br from-gray-600 via-gray-400 via-gray-400 to-gray-700 text-white p-8 w-full lg:rounded-l-lg rounded-b-lg">
            <div className="flex justify-between mb-4 w-[80%]">
              <div className="w-auto font-bold uppercase text-90">Feels like</div><div className="w-auto text-right">{data.feels_like} º {dataType.toUpperCase()}</div>
            </div>
            <div className="flex justify-between mb-4 w-[80%]">
              <div className="w-auto font-bold uppercase text-90">Pressure</div><div className="w-auto text-right">{data.pressure+" hPa"}</div>
            </div>
            <div className="flex justify-between mb-4 w-[80%]">
              <div className="w-auto font-bold uppercase text-90">Humidity</div><div className="w-auto text-right">{data.humidity+"%"}</div>
            </div>
            <div className="flex justify-between mb-4 w-[80%]">
              <div className="w-auto font-bold uppercase text-90">Wind</div><div className="w-auto text-right">{data.wind_speed+" km/h"}</div>
            </div>
            <div className="flex flex-row gap-[1vw] justify-around ">
              <div className="flex flex-col bg-gray-100 text-black rounded-lg pb-4 flex-grow min-w-[50%]">
                <div className="text-center pt-2 mb-2 ">
                  <Image src="/images/temperature.gif" alt="sunny" width={48} height={48} className="mx-auto rounded-full " />
                </div>
                <div className="text-center">
                  <b className="font-normal">Max</b><br />
                  <strong className="text-xl">{data.temp_max} º {dataType.toUpperCase()}</strong>
                </div>
              </div>
              <div className="flex flex-col bg-gray-100 text-black rounded-lg pb-4 flex-grow min-w-[50%] ">
                <div className="text-center pt-2 mb-2">
                  <Image src="/images/temperature.gif" alt="sunny" width={48} height={48} className=" mx-auto rounded-full" />
                </div>
                <div className="text-center">
                  <b className="font-normal">Min</b><br />
                  <strong className="text-xl">{data.temp_min} º {dataType.toUpperCase()}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClimateCard;
