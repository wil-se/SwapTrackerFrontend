import React,{useState} from 'react'
import TradeMainCard from './TradeMainCard'

const TradeCard = () => {
     return (
        <div className="trade-card-container"> 
            <TradeMainCard openSettingPanel={openSettingPanel}/>
        </div>
    )
}

export default TradeCard;



