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
import {Token } from '@pancakeswap/sdk'
import { useSwapTrackerMediator } from 'hooks/useContract';


const TradeMainCard = () => {
    const { account } = useWeb3React();
    const [pancakeRouterContract,] = useState(usePancakeRouter())
    const [amountIn,setAmountIn] = useState(0)
    const [amountOut,setAmountOut] = useState(0)
    const [openSettingsModal,setOpenSettingsModal] = useState(false)
    const [openTokenListModalIn,setOpenTokenListModalIn] = useState(false)
    const [openTokenListModalOut,setOpenTokenListModalOut] = useState(false)
    const [tokenSelectedIn,setTokenSelectedIn] = useState({decimals:18,name:"BNB",symbol:"BNB",projectLink:"https://s2.coinmarketcap.com/static/img/coins/200x200/1839.png",address:"0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"})
    const [tokenSelectedOut,setTokenSelectedOut] = useState()
    const [allowanceTokenIn,setAllowanceTokenIn] = useState(0)
    const [slippageAmount,setSlippageAmount] = useState(0.1)
    const [deadlineAmount,setDeadlineAmount] = useState(20)
    const path = useSwapInfo(tokenSelectedIn,tokenSelectedOut)
    const erc20Contract = useERC20(tokenSelectedIn?.address)
    const swapTrackerMediator = useSwapTrackerMediator()

    const getTokenAmountOut = async (e) => {
        setAmountIn(e.target.value)
        e.preventDefault()

        console.log(path)
        let amount = e.target.value
        let amountInShifted = new BigNumber(amount).shiftedBy(tokenSelectedIn.decimals);
        console.log(amountInShifted,pancakeRouterContract)
        if(amountInShifted>0){
            let amOut = await pancakeRouterContract.methods.getAmountsOut(amountInShifted,path).call().catch((e)=>console.log("vedimamo ",e))
            let amoutOutFormatted = new BigNumber(amOut[amOut.length-1]).shiftedBy(-1*tokenSelectedOut.decimals).toNumber().toFixed(5);
            let allowance = await erc20Contract.methods.allowance(account,pancakeRouterContract._address).call();
            console.log(allowance)
            setAllowanceTokenIn(allowance)
            setAmountOut(amoutOutFormatted) 

        }

    }

    const getTokenAmountIn = async (e) => {
        setAmountOut(e.target.value)
        e.preventDefault()
        console.log(e.target.value,tokenSelectedIn.address,tokenSelectedOut.address)
        let amount = e.target.value
        let amountInShifted = new BigNumber(amount).shiftedBy(tokenSelectedOut.decimals);
        console.log(amountInShifted,pancakeRouterContract)
        if(amountInShifted>0){
            let amIn = await pancakeRouterContract.methods.getAmountsIn(amountInShifted,path).call().catch((e)=>console.log("vedimamo ",e))
            let amoutInFormatted = new BigNumber(amIn[amIn.length-2]).shiftedBy(-1*tokenSelectedIn.decimals).toNumber().toFixed(5);
            setAmountIn(amoutInFormatted) 
        }
    }

    const setAllowance = async () => {
        await approve(erc20Contract,pancakeRouterContract._address,account);
        setAllowanceTokenIn(ethers.constants.MaxUint256)
    }

    const swap = async () => {
        if(tokenSelectedIn.symbol === "BNB"){

            console.log("entro qui??")
            let amountOutMin = amountOut - (amountOut * (slippageAmount/100))
            let amountOutMinFormatted = new BigNumber(amountOutMin).shiftedBy(tokenSelectedOut.decimals);
            let amountInFormatted = new BigNumber(amountIn).shiftedBy(tokenSelectedIn.decimals);
            
            
            console.log(amountOutMinFormatted.toNumber(),amountInFormatted.toNumber(),JSON.stringify(path))
            const txSwap = await swapTrackerMediator.methods.swapExactETHForTokens(amountOutMinFormatted.toString(),path).send({from:account,value:amountInFormatted.toString()})
        }
        else if (tokenSelectedIn.symbol !== "BNB"){
            console.log(swapTrackerMediator)
            let amountOutMin = amountOut - (amountOut * (slippageAmount/100))
            let amountOutMinFormatted = new BigNumber(amountOutMin).shiftedBy(tokenSelectedOut.decimals);
            let amountInFormatted = new BigNumber(amountIn).shiftedBy(tokenSelectedIn.decimals);


            console.log(amountOutMinFormatted.toNumber(),amountInFormatted.toNumber(),JSON.stringify(path))
            const txSwap = await swapTrackerMediator.methods.swapExactTokensForTokens(amountInFormatted.toString(),amountOutMinFormatted.toString(),path).send({from:account});
        }
    }
    return (
        <div>
            <div className="trade-main-card">
                <TradeHeader setOpenSettingsModal={setOpenSettingsModal} />
                <div className="trade-inputs-section">
                    <div className="trade-input-section">
                        <div className="label-section">From</div>
                        <div className="trade-input-position">
                            <input
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
                    <div className="arrow-switch-pair" onClick={()=>{setTokenSelectedIn(tokenSelectedOut); setTokenSelectedOut(tokenSelectedIn)}}>    
                        <Icon.ArrowDownShort size={34}/>
                    </div>
                    <div className="trade-input-section">
                        <div className="label-section">To</div>
                        <div className="trade-input-position">
                            <input
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
                        <button className="confirm-button">
                            Enter an amount
                        </button>
                        )
                        :
                        parseFloat(allowanceTokenIn) >=amountIn ?
                        (
                        <button className="confirm-button" onClick={swap}>
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
