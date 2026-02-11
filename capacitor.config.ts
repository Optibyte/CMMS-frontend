import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.sustainabyte.fixbtye',
  appName: 'FixByte',
  webDir: 'dist',
  server: {
    url: 'http://192.168.1.7:5173',
    androidScheme: "http",
    cleartext: true
  }
};

export default config;
