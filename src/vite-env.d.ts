/// <reference types="vite/client" />

declare global {
  interface Window {
    handleBackFromEventDetails?: () => void;
  }
}
