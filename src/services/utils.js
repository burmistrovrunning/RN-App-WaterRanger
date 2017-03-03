import { NetInfo } from 'react-native';

export const isNetworkOnline = () => NetInfo.isConnected.fetch();
