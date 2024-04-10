import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'snake',
  webDir: 'dist/snake/browser',
  server: {
    androidScheme: 'https'
  }
};

export default config;
