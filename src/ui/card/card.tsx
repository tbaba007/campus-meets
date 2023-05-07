import React from 'react';
import cardStyles from './card.module.css'
import { ICardProps } from './types';


const Card=({width,height,children}:ICardProps)=>{
    return <div className={cardStyles.Container} style={{height:height,width:width}}>
            {children}
           </div>
}
export default Card;