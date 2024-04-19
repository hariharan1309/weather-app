'use client'
import React, { Dispatch, SetStateAction} from 'react';
import { City } from "./types";

export default function Table({ data, getWeather,}: { data: City[], getWeather: ({ lat, lon }: { lat: string, lon: string }) => void}) {

  return (
    <div className="overflow-hidden shadow-xl">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm shadow-xl">
        <thead className="ltr:text-left rtl:text-right text-xl font-extrabold">
          <tr>
            <th className="whitespace-nowrap p-4 font-bold text-slate-800">City</th>
            <th className="whitespace-nowrap p-4 font-bold text-slate-800">Country</th>
            <th className="whitespace-nowrap p-4 font-bold text-slate-800">TimeZone</th>
          </tr>
        </thead>
            <tbody className="divide-y divide-gray-200 text-md">
                {data.map((city, index) => (
                  <tr
                    className="odd:bg-gray-50 text-center table-row"
                    key={city.id}
                    onClick={() => getWeather({ lat: city.coordinates.lat, lon: city.coordinates.lon })}
                  >
                    <td className="whitespace-nowrap md:p-4 px-2 py-4 font-bold text-slate-800">{city.name}</td>
                    <td className="whitespace-nowrap md:p-4 px-2 py-4  text-slate-700">{city.countryName}</td>
                    <td className="whitespace-nowrap md:p-4 px-2 py-4  text-slate-700">{city.timeZone}</td>
                  </tr>
                  ))}
            </tbody>
      </table>
    </div>
  );
}