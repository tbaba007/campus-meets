'use client'
import  { useEffect, useState } from "react";
import Link from "next/link";
import { GetAvailableEvents } from "../../api/services/events";
import { getMessage } from "../../../helper/common";
import Header from "../../Header";
import { LayoutContainer } from "@/ui/layout/styles";
import SideBar from "../../sidebar/sidebar";
import {
  AvailableEventListTable,
  AvailableEventListTableData,
  AvailableEventListTableHeader,
} from "./styles";
import { IAvailableEventProps } from "./types";

const AvailableEvent = () => {
  if(typeof window !='undefined')
  document.title = "Available Events";
  const [availableEventList, setAvailableEventList] = useState<
    IAvailableEventProps[]
  >([]);

  const getAvailableEvents = async () => {
    const data: IAvailableEventProps[] = await GetAvailableEvents();
    setAvailableEventList(data);
  };
  const userDetails=getMessage('user');
  const userId=userDetails?JSON.parse(getMessage('user')!!).UserId:0;
  useEffect(() => {
    getAvailableEvents();
  }, []);

  return (
    <LayoutContainer>
      <SideBar />
      <Header />

      <AvailableEventListTable >
        <thead>
          <tr>
            <AvailableEventListTableHeader>Title</AvailableEventListTableHeader>
            <AvailableEventListTableHeader>Sport</AvailableEventListTableHeader>
            <AvailableEventListTableHeader>
              Location
            </AvailableEventListTableHeader>
            <AvailableEventListTableHeader>
              StartDate
            </AvailableEventListTableHeader>
            <AvailableEventListTableHeader>
              StartTime
            </AvailableEventListTableHeader>
            <AvailableEventListTableHeader>
              EndTime
            </AvailableEventListTableHeader>
            <AvailableEventListTableHeader>
              EndDate
            </AvailableEventListTableHeader>
            <AvailableEventListTableHeader>
              Required Players
            </AvailableEventListTableHeader>
            <AvailableEventListTableHeader>
              Players Left
            </AvailableEventListTableHeader>
            
          </tr>
        </thead>

        <tbody>
          <AvailableEventListTableData/>
          {availableEventList &&
            availableEventList.map((item, index) => {
              return (item.remaining_count || (item.NumberOfPlayers!==item.acceptedcount))
              &&
                 (

                        <tr key={item.MarketPlaceId}>
                          
                          <AvailableEventListTableData>
                          {item.RequesterId=== userId &&
                           item.Title }

                            {item.RequesterId!== userId &&
                          <Link href={`/marketplace/details/${item.MarketPlaceId}`}
                           > {item.Title}</Link> }
                          </AvailableEventListTableData>
                          <AvailableEventListTableData>
                            {item.sport}
                          </AvailableEventListTableData>
                          <AvailableEventListTableData>
                            {item.Location}
                          </AvailableEventListTableData>
                          <AvailableEventListTableData>
                            {item.StartDate}
                          </AvailableEventListTableData>
                          <AvailableEventListTableData>
                            {item.StartTime}
                          </AvailableEventListTableData>
                          
                          <AvailableEventListTableData>
                            {item.EndTime}
                          </AvailableEventListTableData>
                          <AvailableEventListTableData>
                            {item.EndDate}
                          </AvailableEventListTableData>
                          <AvailableEventListTableData>
                            {item.NumberOfPlayers}
                          </AvailableEventListTableData>
                          <AvailableEventListTableData>
                            {item.remaining_count??item.NumberOfPlayers}
                          </AvailableEventListTableData>
                          <AvailableEventListTableData>
                           
                          </AvailableEventListTableData>
                        </tr>
                      );
                
             
            })}
        </tbody>
      </AvailableEventListTable>
    </LayoutContainer>
  );
};

export default AvailableEvent;
