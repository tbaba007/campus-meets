type fetchMethods="GET"|"POST"|"PUT"|"PATCH"|"DELETE"
export interface UseFetchProps{

    method:fetchMethods;
    urlPath:string;
    statusCode:number;
    postData:(obj:{})=>void;
    fetchData:()=>void;
    deleteData:(id:number)=>void;

}