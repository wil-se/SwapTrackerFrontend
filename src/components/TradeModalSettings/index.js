import React from 'react'
import PropTypes from 'prop-types';
import * as Icon from 'react-bootstrap-icons'
import slippageInfoIcon from '../../assets/icons/slippageInfoIcon.png';
import { Col, Row } from 'react-bootstrap';


const TradeModalSettings = ({setOpenSettingsModal,setSlippageAmount,setDeadlineAmount,slippageAmount,deadlineAmount}) => {
    return (
        <div className="trade-modal-settings-container">
            <div className="trade-modal-settings-card">
                <div className="trade-modal-settings-subcontainer">
                    <Row className="header-row">
                        Settings
                        <div className="header-close-icon" onClick={()=>setOpenSettingsModal(false)}>
                            <Icon.X size={36}/>
                        </div>
                    </Row>
                    <hr/>
                    <Row className="title-row">
                        swaps
                    </Row>
                    <Col className="slippage-row">
                        <Row className="slippage-title">
                            Slippage Tolerance
                        </Row>
                        <Row className="slippage-tags">
                            <div className="slippage-tags-item" onClick={()=>setSlippageAmount(0.1)}>
                                0.1%
                            </div>
                            <div className="slippage-tags-item" onClick={()=>setSlippageAmount(0.5)}>
                                0.5%
                            </div>
                            <div className="slippage-tags-item" onClick={()=>setSlippageAmount(1.0)}>
                                1.0%
                            </div>
                            <div className="slippage-tag-input">
                                <input
                                    type="number"
                                    inputMode="decimal"
                                    title="token amount"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    placeholder="0.0"
                                    pattern="^[0-9]*[.,]?[0-9]*$"
                                    minLength="1"
                                    maxLength="3"
                                    spellCheck="false"
                                    value={slippageAmount}
                                    onChange={(e)=>{e.preventDefault(); setSlippageAmount(parseInt(e.target.value))}}
                                />
                            </div>
                            %
                        </Row>
                        <Row className="tx-deadline-row">
                            <div className="tx-deadline-title">
                                Tx deadline (mins)
                            </div>
                            <div className="tx-deadline-input">
                                <input
                                    type="number"
                                    inputMode="decimal"
                                    title="deadline"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    placeholder="0"
                                    pattern="^[0-9]*[.,]?[0-9]*$"
                                    minLength="1"
                                    maxLength="2"
                                    spellCheck="false"
                                    value={deadlineAmount}
                                    onChange={(e)=>{e.preventDefault(); setDeadlineAmount(e.target.value)} }
                                />
                            </div>
                        </Row>
                    </Col>
                </div>
            </div>
            
        </div>
    )
}

TradeModalSettings.propTypes = {
    setOpenSettingsModal: PropTypes.func,
    setSlippageAmount: PropTypes.func,
    setDeadlineAmount: PropTypes.func,
    slippageAmount: PropTypes.number,
    deadlineAmount: PropTypes.number
};

export default TradeModalSettings
