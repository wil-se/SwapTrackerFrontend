import React from 'react'
import * as Icon from 'react-bootstrap-icons'
import CryptoIcon from 'assets/icons/'
import PropTypes from 'prop-types';

const TradeModalTokenList = ({setOpenTokenListModal}) => {
    return (
        <div className="trade-modal-container">
            <div className="trade-modal-card">
                <div className="trade-modal-close-icon" onClick={()=>setOpenTokenListModal(false)}>
                    <Icon.X size={36}/>
                </div>

                <div className="trade-modal-title">
                    Select a Token
                </div>
                <div className="trade-modal-address-input">
                    <input placeholder="Search name or paste address"/>
                </div>
                <div className="trade-modal-token-list">
                    <div className="trade-modal-token-item">
                        <img src={CryptoIcon['_btc']}/>
                        BTC
                    </div>
                    <div className="trade-modal-token-item">
                        <img src={CryptoIcon['_btc']}/>
                        BTC
                    </div>
                    <div className="trade-modal-token-item">
                        <img src={CryptoIcon['_btc']}/>
                        BTC
                    </div>
                    <div className="trade-modal-token-item">
                        <img src={CryptoIcon['_btc']}/>
                        BTC
                    </div>
                    <div className="trade-modal-token-item">
                        <img src={CryptoIcon['_btc']}/>
                        BTC
                    </div>
                    <div className="trade-modal-token-item">
                        <img src={CryptoIcon['_btc']}/>
                        BTC
                    </div>
                    <div className="trade-modal-token-item">
                        <img src={CryptoIcon['_btc']}/>
                        BTC
                    </div>
                    <div className="trade-modal-token-item">
                        <img src={CryptoIcon['_btc']}/>
                        BTC
                    </div>
                    <div className="trade-modal-token-item">
                        <img src={CryptoIcon['_btc']}/>
                        BTC
                    </div>
                    <div className="trade-modal-token-item">
                        <img src={CryptoIcon['_btc']}/>
                        BTC
                    </div>
                    <div className="trade-modal-token-item">
                        <img src={CryptoIcon['_btc']}/>
                        BTC
                    </div>
                    <div className="trade-modal-token-item">
                        <img src={CryptoIcon['_btc']}/>
                        BTC
                    </div>
                    <div className="trade-modal-token-item">
                        <img src={CryptoIcon['_btc']}/>
                        BTC
                    </div>
                    <div className="trade-modal-token-item">
                        <img src={CryptoIcon['_btc']}/>
                        BTC
                    </div>
                    <div className="trade-modal-token-item">
                        <img src={CryptoIcon['_btc']}/>
                        BTC
                    </div>
                    <div className="trade-modal-token-item">
                        <img src={CryptoIcon['_btc']}/>
                        BTC
                    </div>
                    <div className="trade-modal-token-item">
                        <img src={CryptoIcon['_btc']}/>
                        BTC
                    </div>

                </div>
            </div>
        </div>
    )
}

TradeModalTokenList.propTypes = {
    setOpenTokenListModal: PropTypes.func,
};

export default TradeModalTokenList
