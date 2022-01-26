import React,{useState} from 'react'
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
import { Button } from 'react-bootstrap';
import useWeb3 from 'hooks/useWeb3';

const TradeMainCard = () => {
    const { account } = useWeb3React();
    const {web3,chainId} = useWeb3()
    const [pancakeRouterContract,] = useState(usePancakeRouter())
    const [amountIn,setAmountIn] = useState(0)
    const [amountOut,setAmountOut] = useState(0)
    const [openSettingsModal,setOpenSettingsModal] = useState(false)
    const [openTokenListModalIn,setOpenTokenListModalIn] = useState(false)
    const [openTokenListModalOut,setOpenTokenListModalOut] = useState(false)
    const [tokenSelectedIn,setTokenSelectedIn] = useState({decimals:18,name:"BNB",symbol:"BNB",projectLink:"https://s2.coinmarketcap.com/static/img/coins/200x200/1839.png",address:"0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"})
    const [tokenSelectedOut,setTokenSelectedOut] = useState()
    const [allowanceTokenIn,setAllowanceTokenIn] = useState(0)
    const [slippageAmount,setSlippageAmount] = useState(5.0)
    const [deadlineAmount,setDeadlineAmount] = useState(20)
    const [disabledButton,setDisabledButton] = useState(true)
    const [disabledInput,setDisabledInput] = useState(!tokenSelectedOut ? true : false )
    const path = useSwapInfo(tokenSelectedIn,tokenSelectedOut)
    const erc20Contract = useERC20(tokenSelectedIn?.address)
    const erc20ContractOut = useERC20(tokenSelectedOut?.address)
    const swapTrackerMediator = useSwapTrackerMediator()
    const {getNotification} = useNotification()
    const {setTrade} = useTrade()

    const getTokenAmountOut = async (e) => {
        setAmountIn(e.target.value)
        setDisabledButton(false)
        e.preventDefault()

        let amount = e.target.value
        let amountInShifted = new BigNumber(amount).shiftedBy(tokenSelectedIn.decimals);
        if(amountInShifted>0){
            let amOut = await pancakeRouterContract.methods.getAmountsOut(amountInShifted,path).call().catch((e)=>console.log("vedimamo ",e))
            let amoutOutFormatted = new BigNumber(amOut[amOut.length-1]).shiftedBy(-1*parseInt(tokenSelectedOut.decimals)).toNumber().toFixed(5);
            let allowance = await erc20Contract.methods.allowance(account,swapTrackerMediator._address).call();
            console.log(allowance)
            setAllowanceTokenIn(allowance)
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
            let amIn = await pancakeRouterContract.methods.getAmountsIn(amountInShifted,path).call().catch((e)=>console.log("vedimamo ",e))
            console.log(amIn,amIn[amIn.length-2])
            let amoutInFormatted = new BigNumber(amIn[amIn.length-2]).shiftedBy(-1*tokenSelectedIn.decimals).toNumber().toFixed(5);
            let allowance = await erc20Contract.methods.allowance(account,swapTrackerMediator._address).call();
            console.log(allowance)
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
        if(tokenSelectedIn.symbol !== "BNB"){
            const balanceTokenIn = await erc20Contract.methods.balanceOf(account).call()
            const decimals = await erc20Contract.methods.decimals().call()
            let amountInFormatted = new BigNumber(balanceTokenIn).shiftedBy(-1*parseInt(decimals)).toNumber().toFixed(5)
            let amountInShifted = new BigNumber(balanceTokenIn).shiftedBy(parseInt(decimals));
            if(amountInShifted>0){
                let amOut = await pancakeRouterContract.methods.getAmountsOut(amountInShifted,path).call().catch((e)=>console.log("vedimamo ",e))
                let amountOutFormatted = new BigNumber(amOut[amOut.length-1]).shiftedBy(-1*tokenSelectedOut.decimals).toNumber().toFixed(5);
                console.log(amountOutFormatted)
                let allowance = await erc20Contract.methods.allowance(account,swapTrackerMediator._address).call();
                setAllowanceTokenIn(allowance)
                setAmountOut(amountOutFormatted)
            }
            setAmountIn(amountInFormatted)
            setDisabledButton(false)

        }
        else{
            const balanceNativeIn = await web3.eth.getBalance(account)
            console.log("allora ", balanceNativeIn)
            let amountInFormatted = new BigNumber(balanceNativeIn).shiftedBy(-1*18).toNumber().toFixed(5)
            if(balanceNativeIn>0){
                console.log(path)
                let amOut = await pancakeRouterContract.methods.getAmountsOut(balanceNativeIn,path).call().catch((e)=>console.log("vedimamo ",e))
                console.log(amOut, amOut[amOut.length-2])
                let amountOutFormatted = new BigNumber(amOut[amOut.length-1]).shiftedBy(-1*tokenSelectedOut.decimals).toNumber().toFixed(5);
                console.log(amountOutFormatted)
                let allowance = await erc20Contract.methods.allowance(account,swapTrackerMediator._address).call();
                setAllowanceTokenIn(allowance)
                setAmountOut(amountOutFormatted)
            }
            setAmountIn(amountInFormatted)
            setDisabledButton(false)
        }
    } 

    const setMaxAmountOut = async () => {
        if(tokenSelectedOut.symbol !== "BNB"){
            const balanceTokenOut = await erc20ContractOut.methods.balanceOf(account).call()
            let allowance = await erc20Contract.methods.allowance(account,swapTrackerMediator._address).call();
            const decimals = await erc20ContractOut.methods.decimals().call()
            let amountOutFormatted = new BigNumber(balanceTokenOut).shiftedBy(-1*parseInt(decimals)).toNumber().toFixed(5)     
            if(balanceTokenOut>0){
                let amOut = await pancakeRouterContract.methods.getAmountsIn(balanceTokenOut,path).call().catch((e)=>console.log("vedimamo ",e))
                console.log(amOut, amOut[amOut.length-2])
                let amountInFormatted = new BigNumber(amOut[amOut.length-2]).shiftedBy(-1*tokenSelectedIn.decimals).toNumber().toFixed(5);
                let allowance = await erc20Contract.methods.allowance(account,swapTrackerMediator._address).call();
                setAllowanceTokenIn(allowance)
                setAmountIn(amountInFormatted)
            }
            setAmountOut(amountOutFormatted)
            setDisabledButton(false)
        }
        else{
            const balanceNativeOut = await web3.eth.getBalance(account)
            console.log("vediamo ",balanceNativeOut)
            let amountOutFormatted = new BigNumber(balanceNativeOut).shiftedBy(-1*18).toNumber().toFixed(5)
            
            if(balanceNativeOut>0){
                let amOut = await pancakeRouterContract.methods.getAmountsIn(balanceNativeOut,path).call().catch((e)=>console.log("vedimamo ",e))
                console.log(amOut, amOut[amOut.length-2])
                let amountInFormatted = new BigNumber(amOut[amOut.length-2]).shiftedBy(-1*tokenSelectedOut.decimals).toNumber().toFixed(5);
                let allowance = await erc20Contract.methods.allowance(account,swapTrackerMediator._address).call();
                setAllowanceTokenIn(allowance)
                setAmountOut(amountInFormatted)
            }
            setAmountOut(amountOutFormatted)
            setDisabledButton(false)
        }

    }
 
    const swap = async () => {
        setDisabledButton(true); 
        
        if(tokenSelectedIn.symbol === "BNB"){

            console.log("entro qui??")
            let amountOutBN = new BigNumber(amountOut);
            let amountOutMinBN = amountOutBN.multipliedBy(100-parseInt(slippageAmount)).dividedBy(100);
            console.log(amountOutMinBN.toNumber(),tokenSelectedOut.decimals)
            let amountOutMinFormatted = Math.floor(amountOutMinBN.shiftedBy(tokenSelectedOut.decimals).toNumber());
            let amountInFormattedBN = new BigNumber(amountIn).shiftedBy(tokenSelectedIn.decimals);

            
            
            console.log(amountInFormattedBN.toNumber(),amountOutMinFormatted,JSON.stringify(path))
            const txSwap = await swapTrackerMediator.methods
                            .swapExactETHForTokens(amountOutMinFormatted.toString(),path)
                            .send({from:account,value:amountInFormattedBN.toString()})
                            .catch((e)=>{
                                setDisabledButton(false)
                                console.warn(e)

                            })
            //console.log(txSwap)
            console.log("allora ", txSwap)
            
            getNotification(txSwap?.status || false)
            if(!disabledButton && txSwap){
                setDisabledButton(false);
                setTrade(path)
            }         
        }
        else if (tokenSelectedIn.symbol !== "BNB" && tokenSelectedOut.symbol !== "BNB"){
            console.log(amountOut)
            let amountOutBN = new BigNumber(amountOut);
            let amountOutMinBN = amountOutBN.multipliedBy(100-parseInt(slippageAmount)).dividedBy(100);
            console.log(amountOutMinBN.toNumber(),tokenSelectedOut.decimals)
            let amountOutMinFormatted = Math.floor(amountOutMinBN.shiftedBy(tokenSelectedOut.decimals).toNumber());
            let amountInFormattedBN = new BigNumber(amountIn).shiftedBy(tokenSelectedIn.decimals);

            console.log(amountOut, amountOutMinFormatted ,amountInFormattedBN.toNumber(),JSON.stringify(path))
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
        else if (tokenSelectedOut.symbol === "BNB") {
            
            let amountOutBN = new BigNumber(amountOut);
            let amountOutMinBN = amountOutBN.multipliedBy(100-slippageAmount).dividedBy(100);
            let amountOutMinFormatted = Math.floor(amountOutMinBN.shiftedBy(tokenSelectedOut.decimals).toNumber());
            let amountInFormattedBN = new BigNumber(amountIn).shiftedBy(tokenSelectedIn.decimals);

            console.log(amountOutMinFormatted,amountInFormattedBN.toNumber(),JSON.stringify(path))
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
                                pattern="^[0-9]*[.,]?[0-9]*$"
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
                    <div className="arrow-switch-pair" onClick={()=>{setTokenSelectedIn(tokenSelectedOut);setAmountIn(amountOut); setTokenSelectedOut(tokenSelectedIn); setAmountOut(amountIn)}}>    
                        <Icon.ArrowDownShort size={34}/>
                    </div>
                    <div className="trade-input-section">
                    <div className="label-section">
                            <div className="label">
                            To
                            </div>
                            <button onClick={setMaxAmountOut} disabled={disabledInput}>
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
                                pattern="^[0-9]*[.,]?[0-9]*$"
                                minLength="1"
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
                    {!allowanceTokenIn && !amountIn ? 
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
    openSettingPanel: PropTypes.func,
};


export default TradeMainCard

