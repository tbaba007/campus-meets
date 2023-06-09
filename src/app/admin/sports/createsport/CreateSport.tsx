'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import { AddSport } from '../../../api/services/sports';
import { AppColors, capitalizeFirstLetter } from '../../../../helper/common';
import Header from '../../../Header';
import { LayoutContainer } from "@/ui/layout/styles";
import SideBar from '../../../sidebar';
import ButtonUi from '@/ui/button';
import Card from '@/ui/card';
import { RegisterInputFieldHeader, RegisterInputField } from '../../../user/register/styles';
import { EditUserContainer, EditUserFooterContainer } from '../../user/edituser/styles';
import { EditSportsContainer } from '../edit/styles';

const CreateSport=()=>{
    const navigate=useRouter();
    const [name,setName]=useState('')
    const onSave=async()=>{
        if(!name.trim()) return toast.error('Please enter a valid sports name')
        //call api

        const sportName=capitalizeFirstLetter(name)!!
        const isSave=await AddSport(sportName);
        const {constraint}=isSave;
        if(constraint){
          return toast.error(`${name} already exists`);
        }
        toast.success("Sport Added Successfully");
        setName('')
    }
    const onCancel=()=>{
        navigate.push('/admin/sports');
    }
    return (
        <LayoutContainer>
        <SideBar/> 
        <Header/>
        <EditSportsContainer>
        <Card
         width="400px"
         height="350px"
         
       >
          <>
             <p>Create New Sport</p>
             <EditUserContainer>
               <RegisterInputFieldHeader>Sports Name</RegisterInputFieldHeader>
               <RegisterInputField
                 placeholder="Name"
                 value={name}
                 maxLength={15}
                 onChange={(e) => setName(e.target.value)}
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
       </EditSportsContainer>   
       <ToastContainer/>   
       </LayoutContainer>
    )
}

export default CreateSport;