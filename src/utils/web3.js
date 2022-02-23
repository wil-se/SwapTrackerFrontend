import Web3 from 'web3';
import getRpcUrl from 'utils/getRpcUrl';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
const RPC_URL = getRpcUrl();
const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 });
const web3NoAccount = new Web3(httpProvider);

const getWeb3NoAccount = () => web3NoAccount;

const getWeb3WalletConnect = () => {
    const provider = new WalletConnect({   
        bridge: "https://bridge.walletconnect.org",   
        qrcodeModal: QRCodeModal,
        rpc:{
            56:RPC_URL
        }
    })
    const providerWalletConnect = new Web3(provider)
    return providerWalletConnect;
}
export { getWeb3NoAccount,getWeb3WalletConnect };
export default web3NoAccount;
