import React,{useEffect, useState} from 'react'
import { ethers } from 'ethers';
import TradeHeader from './TradeHeader'
import PropTypes from 'prop-types';
import arrowIcon from '../../assets/icons/arrowIcon.png';
import * as Icon from 'react-bootstrap-icons';
import BigNumber from 'bignumber.js';
import { useWeb3React } from '@web3-react/core';
import TradeModalTokenList from '../TradeModalTokenList';
import TradeModalSettings from '../TradeModalSettings';
import {usePancakeRouter,useERC20} from 'hooks/useContract';
import {useSwapInfo,useWrap} from 'hooks/useSwapInfo'
import {approve} from 'utils/callHelpers';
import { useSwapTrackerMediator } from 'hooks/useContract';
import useNotification from 'hooks/useNotification'
import useTrade from 'hooks/useTrade';
import useWeb3 from 'hooks/useWeb3';
import {useLocation } from 'react-router-dom'
import {BNB,WBNB,SWPTPre} from 'config'
import { Col, Row,Card, Form } from 'react-bootstrap';
import { num_format } from 'utils/walletHelpers';
import { getBep20Contract } from 'utils/contractHelpers';


const TradeMainCard = ({tier}) => {
    const { state } = useLocation() 
    const { account } = useWeb3React();
    const {web3} = useWeb3()
    const [pancakeRouterContract,] = useState(usePancakeRouter())
    const [amountIn,setAmountIn] = useState(0)
    const [amountOut,setAmountOut] = useState(0)
    const [balance,setBalance] = useState(0)
    const [openSettingsModal,setOpenSettingsModal] = useState(false)
    const [openTokenListModalIn,setOpenTokenListModalIn] = useState(false)
    const [openTokenListModalOut,setOpenTokenListModalOut] = useState(false)
    const [tokenSelectedIn,setTokenSelectedIn] = useState(BNB)
    const [tokenSelectedOut,setTokenSelectedOut] = useState(SWPTPre)
    const [allowanceTokenIn,setAllowanceTokenIn] = useState(0)
    const [slippageAmount,setSlippageAmount] = useState(5.0)
    const [deadlineAmount,setDeadlineAmount] = useState(20)
    const [disabledButton,setDisabledButton] = useState(true)
    const [disabledButtonCloseTrade,setDisabledButtonCloseTrade] = useState(false)
    const [disabledInput,setDisabledInput] = useState(true)
    const [saveTrade,setSaveTrade] = useState(true)
    const erc20Contract = useERC20(tokenSelectedIn?.address)
    const {path,getBalance} = useSwapInfo(tokenSelectedIn,tokenSelectedOut)
    const {wrap,unWrap,isWrap} = useWrap(tokenSelectedIn,tokenSelectedOut) 
    const swapTrackerMediator = useSwapTrackerMediator()
    const {getNotification} = useNotification()
    const {setTrade,getTokenSelected} = useTrade()
    
    useEffect(()=>{
        (async ()=>{
            if(state){
                const {tokenSelectedInRef,tokenSelectedOutRef,amountIn,amountOut,slippAmm} = await getTokenSelected(state)
                if(tokenSelectedOutRef){

                    if(tokenSelectedInRef && account){
                        const contractIn = getBep20Contract(tokenSelectedInRef?.address)
                        const allowance = await contractIn.methods.allowance(account,swapTrackerMediator._address).call();
                        setAllowanceTokenIn(allowance)
                        setTokenSelectedIn(tokenSelectedInRef)
                        setAmountIn(amountIn)
                    }

                    setTokenSelectedOut(tokenSelectedOutRef)
                    setAmountOut(amountOut)
                    setDisabledButton(false)
                    setSaveTrade(!saveTrade)
                    setDisabledButtonCloseTrade(true)
                    setSlippageAmount(slippAmm)
                }
            }

        })()
    },[state,account])

    useEffect(()=>{
        (async()=>{
            let bal = await getBalance(tokenSelectedIn,account,erc20Contract,web3)
            setBalance(bal)
            tier === 1000 ? null :!state ? setDisabledInput(false) : null 

        })()
    },[account,tokenSelectedIn])



    

    const getAmountOut = async (amIn,currPath,newTokenSelectedIn) =>{
        let currentPath = path;
        let currentTokenIn = tokenSelectedIn

        if(isWrap){
            setAmountOut(Math.abs(amIn))
            return;
        }
        if(currPath && newTokenSelectedIn){
            currentPath = currPath 
            currentTokenIn = newTokenSelectedIn
        }

        let amount = Math.abs(amIn)
        let amountInShifted = new BigNumber(amount).shiftedBy(currentTokenIn.decimals);
        if(amountInShifted>0){
            let amOut = await pancakeRouterContract.methods.getAmountsOut(amountInShifted.toString(),currentPath).call().catch((e)=>console.log(e))
            let allowance = await erc20Contract.methods.allowance(account,swapTrackerMediator._address).call();
            setAllowanceTokenIn(allowance)
            if(amOut){
               
                let amoutOutFormatted = new BigNumber(amOut[amOut.length-1]).shiftedBy(-1*parseInt(tokenSelectedOut.decimals)).toNumber();
                let amountOutDecimals = num_format(amoutOutFormatted,2,tokenSelectedOut.decimals)
                setAmountOut(amountOutDecimals) 

            }
            else{
                setAmountIn(0)
            }

        }

    } 

    const getAmountIn = async (amOut,currPath) => {
        console.log("onchange", currPath)
        let currentPath = path;
        if(isWrap){
            setAmountIn(Math.abs(amOut))
            return;
        }
        if(currPath){
            currentPath = currPath 
        }
        let amount = Math.abs(amOut)
        let amountInShifted = new BigNumber(amount).shiftedBy(tokenSelectedOut.decimals);
        if(amountInShifted>0){

            let amIn = await pancakeRouterContract.methods.getAmountsIn(amountInShifted.toString(),currentPath).call().catch((e)=>console.log(e))
            let allowance = await erc20Contract.methods.allowance(account,swapTrackerMediator._address).call();
            setAllowanceTokenIn(allowance)
            if(amIn){
                let amountIn = amIn.length > 2 ? amIn[0] : amIn[amIn.length-2]
                let amoutInFormatted = new BigNumber(amountIn).shiftedBy(-1*tokenSelectedIn.decimals).toNumber();
                let amountInDecimals = num_format(amoutInFormatted,2,tokenSelectedIn.decimals)
                
                setAmountIn(amountInDecimals) 


            }
            else{
                setAmountIn(0)
            }
        }
        
    }

    
    const getTokenAmountOut = async (e) => {
        if(!e.target.value){
            setAmountIn(null)
            setAmountOut(0)
            return;
        }
        setAmountIn(Math.abs(e.target.value))
        setDisabledButton(false)
        e.preventDefault() 
        await getAmountOut(e.target.value)
       
    }

    const getTokenAmountIn = async (e) => {
        if(!e.target.value || Number(e.target.value) === 0){
            setDisabledButton(true)
            setAmountOut(null)
            setAmountIn(0)
            return;
        }
        setAmountOut(Math.abs(e.target.value))
        setDisabledButton(false)
        e.preventDefault()
        await getAmountIn(e.target.value)
        
    }

    const setAllowance = async () => {
        setDisabledButton(true)
        await approve(erc20Contract, swapTrackerMediator._address, account).catch(console.log);
        setAllowanceTokenIn(ethers.constants.MaxUint256)
        getNotification(true)
        setDisabledButton(false)
    }

    const setMaxAmountIn = async () => {
        if(tokenSelectedIn.symbol !== BNB.symbol && tokenSelectedIn.symbol !== WBNB.symbol){
            const balanceTokenIn = await erc20Contract.methods.balanceOf(account).call()
            const decimals = await erc20Contract.methods.decimals().call()
            let amountInFormatted = new BigNumber(balanceTokenIn).shiftedBy(-1*parseInt(decimals)).toNumber().toFixed(7)
            if(balanceTokenIn>0){
                let amOut = await pancakeRouterContract.methods.getAmountsOut(balanceTokenIn,path).call().catch((e)=>console.log(e))
                let amountOutFormatted = new BigNumber(amOut[amOut.length-1]).shiftedBy(-1*tokenSelectedOut.decimals).toNumber().toFixed(7);
                let allowance = await erc20Contract.methods.allowance(account,swapTrackerMediator._address).call();
                setAllowanceTokenIn(allowance)
                amountOutFormatted.replace(',','.')
                setAmountOut(Number(amountOutFormatted))
            }
            amountInFormatted.replace(',','.')
            setAmountIn(Number(amountInFormatted))
            setDisabledButton(false)

        }
        else if(tokenSelectedOut.symbol === WBNB.symbol && tokenSelectedIn.symbol === BNB.symbol){
            const balanceNativeIn = await web3.eth.getBalance(account)
            let amountInFormatted = new BigNumber(balanceNativeIn).shiftedBy(-1*18).toNumber().toFixed(7)
            setAmountIn(Number(amountInFormatted))
            setAmountOut(Number(amountInFormatted))
            setDisabledButton(false)
        }
        else if(tokenSelectedOut.symbol === BNB.symbol && tokenSelectedIn.symbol === WBNB.symbol){
            const balanceWNativeIn = await erc20Contract.methods.balanceOf(account).call()
            let amountInFormatted = new BigNumber(balanceWNativeIn).shiftedBy(-1*18).toNumber().toFixed(7)
            setAmountIn(Number(amountInFormatted))
            setAmountOut(Number(amountInFormatted))
            setDisabledButton(false)
        }
        else {
            const balanceNativeIn = await web3.eth.getBalance(account)
            let amountInFormatted = new BigNumber(balanceNativeIn).shiftedBy(-1*18).toNumber().toFixed(7)
            if(balanceNativeIn>0){
                let amOut = await pancakeRouterContract.methods.getAmountsOut(balanceNativeIn,path).call().catch((e)=>console.log(e))
                let amountOutFormatted = new BigNumber(amOut[amOut.length-1]).shiftedBy(-1*tokenSelectedOut.decimals).toNumber().toFixed(7);
                let allowance = await erc20Contract.methods.allowance(account,swapTrackerMediator._address).call();
                setAllowanceTokenIn(allowance)
                amountOutFormatted.replace(',','.')
                setAmountOut(amountOutFormatted)
            }
            amountInFormatted.replace(',','.')
            setAmountIn(Number(amountInFormatted))
            setDisabledButton(false)
        }
        
    } 
 
    const swap = async () => {
        setDisabledButton(true); 
        
        if(tokenSelectedIn.symbol === BNB.symbol){

            let amountOutBN = new BigNumber(amountOut);
            let amountOutMinBN = amountOutBN.multipliedBy(100-parseInt(slippageAmount)).dividedBy(100);

            let amountOutMinFormatted = Math.floor(amountOutMinBN.shiftedBy(tokenSelectedOut.decimals).toNumber());
            if(amountOutMinFormatted.toString().includes('e')){
                amountOutMinFormatted = amountOutMinBN.shiftedBy(tokenSelectedOut.decimals)
            }
            let amountInFormattedBN = new BigNumber(amountIn).shiftedBy(tokenSelectedIn.decimals);
            
            const txSwap = await swapTrackerMediator.methods
                            .swapExactETHForTokens(amountOutMinFormatted.toString(),path)
                            .send({from:account,value:amountInFormattedBN.toString()})
                            .catch((e)=>{
                                setDisabledButton(false)
                                console.warn(e)

                            })
            
            getNotification(txSwap?.status || false)
            if(!disabledButton && txSwap){
                setDisabledButton(false);
                setTrade(txSwap,path,saveTrade)
            }         
        }
        else if (tokenSelectedIn.symbol !== BNB.symbol && tokenSelectedOut.symbol !== BNB.symbol){
            let amountOutBN = new BigNumber(amountOut);
            let amountOutMinBN = amountOutBN.multipliedBy(100-parseInt(slippageAmount)).dividedBy(100);
            let amountOutMinFormatted = Math.floor(amountOutMinBN.shiftedBy(tokenSelectedOut.decimals).toNumber());
            if(amountOutMinFormatted.toString().includes('e')){
                amountOutMinFormatted = amountOutMinBN.shiftedBy(tokenSelectedOut.decimals)
            }
            let amountInFormattedBN = new BigNumber(amountIn).shiftedBy(tokenSelectedIn.decimals);

            const txSwap = await swapTrackerMediator.methods
                            .swapExactTokensForTokens(amountInFormattedBN.toString(),amountOutMinFormatted.toString(),path)
                            .send({from:account})
                            .catch((e)=>{
                                setDisabledButton(false)
                                console.warn(e)

                            })
               setDisabledButton(false)             
            getNotification(txSwap?.status || false)
             if(!disabledButton && txSwap){
                 setDisabledButton(false);
                 setTrade(txSwap,path,saveTrade) 
             }               
        }
        else if (tokenSelectedOut.symbol === BNB.symbol) {
            
            let amountOutBN = new BigNumber(amountOut);
            let amountOutMinBN = amountOutBN.multipliedBy(100-slippageAmount).dividedBy(100);
            let amountOutMinFormatted = Math.floor(amountOutMinBN.shiftedBy(tokenSelectedOut.decimals).toNumber());
            if(amountOutMinFormatted.toString().includes('e')){
                amountOutMinFormatted = amountOutMinBN.shiftedBy(tokenSelectedOut.decimals)
            }
            let amountInFormattedBN = new BigNumber(amountIn).shiftedBy(tokenSelectedIn.decimals);

            const txSwap = await swapTrackerMediator.methods
                            .swapExactTokensForETH(amountInFormattedBN.toString(),amountOutMinFormatted.toString(),path)
                            .send({from:account})
                            .catch((e)=>{
                                setDisabledButton(false) 
                                console.warn(e)
                            })
            getNotification(txSwap?.status || false)
            if(!disabledButton && txSwap){
                 setDisabledButton(false);
                 setTrade(txSwap,path,saveTrade)
            }               
        
        }
    }
    
    return (
        <Row className="mb-3">
            <Col>
                <Card className="trade-main-card">

                <TradeHeader setOpenSettingsModal={setOpenSettingsModal} />
                <div className="trade-inputs-section">
                    <div className="trade-input-section">
                        <div className="label-section">
                            <div className="label">
                            From
                            </div>
                            <button onClick={setMaxAmountIn} disabled={disabledInput}>
                                MAX
                            </button>
                        </div>
                        <div className="trade-input-position">
                            <input
                                disabled={disabledInput}
                                type="number"
                                inputMode="decimal"
                                title="token amount"
                                autoComplete="off"
                                autoCorrect="off"
                                placeholder="0.0"
                                pattern="^[0-9]*[.]?[0-9]*$"
                                min="0"
                                minLength="1"
                                maxLength="79"
                                spellCheck="false"
                                value={amountIn}
                                onChange={getTokenAmountOut}
                                />
                            <button onClick={()=>setOpenTokenListModalIn(!openTokenListModalIn)} disabled={disabledButtonCloseTrade}>
                                {tokenSelectedIn ?
                                    (   <>
                                        <img className="icon-coin" src={tokenSelectedIn?.projectLink} />
                                        <div className="symbol-coin">
                                            {tokenSelectedIn?.symbol}
                                        </div>
                                        
                                        <img className="arrow" src={arrowIcon}/>
                                        </>
                                    )
                                    :
                                    (   
                                        <>
                                        Select a currency
                                        <img className="arrow" src={arrowIcon}/>
                                        </>
                                    )
                                }
                            </button>
                        </div>
                    </div>
                    <div className="arrow-switch-pair"  onClick={()=>{if(!tokenSelectedIn || !tokenSelectedOut){return;} setTokenSelectedIn(tokenSelectedOut);setAmountIn(amountOut); setTokenSelectedOut(tokenSelectedIn); setAmountOut(amountIn)}}>    
                        <Icon.ArrowDownShort size={34}/>
                    </div>
                    <div className="trade-input-section">
                    <div className="label-section">
                            <div className="label">
                            To
                            </div>
                        </div>
                        <div className="trade-input-position">
                            <input
                                disabled={disabledInput}
                                type="number"
                                inputMode="decimal"
                                title="token amount"
                                autoComplete="off"
                                autoCorrect="off"
                                placeholder="0.0"
                                pattern="^[0-9]*[.]?[0-9]*$"
                                minLength="1"
                                min="0"
                                maxLength="79"
                                spellCheck="false"
                                value={amountOut}
                                onChange={getTokenAmountIn}
                                />
                            <button onClick={()=>setOpenTokenListModalOut(!openTokenListModalOut)} disabled={disabledButtonCloseTrade}>
                                {tokenSelectedOut ?
                                    (   <>
                                       
                                        <img className="icon-coin" src={tokenSelectedOut?.projectLink} />
                                        <div className="symbol-coin">

                                            {tokenSelectedOut?.symbol}
                                        </div>
                                        
                                        <img className="arrow" src={arrowIcon}/>
                                        </>
                                    )
                                    :
                                    (   
                                        <>
                                        <div className="label-select-currency">
                                        Select a currency
                                        </div>
                                        <img className="arrow" src={arrowIcon}/>
                                        </>
                                    )
                                }
                            </button>
                        </div>
                    </div>
                    <div className="mt-3 mx-3 mx-md-0">
                        <Form.Check 
                            checked={!saveTrade}
                            type="switch"
                            id="custom-switch"
                            label={state ? "Don't mark this trade as a new open trade (SUGGESTED)" : "Just Swap Mode | Don't mark this trade as a new open trade"}
                            onChange={() => setSaveTrade(!saveTrade)}
                            colorPrimary="#b6d7e4"
                            className="align-self-start"
                            />
                    </div>
                </div>
               
                
                <div className="confirm-section mx-2 mb-2">
                   
                    {   tier === 1000 ? 
                        <button className="confirm-button" disabled={true}>
                        You Need Tier 1
                        </button>
                        :
                        !allowanceTokenIn || (!amountIn || amountIn === 0) ? 
                        (
                            <button className="confirm-button" disabled={true}>
                            Enter an amount
                            </button>
                        )
                        :tokenSelectedIn.symbol === BNB.symbol && tokenSelectedOut.symbol === WBNB.symbol ?
                        (
                            <button className="confirm-button" disabled={disabledButton} onClick={async ()=>await wrap(amountIn,account)}>
                            Wrap
                            </button>   
                        ) 
                        :tokenSelectedIn.symbol === WBNB.symbol && tokenSelectedOut.symbol === BNB.symbol ?
                        (
                            <button className="confirm-button" disabled={disabledButton} onClick={async()=>await unWrap(amountIn,account)}>
                            unWrap
                            </button>   
                        ) 
                        :
                        amountIn > balance ?
                        (
                            <button className="confirm-button" disabled={true}>
                            Insufficient balance
                            </button>
                        )
                        :
                        parseFloat(allowanceTokenIn) >=Number(amountIn) ?
                        (
                            <button className="confirm-button" id="confirmButton" onClick={swap} disabled={disabledButton}>
                            confirm
                            </button>
                        )
                        :
                        (
                            <button className="confirm-button" onClick={setAllowance}>
                            Enable {tokenSelectedIn?.symbol}
                            </button>   
                        )

                    }
                </div>            
                </Card>
            </Col>
            {openTokenListModalIn || openTokenListModalOut?
                <TradeModalTokenList 
                    setOpenTokenListModalIn={setOpenTokenListModalIn}
                    setOpenTokenListModalOut={setOpenTokenListModalOut}
                    setTokenSelectedIn={setTokenSelectedIn}
                    setTokenSelectedOut={setTokenSelectedOut}
                    tokenSelectedIn={tokenSelectedIn}
                    tokenSelectedOut={tokenSelectedOut}
                    setDisabledInput={setDisabledInput} 
                    openTokenListModalIn={openTokenListModalIn} 
                    openTokenListModalOut={openTokenListModalOut}
                    getAmountIn={getAmountIn}
                    getAmountOut={getAmountOut}
                    amountIn={amountIn}
                    amountOut={amountOut} />
                :null
            }
            {openSettingsModal?
                <TradeModalSettings 
                setOpenSettingsModal={setOpenSettingsModal}
                setSlippageAmount={setSlippageAmount}
                setDeadlineAmount={setDeadlineAmount}
                slippageAmount={slippageAmount}
                deadlineAmount={deadlineAmount}
                />
                :null
            }
        </Row>
    )
}

TradeMainCard.propTypes = {
    tier: PropTypes.number,
};


export default TradeMainCard

