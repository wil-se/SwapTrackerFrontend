import BigNumber from 'bignumber.js';
import {getBep20Contract} from 'utils/contractHelpers'
import {getBusdOut, getRawBusdOut} from 'utils/getBusdOut' 
import {BNB} from 'config'
import balanceOfABI from 'config/abi/balanceOf.json';
import {raw_tokens} from 'config/constants/tokens';

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

const rawFormat = (tokens) => {
    let addresses = new Set();
    let symbols = [];
    let decimals = [];
    tokens.forEach( (t) => {
        if(!addresses.has(t['address'])){
            addresses.add(t['address']);
            symbols.push(t['symbol']);
            decimals.push(t['decimals']);
        }
    });
    return [Array.from(addresses), symbols, decimals];
}

const parseUserTokenList = async (result, tokens, web3) => {
    
    let keys = Array.from(result.map((it) => it.address.toLocaleLowerCase()));
    for(let i = 0; i< tokens.length; i++){
        if(keys.includes(tokens[i])) continue;
        let contract = getBep20Contract(tokens[i], web3);
        let s = await contract.methods.symbol().call();
        let d = await contract.methods.decimals().call();
        result.push({
            symbol: s,
            decimals: d,
            address: tokens[i]
        });
    }
    
    return result;
}

const scan = async (user, chainId, web3) => {

    let token_list = raw_tokens[chainId];
    token_list = Array.from(await parseUserTokenList(token_list, user?.tokenList[chainId], web3));

    let balanceOfs = [];
    let getRawBusdOuts = [];
    let [tokens, symbols, decimals] = rawFormat(token_list);

    for(let address of tokens){
        let contract = new web3.eth.Contract(balanceOfABI, address);
        balanceOfs.push(contract.methods.balanceOf(user.address).call());
    }

    let balances = await Promise.all(balanceOfs);
    let result = [];
    balances.forEach((balance, i) => {
        if(balance != '0'){
            result.push({
                balance: new BigNumber(balance),
                parsedBalance: new BigNumber(balance).shiftedBy(-1*decimals[i]),
                symbol: symbols[i],
                decimals: decimals[i],
                asBusd: 0,
                address: tokens[i]
            });
        }
    });

    result.forEach((item, i) => {
        getRawBusdOuts.push(getRawBusdOut(item.address, item.balance.toString()));
    });

    let busd_balances = await Promise.all(getRawBusdOuts);

    result.forEach((item, i) => {
        item.asBusd = new BigNumber(busd_balances[i]);
    });

    let gas_balance = await web3.eth.getBalance(user.address);
    let gas_as_busd = new BigNumber(await getBNBBalance(web3, user)).shiftedBy(18);
    result.push({
        balance: new BigNumber(gas_balance),
        parsedBalance: new BigNumber(gas_balance).shiftedBy(-18),
        symbol: 'BNB',
        decimals: 18,
        asBusd: gas_as_busd,
        address: ""
    });
    return result;
}

export const getBNBBalance = async (web3, user) => {
    let bnbBal = await web3.eth.getBalance(user?.address);
    let balanceFormatted =  new BigNumber(bnbBal).shiftedBy(-1*18).toNumber().toFixed(18)
    let price = await getBusdOut(BNB.address,balanceFormatted,18)
    return new BigNumber(price).shiftedBy(-1*18).toNumber().toFixed(18);
}

export const getBNBFlatBalance = async (web3,user) => {
    let bnbBal = await web3.eth.getBalance(user?.address);
    let balanceFormatted =  new BigNumber(bnbBal).shiftedBy(-1*18).toNumber().toFixed(18)
    return Number(balanceFormatted)
}

export const walletDistribution = async (user, walletTVL, web3, chainId) => {

    let balance = {}

    let scan_results = await scan(user, chainId, web3);

    await Promise.all(
        
        scan_results.map(async (scanResultItem)=>{
            if(scanResultItem.balance != '0'){
                balance[scanResultItem.address] = [
                    new BigNumber(scanResultItem.asBusd).shiftedBy(-18).dividedBy(walletTVL).multipliedBy(100).toNumber(),
                    scanResultItem.asBusd,
                    scanResultItem.balance,
                    scanResultItem.symbol,
                    scanResultItem.address,
                    Number(scanResultItem.decimals)
                ];
            }
        })
    );
    return balance;
}

export const getWalletTVL = async (user,web3,chainId) => {
    let tvl = 0;
    let scan_results = await scan(user, chainId, web3);

    await Promise.all(
        scan_results.map(async (scanResultItem)=>{
            if(scanResultItem.balance != '0')
                tvl += new BigNumber(scanResultItem.asBusd).shiftedBy(-18).toNumber();
        })
    )

    return tvl;
}

export const getBalanceOverview = async (user,web3,chainId) => {
    let totalBalance= 0;
    let walletTVL = await getWalletTVL(user,web3,chainId)
    let walletDist = await walletDistribution(user,walletTVL,web3,chainId)

    Object.entries(walletDist).sort(function(first, second){
        return second[1][0] - first[1][0]
    }).forEach((el) => {
        totalBalance += el[1][1]
    });
    
    return {[new Date()]:Number(totalBalance).toFixed(4)}
        
}

export const getTier = async (swapTrackerMediator,navigation,account, isMain) => {
    if(account){
        let tid = await swapTrackerMediator.methods.getTierFee(account).call()
        if(Number(tid) === 1000 && !isMain){
            navigation('/tiers')
        }
        return Number(tid)
    }
}
