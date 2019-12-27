import {RefObject} from 'react';

interface IWebview {
  goToPlace(ref: RefObject<any>, x: number, y: number): void;
  myLocation(ref: RefObject<any>, x: number, y: number): void;
}

const webview: IWebview = {
  goToPlace(ref, x, y) {
    ref.current?.postMessage(
      JSON.stringify({
        type: 'MoveMapCenter',
        data: {
          lng: x,
          lat: y,
        },
      }),
    );
  },
  myLocation(ref, x, y) {
    ref.current?.postMessage(
      JSON.stringify({
        type: 'myLocation',
        data: {
          lng: x,
          lat: y,
        },
      }),
    );
  },
};

export default webview;
