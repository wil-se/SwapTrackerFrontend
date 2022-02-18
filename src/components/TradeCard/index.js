import React from 'react'
import TradeMainCard from './TradeMainCard'

import useAuthService from 'hooks/useAuthService';

const TradeCard = () => {
    const {tier} = useAuthService()

     return (
        <div className="trade-card-container d-flex justify-content-center">
            <TradeMainCard tier={tier}/>
        </div>
    )
}

export default TradeCard;



