import '../styles/globals.css'
import Navbar from '../components/Navbar'
import '@rainbow-me/rainbowkit/styles.css';
import {
  midnightTheme,
  getDefaultWallets,
  RainbowKitProvider,
  ConnectButton,
} from '@rainbow-me/rainbowkit';
import {chain, defaultChains, configureChains, createClient, WagmiConfig, } from 'wagmi';
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
// import Footer from '../components/Footer';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';



const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.polygonMumbai],
  [
    alchemyProvider({apiKey: process.env.ALCHEMY_ID}), 
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Polygon Hackathon Project',
  chains
});


const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

function MyApp({ Component, pageProps }) {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider theme={midnightTheme()} chains={chains}>
          <Navbar/>
          <Component {...pageProps} />
          {/* <Footer/> */}
        </RainbowKitProvider>
      </WagmiConfig>
  </>
  )
}

export default MyApp
