'use client';
import { useRef, useState,useEffect } from "react";
import ButtonUi from "@/ui/button/button";
import loginStyles from './login.module.css'
import Card from "@/ui/card";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import { saveMessage,AppColors } from "@/helper/common";
import { UserLogin } from "@/api/services/user";


const Login = () => {
  const navigate=useRouter();
  const loginRef=useRef<HTMLInputElement>(null)
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  window.document.title="Login"

  useEffect(()=>{
    if(loginRef.current){
      loginRef.current.focus();
    }
  },[])



  const OnLogin = async() => {
    if (!username.trim()) return toast.error("Please enter a valid email address");
    if (!password.trim()) return toast.error("Please enter a valid password");
    //call Api
    try{
     
      const isLogin=UserLogin(username,password);
      debugger;

        
        return navigate.push('/overview') 
      }
      // toast.error("Invalid Username Or Password")
    catch(ex){
      if(ex instanceof Error){
        if(ex.message){
          toast.error(ex.name)

        }
      }
    }
   
  };

  const onRegister=()=>{
    navigate.push('/user/register')
  }
  return (
    <div className={loginStyles.Container}>
      <Card
        width="380px"
        height="500px"
        children={
          <div className={loginStyles.LoginContainer}>
            <p>Login</p>
            <form onSubmit={OnLogin}>
              <div className={loginStyles.LoginInputContainer}>
                <label className={loginStyles.LoginInputHeader} htmlFor="email">Email</label>
                <input className={loginStyles.LoginInputEmail} type="email"
                ref={loginRef}
                  placeholder="Enter email address"
                  name="email"
                  onChange={(e)=>setUserName(e.target.value)}
                />
              </div>
              <div className={loginStyles.LoginInputContainer}>
              <label className={loginStyles.LoginInputHeader} htmlFor="email">Password</label>
                <input className={loginStyles.LoginInputPassword} type="password" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)} />
                <br />
              </div>
            </form>
            <ButtonUi
            onClick={OnLogin}
              height="40px"
              width="200px"
              backgroundColor={AppColors[0].value}
              children={<span>Login</span>}
            />
            <label onClick={onRegister}>New here? create account</label>

          </div>
        }
      />
            <ToastContainer />

    </div>
  );
};

export default Login;
