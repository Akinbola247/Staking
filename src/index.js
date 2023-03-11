import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import '@rainbow-me/rainbowkit/styles.css';
import {getDefaultWallets, RainbowKitProvider,} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, goerli } from 'wagmi/chains';
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";


const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum, goerli],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: `https://eth-goerli.g.alchemy.com/v2/vg66tZzQ6lODNJlIeoHvYYhOs3CerlTn`,
        WebSocket: `wss://eth-goerli.g.alchemy.com/v2/vg66tZzQ6lODNJlIeoHvYYhOs3CerlTn`,
      }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <WagmiConfig client={wagmiClient}>
  <RainbowKitProvider chains={chains}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </RainbowKitProvider>
</WagmiConfig>
);


   