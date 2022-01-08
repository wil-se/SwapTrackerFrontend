import React,{useState} from 'react'
import TradeMainCard from './TradeMainCard'

const TradeCard = () => {
    const [openSettings,setOpenSettings] = useState(false);
    const openSettingPanel = () => setOpenSettings(!openSettings);
     return (
        <div className="trade-card-container"> 
            <TradeMainCard openSettingPanel={openSettingPanel}/>
            
        </div>
    )
}

export default TradeCard;



