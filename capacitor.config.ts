import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.sustainabyte.fixbtye',
  appName: 'FixByte',
  webDir: 'dist',
  server: {
    androidScheme: "http",
    cleartext: true
  }
};

export default config;
