'use client'
import { useCallback, useState } from "react";
import { UseFetchProps } from "./types";

const baseUrl=process.env.APP_API;
const useFetch=({urlPath}:Partial<UseFetchProps>)=>{
    const [isLoading,setIsLoading]=useState(false);
    const [data,setData]=useState<[]|null>(null);
    const [error,setError]=useState('');
    const [statusCode,setstatusCode]=useState(-1)
    const fetchData=useCallback(async()=>{
        try{
            setIsLoading(true)
            const response=await fetch(`${baseUrl}/${urlPath}`);
            const responseData=await response.json();
            setData(responseData)
            setIsLoading(false);
            setstatusCode(response.status)
        }
        catch(ex){
           if(ex instanceof Error){
            setError(ex.message)
           }
        }
        
    },[urlPath])

    async function postData(params:{},{method}:Partial<UseFetchProps>){
        try{
            setIsLoading(true)
            const response=await fetch(`${baseUrl}/${urlPath}`,{
                method:method,
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(params)
            });
            const responseData=await response.json();
            setData(responseData)
            setstatusCode(response.status)
            setIsLoading(false);
        }
        catch(ex){
           if(ex instanceof Error){
            setError(ex.message)
           }
        }
    }

    async function updateData(params:{},id:number|string,{method}:Partial<UseFetchProps>){
        try{
            setIsLoading(true)
            const response=await fetch(`${baseUrl}/${urlPath}/${id}`,{
                method:method,
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(params)
            });
            await response.json();
            setstatusCode(response.status)
            setIsLoading(false);
        }
        catch(ex){
           if(ex instanceof Error){
            setError(ex.message)
           }
        }
    }
    async function deleteData(id:number|string,{method}:Partial<UseFetchProps>){
        try{
            setIsLoading(true)
            const response=await fetch(`${baseUrl}/${urlPath}/${id}`,{
                method:method,
                headers:{
                    'content-type':'application/json'
                }
            });
            await response.json();
            setIsLoading(false);
            setstatusCode(response.status)
        }
        catch(ex){
           if(ex instanceof Error){
            setError(ex.message)
           }
        }
    }

    return {isLoading,data,error,statusCode, postData,updateData,fetchData,deleteData}
}

export default useFetch;