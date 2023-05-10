'use client'
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { GetAcceptedAvailableEvents, UnJoinAcceptedEvent } from "../../api/services/events";
import { AppColors, getMessage, getUser } from "../../../helper/common";
import Header from "../../Header";
import { LayoutContainer } from "@/ui/layout/styles";
import { IAvailableEventProps } from "../../marketplace/availableevent/types";
import Sidebar from "../../sidebar";
import ButtonUi from "@/ui/button";
import { AcceptedEventListTable, AcceptedEventListTableHeader } from "./styles";

const AcceptedRequest = () => {

    const [updatedId, setUpdateId] = useState('');

    const userDetails = getMessage("user")!!;
    const StudentId=JSON.parse(userDetails).StudentId;
    console.log(StudentId);

    const [acceptedAvailableEvent, setacceptedAvailableEvent] = useState<IAvailableEventProps[]>([])

        const getAcceptedAvailableEvents = async () => {
            const data: IAvailableEventProps[] = await GetAcceptedAvailableEvents(StudentId);
            
            console.log("ddfdfdf", data);
           setacceptedAvailableEvent(data);
          };
   
    
    useEffect(() =>{
        getAcceptedAvailableEvents();
    }, [updatedId])
   
    

    //UnJoinAcceptedEvent/
   // const unJoin = (IAvailableEventProps) =>{

    //}

    const unJoin = async(item: IAvailableEventProps) => {
        if (window.confirm("Are you sure you want to unjoin?")) {
            debugger;
          const inviteesIds = item.Acceptedids
            .split(",");
            const studentId=getUser().StudentId;
            const userIndex=inviteesIds.findIndex(x=>x===studentId)
    
          const removeId=inviteesIds.filter(x=>x!==studentId)
    
          const isRejected=await UnJoinAcceptedEvent(item.MarketPlaceId!!,removeId.join(','));
         
          if(isRejected){
            setUpdateId(`${item.MarketPlaceId}rejected`);
            toast.success('Event unjoined successfully');
          }
          else{
            toast.error('An error occurred ');
          }
        }
      };

    return (
        <LayoutContainer>
            <Sidebar />
            <Header />

            <AcceptedEventListTable>
                <thead>
                    <tr>
                        <AcceptedEventListTableHeader>Title</AcceptedEventListTableHeader>
                        <AcceptedEventListTableHeader>Sport</AcceptedEventListTableHeader>
                        <AcceptedEventListTableHeader>
                            Location
                        </AcceptedEventListTableHeader>
                        <AcceptedEventListTableHeader>
                            StartDate
                        </AcceptedEventListTableHeader>
                        <AcceptedEventListTableHeader>
                            StartTime
                        </AcceptedEventListTableHeader>
                        <AcceptedEventListTableHeader>
                            EndTime
                        </AcceptedEventListTableHeader>
                        <AcceptedEventListTableHeader>
                            EndDate
                        </AcceptedEventListTableHeader>
                        {/* <AcceptedEventListTableHeader>
                            Required Players
                        </AcceptedEventListTableHeader>
                        <AcceptedEventListTableHeader>
                            Players Left
                        </AcceptedEventListTableHeader> */}

                    </tr>
                </thead>


                <tbody>
          {acceptedAvailableEvent &&
            acceptedAvailableEvent.map((item, index) => {
              return (item.remaining_count || (item.NumberOfPlayers!==item.acceptedcount))
              &&
                 (

                        <tr key={item.MarketPlaceId}>
                          
                          <AcceptedEventListTableHeader>
                          {item.Title}
                          </AcceptedEventListTableHeader>
                          <AcceptedEventListTableHeader>
                            {item.sport}
                          </AcceptedEventListTableHeader>
                          <AcceptedEventListTableHeader>
                            {item.Location}
                          </AcceptedEventListTableHeader>
                          <AcceptedEventListTableHeader>
                            {item.StartDate}
                          </AcceptedEventListTableHeader>
                          <AcceptedEventListTableHeader>
                            {item.StartTime}
                          </AcceptedEventListTableHeader>
                          
                          <AcceptedEventListTableHeader>
                            {item.EndTime}
                          </AcceptedEventListTableHeader>
                          <AcceptedEventListTableHeader>
                            {item.EndDate}
                          </AcceptedEventListTableHeader>
                          <ButtonUi
               width="100px"
               height="50px"
               onClick={()=>unJoin(item)}
               backgroundColor={AppColors[0].value}
               children={<label>Unjoin</label>}
             />
                          
                          <AcceptedEventListTableHeader>
                           
                          </AcceptedEventListTableHeader>
                        </tr>
                      );
                
             
            })}
        </tbody>

                </AcceptedEventListTable >
                <ToastContainer/>
        </LayoutContainer>
    )
}

export default AcceptedRequest;