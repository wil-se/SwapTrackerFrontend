import React from 'react'
import PropTypes from 'prop-types';
import * as Icon from 'react-bootstrap-icons'
import slippageInfoIcon from '../../assets/icons/slippageInfoIcon.png';
import { Col, Row } from 'react-bootstrap';


const TradeModalSettings = ({setOpenSettingsModal}) => {
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
                            <img src={slippageInfoIcon}/>
                        </Row>
                        <Row className="slippage-tags">
                            <div className="slippage-tags-item">
                                0.1%
                            </div>
                            <div className="slippage-tags-item">
                                0.5%
                            </div>
                            <div className="slippage-tags-item">
                                1.0%
                            </div>
                            <div className="slippage-tag-input">
                                <input
                                    type="text"
                                    inputMode="decimal"
                                    title="token amount"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    placeholder="0.0"
                                    pattern="^[0-9]*[.,]?[0-9]*$"
                                    minLength="1"
                                    maxLength="3"
                                    spellCheck="false"
                                />
                            </div>
                            %
                        </Row>
                        <Row className="tx-deadline-row">
                            <div className="tx-deadline-title">
                                Tx deadline (mins)
                                <img src={slippageInfoIcon}/>
                            </div>
                            <div className="tx-deadline-input">
                                <input
                                    type="text"
                                    inputMode="decimal"
                                    title="deadline"
                                    autoComplete="off"
                                    autoCorrect="off"
                                    placeholder="20"
                                    pattern="^[0-9]*[.,]?[0-9]*$"
                                    minLength="1"
                                    maxLength="2"
                                    spellCheck="false"
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
};

export default TradeModalSettings
