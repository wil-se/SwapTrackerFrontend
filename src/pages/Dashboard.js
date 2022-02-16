import React,{useState,useEffect, useLayoutEffect} from 'react'
import MainContainer from 'components/MainContainer'
import { Card, Row, Col } from 'react-bootstrap';
import DashBoardHeader from 'components/DashBoardHeader';
import * as CoingeckoTokens from 'config/constants/coingeckoTokens';
import useWeb3 from 'hooks/useWeb3';
import useAuthService from 'hooks/useAuthService'
import {walletDistribution,getWalletTVL} from 'utils/walletHelpers'
import DashBoardChart from 'components/DashBoardChart';
import DashBoardOpenTrades from 'components/DashBoardOpenTrades';
import {getDashboardData} from 'utils/dashboardHelpers'
import { setNewBalanceOverview, getTradeRows } from 'utils/dashboardHelpers';
import { useSwapTrackerMediator } from 'hooks/useContract';
import { useGetFiatName, useGetFiatValues, useGetFiatSymbol } from 'store/hooks';
import { useWeb3React } from '@web3-react/core';
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

const Dashboard = () => {
    const swapTrackerMediator = useSwapTrackerMediator(); 
    const { account } = useWeb3React();

    const { chainId, web3 } = useWeb3()
    const { user } = useAuthService()
    const [walletTVL,setWalletTVL] = useState(0)
    const [currentBalance,setCurrentBalance] = useState(0)
    const [profitOrLoss,setProfitOrLoss] = useState(0)
    const [openTradeValue,setOpenTradeValue] = useState(0)
    const [openedTrades,setOpenedTrades] = useState([])
    const [tier,setTier] = useState(0)
    const [tradesFinded,setTradesFinded] = useState(false)

    const [value, setValue] = useState(0);
    const currentName = useGetFiatName();
    const currentValues = useGetFiatValues();
    const currentSymbol = useGetFiatSymbol();

    const getTotalPriceVairation = async (coingeckoId) => {
        if(coingeckoId.includes("bittorrent")) coingeckoId = "bittorrent"
        let data = await CoinGeckoClient.coins.fetch(coingeckoId, {});
        let totalProfitOrLossPercetage = 0;
        let percetage = data.data.market_data ? data.data.market_data.price_change_percentage_24h : 0;
        totalProfitOrLossPercetage+= percetage;
        return totalProfitOrLossPercetage;
    }
    
    const getWlltTVL = async ()=>{let wlltTVL = await getWalletTVL(user,web3,chainId); setWalletTVL(wlltTVL)}
    
    const wlltDist = async ()=>{
        let totalProfitOrLossPercetageFinal = 0
        let singleProfitOrLossPercetageNumerical = 0
        let totalProfitOrLossPercetageNumerical = 0
        let totalBalance = 0
        let wlltDist = await walletDistribution(user,walletTVL,web3,chainId);
        const dst = Object.entries(wlltDist).sort(function(first, second){return second[1][0] - first[1][0]});
        await Promise.all(
            dst.map(async (item,i,distribution)=>{
                totalBalance+= distribution[i][1][1]
                const coingeckoId = CoingeckoTokens.default[distribution[i][1][3]?.toLowerCase()];
                let singlePercetage = await getTotalPriceVairation(coingeckoId)
                
                singleProfitOrLossPercetageNumerical = distribution[i][1][1] * singlePercetage/100
                totalProfitOrLossPercetageNumerical += singleProfitOrLossPercetageNumerical
                

            

            })
        )   
       
        totalProfitOrLossPercetageFinal = totalProfitOrLossPercetageNumerical
        setCurrentBalance(Number(totalBalance))
        setProfitOrLoss(Number(totalProfitOrLossPercetageFinal));
        return totalProfitOrLossPercetageFinal;
    }
    

    const getDashData = async() => {
        let dashBoardData = await getDashboardData(user?.address)
        let tradeRow = await getTradeRows(dashBoardData?.openedTrades)
        setOpenTradeValue(Number(dashBoardData?.totalOpenTradesValue).toFixed(2))
    
        tradeRow.length > 0 && setTradesFinded(true)
        setOpenedTrades(tradeRow)
        
    }
      
   


    useEffect(() => { 
        (async() =>{
            let tid;
           if(account){
               tid = await swapTrackerMediator.methods.getTierFee(account).call()
               setTier(Number(tid))

           } 
           if(Number(tid) === 1000){
               return;
           }
           else if(tid && Number(tid) !== 1000){
               await getDashData()
               if(user && chainId){
                   await getWlltTVL();
                   if(walletTVL){
                       let totalProfOrLoss = await wlltDist()
                       await setNewBalanceOverview(user,totalProfOrLoss)
                      
                       
                   }
               }
           }
        })()  
        
        for(let i=0; i<currentValues.length; i++){
            if(currentValues[i]['currency'] == currentName){
              setValue(Number(currentValues[i]['rate']));
            }
        }
    
    }, [user,walletTVL,account,currentName, currentSymbol])

    return (
        <MainContainer>
            <Row>
                <Col md={12} lg={12} xs={12} className="justify-content-start">
                    <h1 className="subheader-title">Dashboard</h1>
                </Col>
            </Row>
            <DashBoardHeader 
                fiatSymbol={currentSymbol}
                fiatValue={value}
                currentBalance={currentBalance}
                profitOrLoss={profitOrLoss}
                openTradeValue={openTradeValue}
            />
            <DashBoardChart tier={tier}/>
            <Row className="pt-3">
                <Col md={12} lg={12} xs={12}>
                    <DashBoardOpenTrades fiatSymbol={currentSymbol} fiatValue={value} openedTrades={openedTrades} tradesFinded={tradesFinded} />
                </Col>
            </Row>
        </MainContainer>
    )
}

export default Dashboard
