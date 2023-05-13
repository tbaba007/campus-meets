import styled from "styled-components";

interface IUserListProps{
    count:number
}

export const UserListTableContainer=styled.table<IUserListProps>`
width: 100%;
padding-top: 10px;
border-collapse: collapse;
border-spacing: 5em;
height: ${props=>props.count<5 && '107px'};
max-height: 15vh;
margin-top: 60px;
margin-left: 200px;
td{
    padding: 20px 35px;
}
`
export const UserListTableBody=styled.tbody`
padding: 24px;
`