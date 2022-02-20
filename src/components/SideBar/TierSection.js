import React from 'react'
import PropTypes from 'prop-types';
import tierStarter from 'assets/icons/tier-starter.png';
import tierAdvanced from 'assets/icons/tier-advanced.png';
import tierPro from 'assets/icons/tier-pro.png';
import { Row, Col } from 'react-bootstrap';


const TierSection = ({tier}) => {
    return (  
        <>
          {
            tier === 1000 ?
            (
                <div className="tierSubSection">
                    <Row><h1>Current plan:</h1></Row>
                    <Row><a href="/tiers">active plan</a></Row>
                </div>
            )  
            : tier === 10 ? 
            (
                <div className="tierSubSection">

                <Row><Col className="mb-2" xs={12}><h1>Current plan:</h1></Col>
                <Col xs={12}><div className="iconSection">
                        <img src={tierStarter} width="20px" height="20px"/>
                        <h1>
                            starter
                        </h1>
                    </div></Col>
                    </Row>
                </div>
            )
            : tier === 5 ?
            (
                <div className="tierSubSection">
                     <h1>Current plan:</h1>
                    <div className="iconSection">
                        <img src={tierAdvanced} width="20px" height="20px"/>
                        <h1>
                            advanced
                        </h1>
                    </div>    
                </div>
            )
            : tier === 0 ?
            (
                <div className="tierSubSection">
                    <h1>Current plan:</h1>
                    <div className="iconSection">
                        <img src={tierPro} width="20px" height="20px"/>
                        <h1>
                            pro
                        </h1>
                    </div>
                </div>
            )
            :
            (<></>  )

          }  
        </>
    )
}

TierSection.propTypes = {
    tier: PropTypes.number,
};

export default TierSection
