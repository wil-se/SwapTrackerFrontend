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
import {useSwapInfo} from 'hooks/useSwapInfo'
import {approve} from 'utils/callHelpers';
import { useSwapTrackerMediator } from 'hooks/useContract';
import useNotification from 'hooks/useNotification'
import useTrade from 'hooks/useTrade';
import useWeb3 from 'hooks/useWeb3';
import {useLocation } from 'react-router-dom'
import {BNB} from 'config'


const TradeMainCard = ({tier}) => {
    const { state } = useLocation() 
    const { account } = useWeb3React();
    const {web3} = useWeb3()
    const [pancakeRouterContract,] = useState(usePancakeRouter())
    const [amountIn,setAmountIn] = useState()
    const [amountOut,setAmountOut] = useState()
    const [openSettingsModal,setOpenSettingsModal] = useState(false)
    const [openTokenListModalIn,setOpenTokenListModalIn] = useState(false)
    const [openTokenListModalOut,setOpenTokenListModalOut] = useState(false)
    const [tokenSelectedIn,setTokenSelectedIn] = useState(BNB)
    const [tokenSelectedOut,setTokenSelectedOut] = useState()
    const [allowanceTokenIn,setAllowanceTokenIn] = useState(0)
    const [slippageAmount,setSlippageAmount] = useState(5.0)
    const [deadlineAmount,setDeadlineAmount] = useState(20)
    const [disabledButton,setDisabledButton] = useState(true)
    const [disabledInput,setDisabledInput] = useState(true)
    const path = useSwapInfo(tokenSelectedIn,tokenSelectedOut)
    const erc20Contract = useERC20(tokenSelectedIn?.address)
    const erc20ContractOut = useERC20(tokenSelectedOut?.address)
    const swapTrackerMediator = useSwapTrackerMediator()
    const {getNotification} = useNotification()
    const {setTrade,getTokenSelected} = useTrade()

    useEffect(()=>{
        (async ()=>{
            
            if(state){
                const {tokenSelectedInRef,tokenSelectedOutRef} = await getTokenSelected(state)
                if(tokenSelectedOutRef){
                    if(tokenSelectedInRef){
                        setTokenSelectedIn(tokenSelectedInRef)
                    }
                    setTokenSelectedOut(tokenSelectedOutRef)
                    setDisabledInput(false)
                }
            }

        })()
    },[state])

    
    const getTokenAmountOut = async (e) => {
        setAmountIn(Math.abs(e.target.value))
        setDisabledButton(false)
        e.preventDefault()

        let amount = e.target.value
       
        let amountInShifted = new BigNumber(amount).shiftedBy(tokenSelectedIn.decimals);
        if(amountInShifted>0){
            let amOut = await pancakeRouterContract.methods.getAmountsOut(amountInShifted.toString(),path).call().catch((e)=>console.log(e))
            let amoutOutFormatted = new BigNumber(amOut[amOut.length-1]).shiftedBy(-1*parseInt(tokenSelectedOut.decimals)).toNumber().toFixed(6);
            let allowance = await erc20Contract.methods.allowance(account,swapTrackerMediator._address).call();
           
            setAllowanceTokenIn(allowance)
            amoutOutFormatted
            setAmountOut(amoutOutFormatted) 

        }

    }

    const getTokenAmountIn = async (e) => {
        setAmountOut(e.target.value)
        setDisabledButton(false)
        e.preventDefault()
        let amount = e.target.value
        let amountInShifted = new BigNumber(amount).shiftedBy(tokenSelectedOut.decimals);
        if(amountInShifted>0){

            let amIn = await pancakeRouterContract.methods.getAmountsIn(amountInShifted.toString(),path).call().catch((e)=>console.log(e))
            console.log("vediamo ", amIn, amIn[amIn.length-2], path)
            let amountIn = amIn.length > 2 ? amIn[0] : amIn[amIn.length-2]
            console.log(amountIn)
            let amoutInFormatted = new BigNumber(amountIn).shiftedBy(-1*tokenSelectedIn.decimals).toNumber().toFixed(6);
            let allowance = await erc20Contract.methods.allowance(account,swapTrackerMediator._address).call();
            setAllowanceTokenIn(allowance)
            setAmountIn(amoutInFormatted) 
        }
    }

    const setAllowance = async () => {
        await approve(erc20Contract,swapTrackerMediator._address,account);
        setAllowanceTokenIn(ethers.constants.MaxUint256)
        getNotification(true)
    }

    const setMaxAmountIn = async () => {
        if(tokenSelectedIn.symbol !== BNB.symbol){
            const balanceTokenIn = await erc20Contract.methods.balanceOf(account).call()
            const decimals = await erc20Contract.methods.decimals().call()
            let amountInFormatted = new BigNumber(balanceTokenIn).shiftedBy(-1*parseInt(decimals)).toNumber().toFixed(6)
            if(balanceTokenIn>0){
                let amOut = await pancakeRouterContract.methods.getAmountsOut(balanceTokenIn,path).call().catch((e)=>console.log(e))
                let amountOutFormatted = new BigNumber(amOut[amOut.length-1]).shiftedBy(-1*tokenSelectedOut.decimals).toNumber().toFixed(6);
                let allowance = await erc20Contract.methods.allowance(account,swapTrackerMediator._address).call();
                setAllowanceTokenIn(allowance)
                amountOutFormatted.replace(',','.')
                setAmountOut(Number(amountOutFormatted))
            }
            amountInFormatted.replace(',','.')
            setAmountIn(Number(amountInFormatted))
            setDisabledButton(false)

        }
        else{
            const balanceNativeIn = await web3.eth.getBalance(account)
            let amountInFormatted = new BigNumber(balanceNativeIn).shiftedBy(-1*18).toNumber().toFixed(6)
            if(balanceNativeIn>0){
                let amOut = await pancakeRouterContract.methods.getAmountsOut(balanceNativeIn,path).call().catch((e)=>console.log(e))
                let amountOutFormatted = new BigNumber(amOut[amOut.length-1]).shiftedBy(-1*tokenSelectedOut.decimals).toNumber().toFixed(6);
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

            console.log(amountOutMinFormatted.toString(),path, amountInFormattedBN.toString(),tokenSelectedOut.decimals)
            
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
                setTrade(txSwap,path)
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
                 setTrade(txSwap,path) 
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
                 setTrade(txSwap,path)

            }               
        
        }
    }
    
    return (
        <div>
            <div className="trade-main-card">
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
                            <button onClick={()=>setOpenTokenListModalIn(!openTokenListModalIn)}>
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
                            <button onClick={()=>setOpenTokenListModalOut(!openTokenListModalOut)}>
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
                                        Select a currency
                                        <img className="arrow" src={arrowIcon}/>
                                        </>
                                    )
                                }
                            </button>
                        </div>
                    </div>
                </div>
                <div className="confirm-section">

                    {   tier === 1000 ? 
                        <button className="confirm-button" disabled={true}>
                        You Need Tier 1
                        </button>
                        :
                        !allowanceTokenIn && !amountIn ? 
                        (
                        <button className="confirm-button" disabled={disabledButton}>
                            Enter an amount
                        </button>
                        )
                        :
                        parseFloat(allowanceTokenIn) >=amountIn ?
                        (
                        <button className="confirm-button" id="confirmButton" onClick={swap} disabled={disabledButton}>
                            confirm
                        </button>
                        )
                        :(
                        <button className="confirm-button" onClick={setAllowance}>
                            Enable {tokenSelectedIn?.symbol}
                        </button>   
                        )
                
                    }
                </div>            
            </div>
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
                    openTokenListModalOut={openTokenListModalOut} />
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
        </div>
    )
}

TradeMainCard.propTypes = {
    tier: PropTypes.number,
};


export default TradeMainCard

