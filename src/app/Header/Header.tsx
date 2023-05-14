"use client";
import { getMessage, removeMessageByKey } from "@/helper/common";
import { HeaderContainer, HeaderProfileDropDown, HeaderText } from "./styles";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Header = () => {
  const navigate = useRouter();
  const user = getMessage("user");

  useEffect(()=>{
      if(!user){
        navigate.push('/user/login')
      }
  },[user,navigate])
  const onSignOut = () => {
    removeMessageByKey("user");
    navigate.push("/user/login");
  };
  return (
    <>
      <HeaderContainer>
        Welcome &nbsp;
        <HeaderText>
          {user && JSON.parse(user).FirstName}

          <HeaderProfileDropDown onClick={onSignOut}>
            SignOut
          </HeaderProfileDropDown>
        </HeaderText>
      </HeaderContainer>
    </>
  );
};

export default Header;
