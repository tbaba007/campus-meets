interface IAppColors {
    key: string;
    value: string;
  }
  export const AppColors: IAppColors[] = [
    {
      key: "success",
      value: "green",
    },
    {
      key: "error",
      value: "red",
    },
    {
      key: "default",
      value: "white",
    },
  ];
  
  export function isEmailValid(email: string) {
    // eslint-disable-next-line
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }
  
  
  export function saveMessage(key:string,value:string){
    if(typeof window !='undefined'){
      sessionStorage.setItem(key,value);
    }
  }
  
  export function getMessage(key:string){
    if(typeof window !='undefined'){
      return sessionStorage.getItem(key);

    }
  }
  
  export function removeMessageByKey(key:string){
    if(typeof window !='undefined'){
      sessionStorage.removeItem(key)
    }
  }
  
  export function capitalizeFirstLetter(word:string){
    if(word){
      return word.charAt(0).toUpperCase()+word.slice(1).toLowerCase();
    }
  }
  
   export  function getUser(){
    let user_Id = 0;
    const user =  getMessage("user")!!;
    let UserId = JSON.parse(user);
    if (UserId) {
      user_Id = UserId.UserId;
    }
    return UserId;
  }