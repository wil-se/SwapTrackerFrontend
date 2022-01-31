import React,{useState,useEffect} from 'react'
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

const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

const Dashboard = () => {

    const { chainId, web3 } = useWeb3()
    const { user } = useAuthService()
    const [walletTVL,setWalletTVL] = useState(0)
    const [currentBalance,setCurrentBalance] = useState(0)
    const [profitOrLoss,setProfitOrLoss] = useState(0)
    const [openTradeValue,setOpenTradeValue] = useState(0)
    const [openedTrades,setOpenedTrades] = useState([])
    
    const getTotalPriceVairation = async (coingeckoId) => {
        let data = await CoinGeckoClient.coins.fetch(coingeckoId, {});
        let totalProfitOrLossPercetage = 0;
        let percetage = data.data.market_data ? data.data.market_data.price_change_percentage_24h : 0;
        
        totalProfitOrLossPercetage+= percetage;
        return totalProfitOrLossPercetage;
    }
    
    const getWlltTVL = async ()=>{let wlltTVL = await getWalletTVL(user,web3,chainId); setWalletTVL(wlltTVL)}
    
    const wlltDist = async ()=>{
        let totalProfitOrLossPercetage = 0
        let totalBalance = 0
        let wlltDist = await walletDistribution(user,walletTVL,web3,chainId);
        const dst = Object.entries(wlltDist).sort(function(first, second){return second[1][0] - first[1][0]});
        for (let i=0; i<dst.length; i++) {
            totalBalance+= dst[i][1][1]
            console.log("vediamo ", totalBalance)
            const coingeckoId = CoingeckoTokens.default[dst[i][1][3]?.toLowerCase()];
            totalProfitOrLossPercetage = totalProfitOrLossPercetage += await getTotalPriceVairation(coingeckoId)
            
        }
        
        setCurrentBalance(Number(totalBalance))
        setProfitOrLoss((totalBalance*totalProfitOrLossPercetage)/100);
        return (totalBalance*totalProfitOrLossPercetage)/100;
    }
    

    const getDashData = async() => {
        let dashBoardData = await getDashboardData(user?.address)
        let tradeRow = await getTradeRows(dashBoardData?.openedTrades)
        console.log("veidmao ", tradeRow)
        setOpenTradeValue(Number(dashBoardData?.totalOpenTradesValue).toFixed(2))
        setOpenedTrades(tradeRow)
        
    }
      

    useEffect(() => { 
        (async() =>{
            await getDashData()
            if(user && chainId){
                await getWlltTVL();
                if(walletTVL){
                    let totalProfOrLoss = await wlltDist()
                    await setNewBalanceOverview(user,totalProfOrLoss)
                   
                    
                }
            }
        })()  
        
    
    }, [user,walletTVL])

    return (
        <MainContainer>
            <Row><h1 className="subheader-title">Dashboard</h1></Row>
            <Row>
                <DashBoardHeader 
                    currentBalance={currentBalance}
                    profitOrLoss={profitOrLoss}
                    openTradeValue={openTradeValue}
                />
            </Row>
            <Row>
                <DashBoardChart/>
            </Row>
            <Row>
                <DashBoardOpenTrades openedTrades={openedTrades}/>
            </Row>
        </MainContainer>
    )
}

export default Dashboard
