import React,{useEffect,useState} from 'react'
import * as Icon from 'react-bootstrap-icons'
import CryptoIcon from 'assets/icons/'
import PropTypes from 'prop-types'
import {getPancakeTokenList} from 'utils/tradeHelpers'
import {Token,ChainId } from '@pancakeswap/sdk'
import {WBNB} from 'config'
import {useSwapInfo} from 'hooks/useSwapInfo'
const TradeModalTokenList = ({setOpenTokenListModalIn,setOpenTokenListModalOut, setTokenSelectedIn, setTokenSelectedOut, tokenSelectedIn, tokenSelectedOut ,setDisabledInput, openTokenListModalIn, openTokenListModalOut,getAmountIn,getAmountOut,amountIn,amountOut}) => {
    const [tokenList, setTokenList] = useState([])
    const [searchToken,setSearchToken] = useState("")
    const {getPath} = useSwapInfo(tokenSelectedIn,tokenSelectedOut)
    useEffect(async () => {
            let resp = await getPancakeTokenList()
            setTokenList(
                resp.filter((token) => {
                    
                        return (
                            
                                (
                                    !token.symbol.toLowerCase().includes(tokenSelectedIn?.symbol.toLowerCase()) 
                                    && 
                                    !token.symbol.toLowerCase().includes(tokenSelectedOut?.symbol.toLowerCase())
                                    
                                )
                                &&
                                (
                                    token.symbol
                                    .toLowerCase()
                                    .includes(searchToken.toLowerCase())
                                    ||
                                    token.name
                                    .toLowerCase()
                                    .includes(searchToken.toLowerCase())
                                )
                                    
                        )
                    
                })
                
                
            );
        
    }, [searchToken,tokenSelectedIn,tokenSelectedOut])

    const setNewAmountOut = async (newTokenSelectedIn) => {
        console.log(tokenSelectedIn.symbol , newTokenSelectedIn.symbol)
        if(tokenSelectedIn.symbol !== newTokenSelectedIn.symbol){
            const path = getPath(newTokenSelectedIn,tokenSelectedOut)
            await getAmountOut(amountIn,path)
        }
    }

    const setNewAmountIn = async (newTokenSelectedOut) => {
        console.log(tokenSelectedOut.symbol , newTokenSelectedOut.symbol)
        if(tokenSelectedOut.symbol !== newTokenSelectedOut.symbol){
            const path = getPath(tokenSelectedIn,newTokenSelectedOut)
            await getAmountIn(amountOut,path)
        }
    }

    const getTokenSelected = async (token) => {
        
        openTokenListModalIn ? 
            (
                setTokenSelectedIn(token), 
                setOpenTokenListModalIn(!openTokenListModalIn),
                await setNewAmountOut(token)
            ) 
            : 
            (
                setTokenSelectedOut(token), 
                setOpenTokenListModalOut(!openTokenListModalOut), 
                await setNewAmountIn(token)
            );
        
    }


    return (
        <div className="trade-modal-container">
            <div className="trade-modal-card">
                <div className="trade-modal-close-icon" onClick={()=>openTokenListModalIn ? setOpenTokenListModalIn(!openTokenListModalIn) : setOpenTokenListModalOut(!openTokenListModalOut)}>
                    <Icon.X size={36}/>
                </div>

                <div className="trade-modal-title">
                    Select a Token
                </div>
                <div className="trade-modal-address-input">
                    <input placeholder="Search name or paste address" onChange={(e)=>{setSearchToken(e.target.value)}}/>
                </div>
                <div className="trade-modal-token-list">
                    {
                        tokenList?.map((token,i)=>{
                            return (
                            <div key={i} className="trade-modal-token-item" onClick={()=>getTokenSelected(new Token(ChainId.MAINNET,token.address,token.decimals,token.symbol,token.name,token.logoURI))} >
                                <img src={token.logoURI}/>
                                {token.symbol}
                            </div>
                                
                            )
                        })
                    }
                    
                </div>
            </div>
        </div>
    )
}

TradeModalTokenList.propTypes = {
    setOpenTokenListModalIn: PropTypes.func,
    setOpenTokenListModalOut: PropTypes.func,
    setTokenSelectedIn: PropTypes.func,
    setTokenSelectedOut: PropTypes.func,
    tokenSelectedIn: PropTypes.object,
    tokenSelectedOut: PropTypes.object,
    setDisabledInput: PropTypes.func,
    openTokenListModalIn: PropTypes.bool,
    openTokenListModalOut: PropTypes.bool,
    getAmountIn: PropTypes.func,
    getAmountOut: PropTypes.func,
    amountIn: PropTypes.string,
    amountOut: PropTypes.string

};

export default TradeModalTokenList
