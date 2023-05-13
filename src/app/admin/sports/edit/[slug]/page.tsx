import { GetSportById } from "@/app/api/services/sports";
import EditSports from "./EditSports";
import { use } from "react";

async function fetchData(id:number){
    return GetSportById(id);
}
export default function Page({params}:any){
    const getSportData=use(fetchData(Number(params?.slug)))
    return <EditSports {...getSportData}/>
}
