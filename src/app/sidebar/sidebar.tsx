'use client'
import React,{useState} from "react";
import { useRouter } from "next/navigation";
import { getMessage } from "@/helper/common";
import { AdminMenu, UserMenu } from "./data";
import { Avartar, Container, ItemContainer, ItemIcon, ItemText, SubMenuContainer, SubMenuList } from "./styles";
import { ISideBarProps } from "./types";

enum role {
  admin = "admin",
  user = "user",
}

const SideBar = () => {
  const [activeMenuId,setActiveMenuId]=useState(0)
  const user = getMessage("user");
  const navigate = useRouter();

  const onMenuClick = ({path,isSubMenu,id}:ISideBarProps) => {
    if(id===activeMenuId && isSubMenu){
      setActiveMenuId(0);
      return;
    }
    if(isSubMenu){
      setActiveMenuId(id!!);
      return;
    }
    navigate.push(`${path}`);
  };
  return (
    <Container>

        <Avartar/>

      {user &&
        JSON.parse(user).role === role.admin &&
        AdminMenu.map((item) => {
          return (
            <ItemContainer key={item.id} onClick={() => onMenuClick(item)}>
              <ItemIcon icon={item.icon} />
              <ItemText>{item.title}</ItemText>
            </ItemContainer>
          );
        })}

         {user &&
        JSON.parse(user).role === role.user &&
        UserMenu.map((item) => {
          return (
            <>
            <ItemContainer key={item.id} >
              <ItemIcon icon={item.icon} />
              <ItemText onClick={() => onMenuClick(item)}>{item.title}</ItemText>
              
            </ItemContainer>
            <div key={item.id+item.icon!!}>
                {activeMenuId===item.id && item.subMenuList?.map((item,index)=>{
                  return <SubMenuContainer key={item.name+index}>
                              <SubMenuList href={item.path}>{item.name}</SubMenuList>
                         </SubMenuContainer>
                })}
              </div>
              </>
          );
        })}

    </Container>
  );
};

export default SideBar;
