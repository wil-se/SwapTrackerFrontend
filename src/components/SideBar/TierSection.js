import React from 'react'
import PropTypes from 'prop-types';
import tierStarter from 'assets/icons/tier-starter.png';
import tierAdvanced from 'assets/icons/tier-advanced.png';
import tierPro from 'assets/icons/tier-pro.png';
const TierSection = ({tier}) => {
    return (  
        <>
          {
            tier === 1000 ?
            (
                <></>
            )  
            : tier === 10 ? 
            (
                <div className="tierSubSection">
                    <img src={tierStarter} width="20px" height="20px"/>
                    <h1>
                        starter
                    </h1>
                </div>
            )
            : tier === 5 ?
            (
                <div className="tierSubSection">
                    <img src={tierAdvanced} width="20px" height="20px"/>
                    <h1>
                        advanced
                    </h1>
                </div>
            )
            : tier === 0 ?
            (
                <div className="tierSubSection">
                    <img src={tierPro} width="20px" height="20px"/>
                    <h1>
                        pro
                    </h1>
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
