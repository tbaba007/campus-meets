'use client'
import React from "react";
import { ButtonProps } from "./types";
import buttonStyles from './button.module.css'

const ButtonUi = ({
    children,
    backgroundColor,
    height,
    onClick,
    width,
    isDisabled,
}: ButtonProps) => {
    return (
        <button
        className={buttonStyles.buttonContainer}
        style={{backgroundColor:backgroundColor,height:height,
        width:width}}
            
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default ButtonUi;
