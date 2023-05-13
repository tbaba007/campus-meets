import styled from "styled-components";

interface ISportListProps{
    count:number
}

export const SportListContainer=styled.div`
overflow: scroll;
width: 100%;
height: 100vh;
`

export const SportListTable=styled.table<ISportListProps>`
margin-left: 100px;
width: 100%;
margin-top: 70px;
overflow: scroll;

td{
    padding: 20px 185px;
}

`

export const BtnAddSports=styled.div`
align-self: flex-start;
margin-left: 88%;
margin-right: 20px;
position: absolute;
margin-top: 50px;
`

export const PaginationList=styled.div`
display: flex;

`