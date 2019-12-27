interface IWebview {
  goTo(page: string): void;
  goToData(page: string, data: any): void;
  place(id: string): void;
  data(type: string, data: string): void;
}

const webview: IWebview = {
  goTo(page) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type: "page",
        page: page,
        data: ""
      })
    );
  },
  goToData(page, data) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type: "page",
        page: page,
        data: data
      })
    );
  },
  place(id) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type: "page",
        page: "Place",
        data: id
      })
    );
  },
  data(type, data) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type: type,
        data: data
      })
    );
  }
};

export default webview;
