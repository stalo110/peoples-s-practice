/// <reference types="react-scripts" />
// Add this line to suppress uncaught runtime errors overlay
declare module 'react-scripts' {
    interface ProcessEnv {
      BROWSER: 'none' | string;
    }
  }
