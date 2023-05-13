'use client'
import React,{useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { DisableUser, GetAll } from "../../api/services/user";
import { AppColors } from "../../../helper/common";
import Header from "../../Header";
import { LayoutContainer } from "@/ui/layout/styles";
import SideBar from "../../sidebar/sidebar";
import ButtonUi from "@/ui/button/button";
import { IUserProps } from "../../user/register/types";
import { UserListTableBody, UserListTableContainer } from "./styles";

const UserList = () => {
  if(typeof window !='undefined')
  document.title="UserList"
  const [userList,setUserList]=useState<IUserProps[]>([]);
  const [update,setUpdate]=useState(0)

  useEffect(()=>{
      const FetchAllUsers=async()=>{
         const data:IUserProps[]=await GetAll();
         setUserList(data);
      };
      FetchAllUsers();
  },[update])

  const navigate = useRouter();
  const onDelete = async({ FirstName, LastName, UserId }: IUserProps) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${FirstName} ${LastName} ?`
      )
    ) {
     const disable= await DisableUser(UserId!!);
     if(disable){
      toast.success("User Disabled Successfully");
     setUpdate(update+1)
      
     }
     else{
      toast.error("An Error Occured While Disabling The User");
     }
    }
  };

  const onEdit = (user: IUserProps) => {
    debugger;
    navigate.push(`/admin/user/edituser/${user.UserId}`);
  };
  return (
    <LayoutContainer>
      <SideBar />
      <Header/>
      <UserListTableContainer cellSpacing={0} cellPadding={0} count={userList.length}>
        <thead>
          <tr>
            <th>SN</th>
            <th>FirstName</th>
            <th>LastName</th>
            <th>Email</th>
            <th>StudentId</th>
            <th>Role</th>
          </tr>
        </thead>
        <UserListTableBody>
          {userList && userList.length>0 && userList.map((item, index) => {
            return (
              <tr key={item.UserId}>
                <td>{index + 1}</td>
                <td>{item.FirstName}</td>
                <td>{item.LastName}</td>
                <td>{item.Email}</td>
                <td>{item.StudentId}</td>
                <td>{item.RoleId===1?"Admin":"User"}</td>
                <td>
                  <ButtonUi
                    width="100px"
                    height="30px"
                    onClick={() => onEdit(item)}
                    backgroundColor={AppColors[0].value}
                    children={<label>Edit</label>}
                  />
                  &nbsp;&nbsp;
                  <ButtonUi
                    width="100px"
                    height="30px"
                    onClick={() => onDelete(item)}
                    backgroundColor={AppColors[1].value}
                    children={<label>Delete</label>}
                  />
                </td>
              </tr>
            );
          })}
        </UserListTableBody>

      </UserListTableContainer>
   <ToastContainer/>
    </LayoutContainer>
  );
};

export default UserList;
