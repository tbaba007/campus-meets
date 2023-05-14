"use client";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {
  DeleteEventById,
  GetSentRequestsById,
  NotifyById,
} from "../../api/services/events";
import { AppColors, getUser } from "../../../helper/common";
import Header from "../../Header";
import { LayoutContainer } from "@/ui/layout/styles";
import Sidebar from "../../sidebar";
import ButtonUi from "@/ui/button/button";
import { NoEventFound, SentRequestListContainer } from "./styles";
import { IRequestProps } from "./types";

const SentRequestList = () => {
  if(typeof window !='undefined')
  document.title = "Sent Request List";

  const [sentRequestList, setSentRequestList] = useState<IRequestProps[]>([]);
  const [rand, setRand] = useState<number>(0);

  useEffect(() => {
    const getSentRequestList = async () => {
      const data: IRequestProps[] = await GetSentRequestsById(
        getUser().UserId ?? 0
      );
      console.log("---", data[0]);
      setSentRequestList(data);
    };
    getSentRequestList();
  }, [rand]);

  const onDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      const isEventDeleted = await DeleteEventById(id);
      if (isEventDeleted) {
        toast.success("event deleted successfully");
        setRand(Math.floor(Math.random() * 15));
      }
    }
  };

  const onNotify = async (id: number) => {
    const isUserNotified = await NotifyById(id);
    if (isUserNotified) {
      toast.success("Users have been notified");
      setRand(Math.floor(Math.random() * 15));
    }
  };
  return (
    <LayoutContainer>
      <Sidebar />
      <Header />
      <SentRequestListContainer>
        <thead>
          <tr>
            <th>SN</th>
            <th>Event Title</th>
            <th>Sport</th>
            <th>Start Date</th>
            <th>Start Time</th>
            <th>End Date</th>
            <th>End Time</th>
          </tr>
        </thead>

        <tbody>
          {sentRequestList &&
            sentRequestList.map((item, index) => {
              return (
                <>
                  <tr key={item.MarketPlaceId}>
                    <td>{index + 1}</td>
                    <td>{item.Title}</td>
                    <td>{item.sport}</td>
                    <td>{item.StartDate}</td>
                    <td>{item.StartTime}</td>
                    <td>{item.EndDate}</td>
                    <td>{item.EndTime}</td>
                    <td>
                      <ButtonUi
                        backgroundColor={AppColors[1].value}
                        height="3em"
                        width="5em"
                        onClick={() => onDelete(item.MarketPlaceId!!)}
                      >
                        <label>Delete</label>
                      </ButtonUi>
                    </td>
                    <td>
                      {item.remaining_count!! > 0 &&
                        item.Notified === false && (
                          <ButtonUi
                            backgroundColor={AppColors[0].value}
                            height="3em"
                            width="5em"
                            onClick={() => onNotify(item.MarketPlaceId!!)}
                          >
                            <label>Notify Participants</label>
                          </ButtonUi>
                        )}
                    </td>
                  </tr>
                </>
              );
            })}
        </tbody>
        {sentRequestList.length < 1 && (
          <NoEventFound>No Request Found</NoEventFound>
        )}
      </SentRequestListContainer>
      <ToastContainer />
    </LayoutContainer>
  );
};

export default SentRequestList;
