'use client'
import { useRef, useState,useEffect } from "react";
import { AppColors, saveMessage } from "../../../helper/common";
import ButtonUi from "@/ui/button/button";
import Card from "@/ui/card";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {
  Container,
  LoginContainer,
  LoginInputContainer,
  LoginInputEmail,
  LoginInputHeader,
  LoginInputPassword,
  RegisterLink,
} from "./styles";
import { useRouter } from "next/navigation";
import { UserLogin } from "../../api/services/user";

const Page = () => {
  const loginRef=useRef<HTMLInputElement>(null)
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  if(typeof document !=='undefined'){
    document.title="Login"

  }
  const navigate=useRouter();

  useEffect(()=>{
    if(loginRef.current){
      loginRef.current.focus();
    }
  },[])

  const onLogin = async() => {
    if (!username.trim()) return toast.error("Please enter a valid email address");
    if (!password.trim()) return toast.error("Please enter a valid password");
    //call Api
    try{
      const isSuccessful=await UserLogin(username,password);
      debugger;
      if(isSuccessful && isSuccessful.length>0){

        saveMessage("user",JSON.stringify(isSuccessful[0]))
        if(isSuccessful[0].role==="user"){
          return navigate.push('/dashboard')
        }
        return navigate.push('/overview') 
      }
      toast.error("Invalid Username Or Password")
    }
    catch(ex:any){
      toast.error("An Error Occured")
    }
   
  };

  const onRegister=()=>{
    navigate.push('/user/register')
  }
  return (
    <Container>
      <Card
        width="380px"
        height="500px"
        children={
          <LoginContainer>
            <p>Login</p>
            <form onSubmit={onLogin}>
              <LoginInputContainer>
                <LoginInputHeader htmlFor="email">Email</LoginInputHeader>
                <LoginInputEmail
                ref={loginRef}
                  placeholder="Enter email address"
                  name="email"
                  onChange={(e)=>setUserName(e.target.value)}
                />
              </LoginInputContainer>
              <LoginInputContainer>
                <LoginInputHeader htmlFor="email">Password</LoginInputHeader>
                <LoginInputPassword placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)} />
                <br />
              </LoginInputContainer>
            </form>
            <ButtonUi
            onClick={onLogin}
              height="40px"
              width="200px"
              backgroundColor={AppColors[0].value}
              children={<p>Login</p>}
            />
            <RegisterLink onClick={onRegister}>New here? create account</RegisterLink>

          </LoginContainer>
        }
      />
            <ToastContainer />

    </Container>
  );
};

export default Page;
