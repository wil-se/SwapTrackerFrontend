import React,{useEffect,useState} from 'react'
import * as Icon from 'react-bootstrap-icons'
import * as CryptoIcons from 'assets/icons';
import PropTypes from 'prop-types'
import {getPancakeTokenList} from 'utils/tradeHelpers'
import {Token,ChainId } from '@pancakeswap/sdk'
import {useSwapInfo} from 'hooks/useSwapInfo'
import {getBep20Contract} from 'utils/contractHelpers';


const TradeModalTokenList = ({setOpenTokenListModalIn,setOpenTokenListModalOut, setTokenSelectedIn, setTokenSelectedOut, tokenSelectedIn, tokenSelectedOut ,setDisabledInput, openTokenListModalIn, openTokenListModalOut,getAmountIn,getAmountOut,amountIn,amountOut}) => {
    const [tokenList, setTokenList] = useState([])
    const [searchToken,setSearchToken] = useState("")
    const {getPath} = useSwapInfo(tokenSelectedIn,tokenSelectedOut)
    useEffect(async () => {
            let resp = await getPancakeTokenList()
            if(searchToken.includes("0x")){
                let contract = getBep20Contract(searchToken.toLowerCase());
                let token = {};
                let listToken = [];
                (async ()=>{
                    let symbol = await contract.methods.symbol().call()
                    let name = await contract.methods.name().call()
                    let decimals = await contract.methods.decimals().call()
                    let address = contract._address
                    let logoURI = CryptoIcons.default['_'+symbol.toLowerCase()] ? CryptoIcons.default['_'+symbol.toLowerCase()] : CryptoIcons.default['_generic']
                    token.name = name;
                    token.symbol = symbol;
                    token.decimals = parseInt(decimals);
                    token.address = address;
                    token.logoURI = logoURI;
                    listToken.push(token)
                    setTokenList(listToken)

                    

                })()
            }
            else{
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
                
            }
        
    }, [searchToken,tokenSelectedIn,tokenSelectedOut])

    const setNewAmountOut = async (newTokenSelectedIn) => {
      
        if(tokenSelectedIn.symbol !== newTokenSelectedIn.symbol){
            const path = getPath(newTokenSelectedIn,tokenSelectedOut)
            await getAmountOut(amountIn,path,newTokenSelectedIn)
        }
    }

    const setNewAmountOutForNewTokenOut = async (newTokenSelectedOut) => {
      
        if(tokenSelectedOut.symbol !== newTokenSelectedOut.symbol){
            const path = getPath(tokenSelectedIn,newTokenSelectedOut)
            await getAmountOut(amountIn,path,newTokenSelectedOut)
        }
    }

    const setNewAmountIn = async (newTokenSelectedOut) => {
      
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
                await setNewAmountOutForNewTokenOut(token)
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
