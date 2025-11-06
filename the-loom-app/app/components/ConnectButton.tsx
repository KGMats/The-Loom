'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { AuthSyncer } from './AuthWallet';

export const CustomConnectButton = () => {
  return <div>
    <AuthSyncer />
    <ConnectButton />
  </div>;
};