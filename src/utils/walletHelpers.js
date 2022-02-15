import BigNumber from 'bignumber.js';
import {getBep20Contract} from 'utils/contractHelpers'
import {getBusdOut} from 'utils/getBusdOut' 
import {BNB} from 'config'

const getTokenBalance = async (tokenContract,user) => {
    
    let decimals = await tokenContract.methods.decimals().call();
    let balance = await tokenContract.methods.balanceOf(user.address).call({from:user.address})
    let balanceFormatted = new BigNumber(balance).shiftedBy(-1*parseInt(decimals)).toNumber().toFixed(parseInt(decimals));
    
    if(Number(balanceFormatted) > 0){
        let price = await getBusdOut(tokenContract._address,balanceFormatted.toString(),parseInt(decimals))   
        return new BigNumber(price).shiftedBy(-1*18).toNumber().toFixed(18);
    } else return balanceFormatted
}

const getFlatBalance = async (tokenContract,user) => {
    let decimals = await tokenContract.methods.decimals().call()
    let flatBalance = await tokenContract.methods.balanceOf(user.address).call({from:user.address})
    return new BigNumber(flatBalance).shiftedBy(-1*parseInt(decimals)).toNumber().toFixed(decimals)
}

export const getBNBBalance = async (web3,user) => {
    let bnbBal = await web3.eth.getBalance(user?.address);
    // console.log(bnbBal)
   let balanceFormatted =  new BigNumber(bnbBal).shiftedBy(-1*18).toNumber().toFixed(18)
   let price = await getBusdOut(BNB.address,balanceFormatted,18)
   return new BigNumber(price).shiftedBy(-1*18).toNumber().toFixed(18);
}

export const getBNBFlatBalance = async (web3,user) => {
    let bnbBal = await web3.eth.getBalance(user?.address);
    let balanceFormatted =  new BigNumber(bnbBal).shiftedBy(-1*18).toNumber().toFixed(18)
    return Number(balanceFormatted)
}

export const walletDistribution = async (user,walletTVL,web3,chainId) => {
    let balance = {}
    await Promise.all(
        
        user?.tokenList[chainId].map(async (tokenAddress)=>{
            let tokenContract = getBep20Contract(String(tokenAddress).toLocaleLowerCase(),web3)
            let singleBalance = await getFlatBalance(tokenContract,user)   
            let singleTokenBusdBalance = await getTokenBalance(tokenContract,user)
            let bnbBusdBalance = await getBNBBalance(web3,user);
            let bnbFlatBalance = await getBNBFlatBalance(web3,user)
            let symbol = await tokenContract.methods.symbol().call()
            if(singleBalance > 0.000001 ){
                balance[tokenAddress] = [singleTokenBusdBalance / walletTVL *100,parseFloat(singleTokenBusdBalance),parseFloat(singleBalance), symbol];
                balance["bnb"] = [bnbBusdBalance / walletTVL*100,parseFloat(bnbBusdBalance),parseFloat(bnbFlatBalance),BNB.symbol]
            }
            
        })
    )
    return balance;
}

export const getWalletTVL = async (user,web3,chainId) => {
    let tvl = 0;
    let bnbBalance = await getBNBBalance(web3,user)
    // console.log("vediamo ", bnbBalance)
    await Promise.all(
        user?.tokenList[chainId].map(async (tokenAddress)=>{
            let tokenContract = getBep20Contract(String(tokenAddress).toLocaleLowerCase(),web3)
            let bal = await getTokenBalance(tokenContract,user)
            // console.log("sono nel for", bnbBalance)
            if(bal>0){
                tvl += Number(bal);
            }
        })
    )
    tvl += Number(bnbBalance);
    return tvl;
}


export const getBalanceOverview = async (user,web3,chainId) => {
    let totalBalance= 0;
    let walletTVL = await getWalletTVL(user,web3,chainId)
    let walletDist = await walletDistribution(user,walletTVL,web3,chainId)
    const dst = Object.entries(walletDist).sort(function(first, second){return second[1][0] - first[1][0]});
        for (let i=0; i<dst.length; i++) {
            totalBalance+= dst[i][1][1]
        }
    
    return {[new Date()]:Number(totalBalance).toFixed(2)}
        
}

export const getTier = async (swapTrackerMediator,navigation,account, isMain) => {
    if(account){
        let tid = await swapTrackerMediator.methods.getTierFee(account).call()
        if(Number(tid) === 1000 && !isMain){
            console.log("ma entro? ", isMain)
            navigation('/tiers')
        }
        return Number(tid)
    }
}
