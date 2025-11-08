import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { scrollSepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

// Configuração da chain Scroll Sepolia
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [scrollSepolia],
  [publicProvider()]
);

// Configuração do wagmi
const { connectors } = getDefaultWallets({
  appName: 'DePIN Frontend Tester',
  projectId: '7ba9c1a7807dfa408beda82579856970', // IMPORTANTE: Substitua pelo seu ID do WalletConnect
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
