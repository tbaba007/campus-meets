"use client";
import React, { useEffect, useState } from "react";
import {
  GetGamesCount,
  GetReceivedRequestsById,
  GetSentRequestsById,
} from "../api/services/events";
import { getMessage } from "../../helper/common";
import Header from "../Header";
import { LayoutContainer } from "@/ui/layout/styles";
import { IEventProps } from "../marketplace/types";
import SideBar from "../sidebar";
import Card from "@/ui/card";
import {
  DashBoardContainer,
  DashBoardScore,
  DashBoardScoreHeader,
} from "./styles";

const Page = () => {
  const userDetails = getMessage("user")!!;
  const RequesterId = userDetails ? JSON.parse(userDetails).UserId : 0;
  const StudentId = userDetails ? JSON.parse(userDetails).StudentId : 0;
  if (typeof window !== "undefined") document.title = "DashBoard";

  const [requestSentCount, setRequestSentCount] = useState(0);
  const [requestReceivedCount, setRequestReceivedCount] = useState(0);
  const [gamesPlayedCount, setGamesPlayedCount] = useState(0);
  useEffect(() => {
    const FetchData = async () => {
      const data = await Promise.all([
        GetSentRequestsById(RequesterId),
        GetReceivedRequestsById(StudentId),
        GetGamesCount(StudentId),
      ]);
      const markePlaceRequests: IEventProps[] = data[0];
      const markePlaceReceivedRequests: IEventProps[] = data[1];
      const gamesReceivedCount: IEventProps[] = data[2];
      setRequestSentCount(markePlaceRequests.length);
      setRequestReceivedCount(markePlaceReceivedRequests.length);
      setGamesPlayedCount(gamesReceivedCount.length);
    };
    FetchData();
  }, [RequesterId, StudentId]);
  return (
    <LayoutContainer>
      <Header />
      <SideBar />
      <DashBoardContainer>
        <Card height="100px" width="200px">
          <>
            <DashBoardScoreHeader>No. Of Requests sent</DashBoardScoreHeader>
            <DashBoardScore>{requestSentCount}</DashBoardScore>
          </>
        </Card>
        <Card height="100px" width="200px">
          <>
            <DashBoardScoreHeader>No. Of Invite Received</DashBoardScoreHeader>
            <DashBoardScore>{requestReceivedCount}</DashBoardScore>
          </>
        </Card>
        <Card height="100px" width="200px">
          <>
            <DashBoardScoreHeader>No. Of Games Played</DashBoardScoreHeader>
            <DashBoardScore>{gamesPlayedCount}</DashBoardScore>
          </>
        </Card>
      </DashBoardContainer>
    </LayoutContainer>
  );
};

export default Page;
