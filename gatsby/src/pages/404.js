import React from 'react'
import { Layout} from '../components'
import styled from 'styled-components'

const Image = styled.div`
   height:600px;
   width:50%;
   margin-top:8%;
   margin-left:200px;
   margin-bottom:-8%;
   @media (max-width: 991px) {
     display:none;
  }
`;
const H4 = styled.h2`
   font-size:1rem;
   margin-left:50px;
   margin-top:-67%;
   @media (max-width: 991px) {
    font-size:1.2rem;
    text-align: center;
    margin-left:40px;
    margin-top:-67%;
 }
 @media (max-width: 600px) {
    font-size:1.2rem;
    text-align: center;
    margin-left:40px;
    margin-top:-67%;
    margin-left:5px;

 }
`;
const Image2 = styled.div`
height:600px;
width:35%;
margin-top:-10%;
margin-left:10px;
margin-bottom:-8%;
@media (max-width: 991px) {
    width:45%;
    margin-top:-13%;
    height:703px;
 }
 @media (max-width: 720px) {
    width:45%;
    margin-top:-13%;
    height:540px;

 }
`;
const PageNotFound=()=>{
    return(
        <Layout>
            {/* <Wrapper>
            <Header/>
        <div></div>
         
        <img src="/images/2992776.svg"></img>
       
        </Wrapper> */}
         <Image2>
        <img src="/images/404.svg"></img>
        <H4>This is not the webpage you are looking for.</H4>
            </Image2>
        <Image>
        <img src="/images/2992776.svg"></img>
        </Image>
        </Layout>      
    )
}

export default PageNotFound