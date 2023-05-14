'use client'
import React, { useState } from "react";
import {  useParams,useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { UpdateUser } from "../../../../api/services/user";
import { AppColors } from "../../../../../helper/common";
import { LayoutContainer } from "@/ui/layout/styles";
import SideBar from "../../../../sidebar";
import ButtonUi from "@/ui/button/button";
import Card from "@/ui/card";
import {
  RegisterInputFieldHeader,
  RegisterInputField,
} from "../../../../user/register/styles";
import { IUserProps } from "../../../../user/register/types";
import {
  EditUserComponent,
  EditUserContainer,
  EditUserFooterContainer,
} from "../styles";

const EditUser = (props:IUserProps) => {
  if(typeof window !='undefined')
  document.title="Edit User"
  const navigate = useRouter();
  const { id } = useParams();
  const [firstName, setFirstName] = useState<string | undefined>(
    //@ts-ignore: 
    props[0]?.FirstName
  );
   //@ts-ignore: 
  const [lastName, setLastName] = useState<string | undefined>(props[0]?.LastName);
   //@ts-ignore: 
  const [mobile, setMobile] = useState<string | undefined>(props[0]?.Mobile);

  const onCancel = () => {
    navigate.push("/admin/user");
  };

  const onSave = async () => {
    if (!firstName?.trim()) return toast.error("Please enter a first name");
    if (!lastName?.trim()) return toast.error("Please enter a last name");
    //call API
    const data:IUserProps={
      FirstName: firstName,
      LastName: lastName,
      Mobile: mobile,
       //@ts-ignore: 
      UserId: props[0]?.UserId,
      Email: "",
      Password: "",
      StudentId: ""
    }
    if(window.confirm("Are you sure you want to update?")){
      const updateData = await UpdateUser(data);
      if(updateData){
        toast.success('User Updated Successfully');
        setTimeout(()=>{
            navigate.push('/admin/user');
        },5000);
      }
      else{
        toast.error('An error occured while updating the user')
      }
    }

   
  };
  return (
    <LayoutContainer>
      <SideBar />
      <EditUserComponent>
        <Card
          width="400px"
          height="500px"
          
        >
           <>
              <p>Edit User</p>
              <EditUserContainer>
                <RegisterInputFieldHeader>FirstName</RegisterInputFieldHeader>
                <RegisterInputField
                  placeholder="FirstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </EditUserContainer>
              <EditUserContainer>
                <RegisterInputFieldHeader>LastName</RegisterInputFieldHeader>
                <RegisterInputField
                  placeholder="LastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </EditUserContainer>
              <EditUserContainer>
                <RegisterInputFieldHeader>Mobile</RegisterInputFieldHeader>
                <RegisterInputField
                  placeholder="Mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </EditUserContainer>
              <EditUserFooterContainer>
                <ButtonUi
                  width="100px"
                  height="50px"
                  onClick={onSave}
                  backgroundColor={AppColors[0].value}
                
                >
                  <label>Save</label>
                  </ButtonUi>
                <ButtonUi
                  width="100px"
                  height="50px"
                  onClick={onCancel}
                  backgroundColor={AppColors[1].value}
                  
                >
                  <label>Cancel</label>
                  </ButtonUi>
              </EditUserFooterContainer>
            </>
          </Card>
      </EditUserComponent>
      <ToastContainer/>
    </LayoutContainer>
  );
};

export default EditUser;
