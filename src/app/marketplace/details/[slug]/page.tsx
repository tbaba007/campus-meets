'use client'
import React, { use } from 'react'
import { useRouter,useParams } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import { GetEventById, JoinEvent } from '../../../api/services/events';
import { AppColors, getMessage } from '@/helper/common';
import Header from '../../../Header';
import { LayoutContainer } from '@/ui/layout/styles';
import Sidebar from '../../../sidebar';
import ButtonUi from '@/ui/button/button';
import Card from '@/ui/card';
import { DetailsContainer } from '../../availableevent/styles';
import { IAvailableEventProps } from '../../availableevent/types';

async function fetchData(id:number){
    return GetEventById(id)
}


const Page=({params}:any)=>{
    const data=use(fetchData(Number(params?.slug)));
    let StudentId='';
    const navigate=useRouter();
    const user=getMessage('user');
    if(user){
        StudentId=JSON.parse(user).StudentId;
    }
    const {FirstName,
        LastName,
        Location,
        Description,
        Title,
        sport,
        Acceptedids,
        MarketPlaceId,
        

    }=data[0] as IAvailableEventProps;

    const onCancel=()=>{
        navigate.push('/marketplace/availableevent')
    }
    
    const onJoin=async()=>{
        if(window.confirm('Are you sure you want to join this event?'))
        {
            if(Acceptedids){
                const acceptedUsers=Acceptedids.split(',');
                //check if user already joined this event
                if(Acceptedids){
                    const isAlreadyJoined=acceptedUsers.find(x=>x===StudentId);
                    if(isAlreadyJoined)
                    return toast.error("You have already joined this event ");
                }

                  const updateData=await JoinEvent(MarketPlaceId,[...acceptedUsers,StudentId].join(','))
                        if(updateData){
                            toast.success('Event joined successfully!');
                            setTimeout(()=>{
                                navigate.push('/marketplace/availableevent')
                            },3000)
                        }
                }
            else{
             
                  const updateData=await JoinEvent(MarketPlaceId,StudentId)
                  if(updateData){
                    toast.success('Event joined successfully!');
                    setTimeout(()=>{
                        navigate.push('/marketplace/availableevent')
                    },3000)
                }

            }
          

            
        }
    }
    
    
return <LayoutContainer>
        <Sidebar/>
        <Header/>
        <DetailsContainer>
            <Card
            height='300px'
            width='400px'
            
            >
                 <>
            <br/>
            <br/>
            <p>Name:{FirstName} &nbsp; {LastName}</p>
            <p>Title: &nbsp;{Title} </p>
            <p>Sport: &nbsp;{sport} </p>
            <p>Location: &nbsp;{Location}</p>
            <p>Description: &nbsp;{Description}</p>
            <br/>
            <br/>
            
            <span style={{marginTop:'100px'}}>
                <ButtonUi
                    backgroundColor={AppColors[0].value}
                    height="50px"
                    width='100px'
                    onClick={onJoin}
                    > 
                    <label>Join</label>
                    </ButtonUi>
                    &nbsp;
                    <ButtonUi
                    backgroundColor={AppColors[1].value}
                    height="50px"
                    width='100px'
                    onClick={onCancel}
                    > 
                    <label>Cancel</label>
                    </ButtonUi>
                    </span>
            
            </>
                </Card>
        </DetailsContainer>
       <ToastContainer/>
      </LayoutContainer>
}

export default Page;