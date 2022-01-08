import React,{useState} from 'react'
import TradeHeader from './TradeHeader'
import PropTypes from 'prop-types';
import arrowIcon from '../../assets/icons/arrowIcon.png';
import * as Icon from 'react-bootstrap-icons';
import CryptoIcon from 'assets/icons/';
import TradeModalTokenList from '../TradeModalTokenList';
import TradeModalSettings from '../TradeModalSettings';

const TradeMainCard = () => {
    let eth = '_eth'
    const [switchPair,setSwitchPair] = useState(false)
    const [openTokenListModal,setOpenTokenListModal] = useState(false)
    const [openSettingsModal,setOpenSettingsModal] = useState(false)
    return (
        <div>
            <div className="trade-main-card">
                <TradeHeader setOpenSettingsModal={setOpenSettingsModal} />
                <div className="trade-inputs-section">
                    <div className="trade-input-section">
                        <div className="label-section">From</div>
                        <div className="trade-input-position">
                            <input
                                type="text"
                                inputMode="decimal"
                                title="token amount"
                                autoComplete="off"
                                autoCorrect="off"
                                placeholder="0.0"
                                pattern="^[0-9]*[.,]?[0-9]*$"
                                minLength="1"
                                maxLength="79"
                                spellCheck="false"
                            />
                            <button onClick={()=>setOpenTokenListModal(!openTokenListModal)}>
                                <img className="icon-coin" src={CryptoIcon['_btc']} />
                                BTC
                                <img className="arrow" src={arrowIcon}/>
                            </button>
                        </div>
                    </div>
                    <div className="arrow-switch-pair">    
                        <Icon.ArrowDownShort size={34}/>
                    </div>
                    <div className="trade-input-section">
                        <div className="label-section">To</div>
                        <div className="trade-input-position">
                            <input
                                type="text"
                                inputMode="decimal"
                                title="token amount"
                                autoComplete="off"
                                autoCorrect="off"
                                placeholder="0.0"
                                pattern="^[0-9]*[.,]?[0-9]*$"
                                minLength="1"
                                maxLength="79"
                                spellCheck="false"
                            />
                            <button onClick={()=>setOpenTokenListModal(!openTokenListModal)}>
                                <img className="icon-coin" src={CryptoIcon[eth]} />
                                ETH
                                <img className="arrow" src={arrowIcon}/>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="confirm-section">
                    <button className="confirm-button">
                        confirm
                    </button>
                </div>            
            </div>
            {openTokenListModal?
                <TradeModalTokenList setOpenTokenListModal={setOpenTokenListModal}/>
                :null
            }
            {openSettingsModal?
                <TradeModalSettings setOpenSettingsModal={setOpenSettingsModal}/>
                :null
            }
        </div>
    )
}

TradeMainCard.propTypes = {
    openSettingPanel: PropTypes.func,
};


export default TradeMainCard

