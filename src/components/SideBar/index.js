import React, { useEffect, useState } from 'react'
import  {Container,Row} from 'react-bootstrap';
const SideBar = () => {
    const [tiers,setTiers] = useState(0);
    const sideBarRows = [
        {title:"Dashboard",id:"dashboard"},
        {title:"Wallet",id:"wallet"},
        {title:"History",id:"history"},
        {title:"Trade",id:"trade"},
        {title:"Stacking",id:"stacking"},
        {title:"Tiers",id:"tiers"}
    ];
    useEffect(()=>{

        
    },[])

    return (
        <Container fluid className="sidebar-container">
            <div className="sidebar">
            <Row className="logo">

            </Row>
            <div className="menu">

            {sideBarRows?.map((item,id)=>{
                return (
                    <Row key={id}>
                    {item.title}
                </Row>
               ) 
            })}
            </div>
            <Row className="footer">

            </Row>
            </div>
        </Container>
    );
}

export default SideBar;
