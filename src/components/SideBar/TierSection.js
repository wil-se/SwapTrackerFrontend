import React from 'react'
import PropTypes from 'prop-types';
const TierSection = ({tier}) => {
    return (  
        <>
          {
            !tier ?
            (
                <></>
            )  
            : tier === 10 ? 
            (
                <div className="tierSubSection">
                    <h1>
                        starter
                    </h1>
                </div>
            )
            : tier === 5 ?
            (
                <div className="tierSubSection">
                    <h1>
                        advanced
                    </h1>
                </div>
            )
            :
            (
                <div className="tierSubSection">
                    <h1>
                        pro
                    </h1>
                </div>
            )

          }  
        </>
    )
}

TierSection.propTypes = {
    tier: PropTypes.number,
};

export default TierSection
