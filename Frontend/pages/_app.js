import '../styles/globals.css'
import Navbar from '../components/Navbar'
// import dynamic from 'next/dynamic';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, midnightTheme, } from '@rainbow-me/rainbowkit';
import {chain, configureChains, createClient, WagmiConfig, } from 'wagmi';
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import Footer from '../components/Footer';

// const PhaserApp = dynamic(() => import("../pages/P2E/Dino"), {ssr:false})

const mumbaiChain = {
  id: 80001,
  name: "Mumbai Testnet",
  network: "mumbai",
  nativeCurrency: {
    decimals: 18,
    name: "Matic",
    symbol: "MATIC",
  },
  rpcUrls: {
    default: "https://rpc-mumbai.maticvigil.com",
  },
  blockExplorers: {
    default: {
      name: "PolygonScan",
      url: "https://polygonscan.com/",
    },
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [mumbaiChain],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id !== mumbaiChain.id) return null;
        return { http: chain.rpcUrls.default };
      },
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Polygon Hackathon Project',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

function MyApp({ Component, pageProps }) {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider theme={midnightTheme()} chains={chains}>
          <Navbar/>
          {/* <PhaserApp/> */}
          <Component {...pageProps} />
          <Footer/>
        </RainbowKitProvider>
      </WagmiConfig>
  </>
  )
}

export default MyApp
