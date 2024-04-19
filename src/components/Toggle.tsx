import { Dispatch, SetStateAction } from "react";

export default function Toggle({setDataType}:{setDataType:Dispatch<SetStateAction<"f"| "c">>}){
    return (
        <label
        htmlFor="AcceptConditions"
        className="relative h-8 w-14 cursor-pointer rounded-full bg-green-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-blue-500 scale-90"
        onChange={()=>{setDataType((prev:any)=>prev==="f"?"c":"f")}}
        >
        <input type="checkbox" id="AcceptConditions" className="peer sr-only" />

        <span
            className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-gray-300 ring-[6px] ring-inset ring-white transition-all peer-checked:start-8 peer-checked:w-2 peer-checked:bg-white peer-checked:ring-transparent"
        >
        </span>
        </label>
    )
}