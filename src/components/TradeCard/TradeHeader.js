import React from 'react'
import PropTypes from 'prop-types';
import * as Icon from 'react-bootstrap-icons'
import infoIcon from '../../assets/icons/infoIcon.png';
const TradeHeader = ({openSettingPanel}) => {
    return (
        <div className="trade-main-card-header">
            <div className="trade-main-card-header-items">
                <div className="info-section">
                    <div className="ex-section">
                        <h1 className="title-section">Exchange</h1>
                        <img src={infoIcon} height="18px" width="18px"/>
                    </div>
                    <div className="trade-token-section">
                    Trade tokens in an instant 
                    </div>
                </div>
                <div onClick={openSettingPanel}>
                <Icon.Gear color="#FFFFFF" size={24}/>
                </div>
            </div>
        </div>
    )
}

TradeHeader.propTypes = {
    
    openSettingPanel:PropTypes.func,
};

export default TradeHeader
