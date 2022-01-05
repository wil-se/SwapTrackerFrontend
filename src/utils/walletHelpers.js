import BigNumber from 'bignumber.js';
import {getBep20Contract} from 'utils/contractHelpers'
import {getBusdOut} from 'utils/getBusdOut' 


const getTokenBalance = async (tokenContract,user) => {
    let decimals =  await tokenContract.methods.decimals().call()
    let balance = await tokenContract.methods.balanceOf(user.address).call({from:user.address})
    let balanceFormatted = new BigNumber(balance).shiftedBy(-1*parseInt(decimals)).toNumber().toFixed(parseInt(decimals));
    let price = await getBusdOut(tokenContract._address,balanceFormatted,parseInt(decimals))
    return new BigNumber(price).shiftedBy(-1*18).toNumber().toFixed(decimals);
}

const getFlatBalance = async (tokenContract,user) => {
    let decimals = await tokenContract.methods.decimals().call()
    let flatBalance = await tokenContract.methods.balanceOf(user.address).call({from:user.address})
    return new BigNumber(flatBalance).shiftedBy(-1*parseInt(decimals)).toNumber().toFixed(decimals)
}

export const walletDistribution = async (user,walletTVL,web3,chainId) => {
    let balance = {}
    await Promise.all(
        
        user.tokenList[chainId].map(async (tokenAddress)=>{
            let tokenContract = getBep20Contract(String(tokenAddress).toLocaleLowerCase(),web3)
            let singleBalance = await getFlatBalance(tokenContract,user)   
            let singleTokenBusdBalance = await getTokenBalance(tokenContract,user)
            
            balance[tokenAddress] = [singleTokenBusdBalance / walletTVL *100,parseFloat(singleTokenBusdBalance),parseFloat(singleBalance)];
            
        })
    )
    console.log(balance)
    return balance;
}

export const getWalletTVL = async (user,web3,chainId) => {
    let tvl = 0;
    await Promise.all(
        user.tokenList[chainId].map(async (tokenAddress)=>{
            let tokenContract = getBep20Contract(String(tokenAddress).toLocaleLowerCase(),web3)
            let bal = await getTokenBalance(tokenContract,user)
            tvl += parseFloat(bal);
        })

    ) 
    return tvl;
}
