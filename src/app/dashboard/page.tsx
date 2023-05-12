'use client'
import { getMessage } from "@/helper/common";
import { useEffect, useState } from "react";
import { LayoutContainer } from "@/ui/layout/styles";
import Header from "../Header";
import SideBar from "../sidebar";
import { DashBoardContainer, DashBoardScore, DashBoardScoreHeader } from "./styles";
import Card from "@/ui/card";
import useFetch from "../hooks/useFetch";

const userDetails = getMessage("user")!!;
const RequesterId =userDetails? JSON.parse(userDetails)?.UserId:0;
const StudentId=userDetails?JSON.parse(userDetails)?.StudentId:0;

export default function Page(){
  
  const dashBoardData=Promise.all([useFetch({urlPath:`marketplace/GetSentRequestById/${RequesterId}`}),useFetch({urlPath:`marketplace/GetReceivedRequestById/${StudentId}`}),useFetch({urlPath:`marketplace/GetReceivedRequestById/${StudentId}
  `})]);
      if(typeof window !=='undefined')
      document.title="DashBoard"
      const [requestSentCount,setRequestSentCount]=useState(0);
      const [requestReceivedCount,setRequestReceivedCount]=useState(0);
      const [gamesPlayedCount,setGamesPlayedCount]=useState(0);

      useEffect(()=>{
        const FetchData = async () => {
          const userdata=await dashBoardData;
          await userdata[0].fetchData();
          setRequestSentCount( userdata[0].data?.length!!)
          await userdata[1].fetchData();
          setRequestReceivedCount( userdata[1].data?.length!!)
          await userdata[2].fetchData();
          setGamesPlayedCount( userdata[2].data?.length!!)
        };
        FetchData();
      },[dashBoardData])
    return (
      <LayoutContainer>
        <Header />
        <SideBar />
        <DashBoardContainer>
  
          <Card
            height="100px"
            width="200px"
            children={
              <>
                <DashBoardScoreHeader>No. Of Requests sent</DashBoardScoreHeader>
                <DashBoardScore>
                  {requestSentCount}
                </DashBoardScore>
              </>
            }
          />
          <Card
            height="100px"
            width="200px"
            children={
              <>
                <DashBoardScoreHeader>
                  No. Of Invite Received
                </DashBoardScoreHeader>
                <DashBoardScore>
                  {requestReceivedCount}
                </DashBoardScore>
              </>
            }
          />
          <Card
            height="100px"
            width="200px"
            children={
              <>
                <DashBoardScoreHeader>No. Of Games Played</DashBoardScoreHeader>
                <DashBoardScore>
                  {gamesPlayedCount}
                </DashBoardScore>
              </>
            }
          />
        </DashBoardContainer>
      </LayoutContainer>
    )
}