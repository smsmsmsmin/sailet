import {  } from 'express';

declare global {
  interface Window {
    kakao: any;
    ReactNativeWebView: any;
  }
}