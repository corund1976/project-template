import Web3 from 'web3';

const CHAIN_ID = import.meta.env.VITE_CHAIN_ID
const RPC_URL = import.meta.env.VITE_RPC_URL

// Chosen wallet provider given by the dialog window
const provider = new Web3.providers.HttpProvider(RPC_URL)
// Get a Web3 instance for the wallet
const web3 = new Web3(provider);

const setNetwork = async () => {
  if (window.ethereum.networkVersion !== CHAIN_ID) {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: web3.utils.toHex(CHAIN_ID) }]
      });
    } catch (err) {
      // This error code indicates that the chain has not been added to MetaMask
      if (err.code === 4902) {
        const params =
        {
          chainName: CHAIN_ID === 56 ? 'Binance Smart Chain BEP-20' : 'Smart Chain – Testnet',
          chainId: web3.utils.toHex(CHAIN_ID),
          nativeCurrency: { name: 'BNB', decimals: 18, symbol: 'BNB' },
          rpcUrls: ['https://bsc-dataseed.binance.org/']
        }

        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [params]
        });
      }
    }
  }
}

export default setNetwork