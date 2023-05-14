"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { Update } from "../../../../api/services/sports";
import { AppColors, capitalizeFirstLetter } from "../../../../../helper/common";
import Header from "../../../../Header";
import { LayoutContainer } from "@/ui/layout/styles";
import SideBar from "../../../../sidebar/sidebar";
import ButtonUi from "@/ui/button";
import Card from "@/ui/card";
import {
  RegisterInputField,
  RegisterInputFieldHeader,
} from "../../../../user/register/styles";
import {
  EditUserContainer,
  EditUserFooterContainer,
} from "../../../user/edituser/styles";
import { EditSportsContainer } from "../styles";
import { ISportsProps } from "../../types";

const EditSports = (props: ISportsProps) => {
  const navigate = useRouter();
  const onSave = async () => {
    if (!name.trim()) {
      return toast.error("Please enter a valid Sports Name");
    }
    //@ts-ignore
    if (props[0]?.Name !== name) {
      const updateName = capitalizeFirstLetter(name)!!;
      //@ts-ignore
      const isUpdate = await Update(Number(props[0]?.id), updateName);
      if (isUpdate && isUpdate === "OK") {
        return toast.success("Sport Updated Successfully");
      }
      toast.error("An Error Occured While Updating The Sport");
    }
    // call Api
  };
  const onCancel = () => {
    navigate.push("/admin/sports");
  };
  //@ts-ignore
  const [name, setName] = useState(props[0]?.Name);
  return (
    <LayoutContainer>
      <SideBar />
      <Header />
      <EditSportsContainer>
        <Card
          width="400px"
          height="300px"
         
        >
             <>
              <p>Edit Sport</p>
              <EditUserContainer>
                <RegisterInputFieldHeader>Sports Name</RegisterInputFieldHeader>
                <RegisterInputField
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </EditUserContainer>

              <EditUserFooterContainer>
                <ButtonUi
                  width="100px"
                  height="50px"
                  onClick={onSave}
                  backgroundColor={AppColors[0].value}
                  
                >
                  <label>Save</label>
                  </ButtonUi>
                <ButtonUi
                  width="100px"
                  height="50px"
                  onClick={onCancel}
                  backgroundColor={AppColors[1].value}
                 
                >
                  <label>Cancel</label>
                  </ButtonUi>
              </EditUserFooterContainer>
            </>
          </Card>
      </EditSportsContainer>
      <ToastContainer />
    </LayoutContainer>
  );
};

export default EditSports;
