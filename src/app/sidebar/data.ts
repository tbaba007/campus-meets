import { ISideBarProps } from "./types";
const iconPath = "/assets/images/";

export const AdminMenu: ISideBarProps[] = [
  {
    id: 0,
    path: "/users",
    title: "Users",
    icon: `${iconPath}Contacts.svg`,
  },

  {
    id: 2,
    path: "/sports",
    title: "Sports",
    icon: `${iconPath}Settings.svg`,
  },
  {
    id: 3,
    path: "/allevents",
    title: "All Events",
    icon: `${iconPath}SubScription.svg`,
  },
];

export const UserMenu: ISideBarProps[] = [
  {
    id: 0,
    path: "/dashboard",
    title: "DashBoard",
    icon: `${iconPath}Ideas.svg`,
  },
  {
    id: 1,
    title: "MarketPlace",
    icon: `${iconPath}Agents.svg`,
    isSubMenu: true,
    subMenuList: [
        {
          name: "Create An Event",
          path: "/marketplace/createevent",
        },
        {
          name: "Available Events",
          path: "/marketplace/availableevent",
        },
        {
          name: "Accepted Events",
          path: "/requests/acceptedRequest",
        }
        
      ],
  },
  {
    id: 2,
    path: "/",
    title: "Requests",
    icon: `${iconPath}notification.svg`,
    isSubMenu: true,
    subMenuList: [
       
        {
          name: "Sent Requests",
          path: "/requests/sentRequests",
        },
        {
          name: "Received Requests",
          path: "/requests/receivedRequests",
        },
      ],
  },
];

