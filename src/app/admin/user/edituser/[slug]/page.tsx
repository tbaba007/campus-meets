import { GetUserById } from "@/app/api/services/user";
import EditUser from "./edit";
import { IUserProps } from "@/app/user/register/types";
import { use } from "react";

async function fetchData(id:number){
    return GetUserById(id)
}


export default function Page({params}:any){
    const data=use(fetchData(Number(params?.slug)))
    return <EditUser {...data} />
}