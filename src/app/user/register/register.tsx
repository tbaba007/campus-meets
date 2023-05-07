'use client'
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { AppColors, isEmailValid } from "../../../helper/common";
import ButtonUi from "@/ui/button/button";
import Card from "@/ui/card";
import registerStyles from './register.module.css'
import { toast, ToastContainer } from "react-toastify";
import { IUserProps } from "./types";
import { IsEmailExists, RegisterUser } from "../../../api/services/user";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Register = () => {
  const navigate=useRouter();
  const [state,setState]=useState<IUserProps>({
    Email:'',
    Password:'',
    FirstName:'',
    LastName:'',
    StudentId:'',
    Mobile:''
  })
  const [isEmailError,setIsEmailError]=useState(false)

  document.title = "Register";

  const onRegister=async()=>{
    if(isEmailError){
      return toast.warn("Please correct the errors before submitting");

    }
    const {Email,FirstName,LastName,Password,StudentId,Mobile}=state;
    if(!FirstName?.trim())return toast.error("Please Enter FirstName");
    if(!LastName?.trim())return toast.error("Please Enter LastName");
    if(!Password.trim())return toast.error("Please Enter Password");
    if(!StudentId.trim())return toast.error("Please Enter StudentId");
    if(!Email.trim())return toast.error("Please Enter Email");


    //call api
    const data:IUserProps={
      FirstName:FirstName,
      LastName:LastName,
      Email:Email,
      Password:Password,
      StudentId:StudentId,
      Mobile:Mobile
    }
    const registerUser=await RegisterUser(data);
      if(registerUser){
        toast.success("Registration successful");

        setTimeout(()=>{
            navigate.push('/user/login')
        },5000)
        return;
      }
    toast.error("An Error Occured During Registration");
  }

  const checkEmail=async()=>{
    const {Email}=state;
    if(Email && isEmailValid(Email.trim())){
      const isEmailExists=await IsEmailExists(Email.trim());
      if(isEmailExists && isEmailExists.length>0){
        setIsEmailError(true);
      }
    }
  }

  const onChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
    setState({
      ...state,[event.target.name]:event.target.value
    })
  }

  return (
    < div className={registerStyles.Container}>
      <Card
        width="580px"
        height="550px"
        children={
          <>
            <p>Join Now</p>
            <br/>
            {isEmailError && <label className={registerStyles.EmailExistsErr}>Email Already Exists</label>}

            <div className={registerStyles.RegisterInputContainer}>
              <div className={registerStyles.RegisterInputFieldContainer}>
                <label className={registerStyles.RegisterInputFieldHeader}>FirstName</label>
                <input type="text" className={registerStyles.RegisterInputField} placeholder="First Name" name="FirstName"onChange={onChange}/>
              </div>

              <div className={registerStyles.RegisterInputFieldContainer}>
              <label className={registerStyles.RegisterInputFieldHeader}>LastName</label>
              <input type="text" className={registerStyles.RegisterInputField} placeholder="Last Name" name="LastName" onChange={onChange} />
              </div>
            </div>

           <div className={registerStyles.RegisterInputContainer}>
           <div className={registerStyles.RegisterInputFieldContainer}>
           <label className={registerStyles.RegisterInputFieldHeader}>
                  Mobile Number
                </label>
                <input type="text" className={registerStyles.RegisterInputField} placeholder="Mobile Number" name="Mobile" onChange={onChange} maxLength={11} />
          </div>

              <div className={registerStyles.RegisterInputFieldContainer}>
              <label className={registerStyles.RegisterInputFieldHeader}>Email</label>
              <input type="email" className={registerStyles.RegisterInputField}  placeholder="Email" name="Email" onChange={onChange} onBlur={checkEmail} maxLength={20}/>
              </div>
            </div>

            <div className={registerStyles.RegisterInputContainer}>
            <div className={registerStyles.RegisterInputFieldContainer}>
            <label className={registerStyles.RegisterInputFieldHeader}>Student Id</label>
            <input type="text" className={registerStyles.RegisterInputField} placeholder="Student Id" name="StudentId" onChange={onChange} />
              </div>
              <div className={registerStyles.RegisterInputFieldContainer}>
              <label className={registerStyles.RegisterInputFieldHeader}>Password</label>
              <input className={registerStyles.RegisterInputField} type="password" placeholder="Password" name="Password" onChange={onChange} />
              </div>
              
            </div>
            <br/>
            <div className={registerStyles.registerFooter}>
            <ButtonUi onClick={onRegister} backgroundColor={AppColors[0].value} width="150px" height="40px" children={<label>Register</label>} />
              <br/>
              <br/>
             <Link  href="user/login">Click Here to login</Link> 
            </div>
           
            
          </>
        }
      />
      <ToastContainer/>
    </div>
  );
};

export default Register;
