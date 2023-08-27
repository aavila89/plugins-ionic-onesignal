import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.onesignal.cap',
  appName: 'base',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
