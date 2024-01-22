import { createContext } from 'react';
import { AuthStore } from './AuthStore';
import { ProfileStore } from './ProfileStore';
import { WalletStore } from './WalletStore';

interface StoreContextInterface {
  authStore: AuthStore;
  profileStore: ProfileStore;
  walletStore: WalletStore;
}

const authStore = new AuthStore();
const profileStore = new ProfileStore();
const walletStore = new WalletStore();

export const StoreContext = createContext<StoreContextInterface>({
  authStore,
  profileStore,
  walletStore,
});

export const SetAllAccessTokens = (token: string) => {
  authStore.SetAccessToken(token);
  profileStore.SetAccessToken(token);
  walletStore.SetAccessToken(token);
};
