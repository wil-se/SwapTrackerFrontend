import React from 'react'
import PropTypes from 'prop-types';
import tierStarter from 'assets/icons/tier-starter.png';
import tierAdvanced from 'assets/icons/tier-advanced.png';
import tierPro from 'assets/icons/tier-pro.png';
import {Link} from "react-router-dom"


const TierSection = ({tier}) => {
    return (  
        <>
          {
            tier === 1000 ?
            (
                <div className="tierSubSection">
                    <p className="text-nowrap">Current plan:</p>
                    <Link to="tiers" className="text-nowrap ml-2" style={{fontSize: 12}}>active plan</Link>
                </div>
            )  
            : tier === 10 ? 
            (
                <div className="tierSubSection">
                    <p className="text-nowrap">Current plan:</p>
                    <div className="iconSection">
                        <img src={tierStarter} width="20px" height="20px"/>
                        <span> starter </span>
                    </div>
                    
                </div>
            )
            : tier === 5 ?
            (
                <div className="tierSubSection">
                    <p className="text-nowrap">Current plan:</p>
                    <div className="iconSection">
                        <img src={tierAdvanced} width="20px" height="20px"/>
                        <span> advanced </span>
                    </div>    
                </div>
            )
            : tier === 0 ?
            (
                <div className="tierSubSection">
                    <p className="text-nowrap">Current plan:</p>
                    <div className="iconSection">
                        <img src={tierPro} width="20px" height="20px"/>
                        <span> pro </span>
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
