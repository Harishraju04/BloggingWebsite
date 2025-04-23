import { ChangeEvent } from "react";

interface LabelledInputType{
    label:string,
    placeholder:string,
    onChange:(e:ChangeEvent<HTMLInputElement>) =>void;
    type?:string;
}
export const LabeledInput = ({label,placeholder,onChange,type}:LabelledInputType)=>{
    return(
        <div>
               <div className="py-3 ">
                <div className="font-semibold text-2xl py-1">
                    {label}
                </div>
                <div className="">
                    <input onChange={onChange} className="w-110 h-12 border-1 rounded-lg border-gray-500" type={type||"text"} placeholder={placeholder} />
                </div>
                </div>
        </div>
    )
}