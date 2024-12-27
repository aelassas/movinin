import React, { useRef, useState } from 'react'
import { Dimensions } from 'react-native'
import { WebView, WebViewMessageEvent, WebViewProps } from 'react-native-webview'

interface AutoHeightWebViewProps extends WebViewProps {
  width: number
  defaultHeight: number
  autoHeight: boolean
}

// const injectedScript = `window.ReactNativeWebView.postMessage(
//   Math.max(document.documentElement.clientHeight, document.documentElement.scrollHeight, document.body.clientHeight, document.body.scrollHeight)
// );`

const injectedScript = `
  setTimeout(function() {
    window.ReactNativeWebView.postMessage(
      Math.max(document.documentElement.clientHeight, document.documentElement.scrollHeight, document.body.clientHeight, document.body.scrollHeight)
    );
  }, 300);
  true; // note: this is required, or you'll sometimes get silent failures
`

const AutoHeightWebView = (props: AutoHeightWebViewProps) => {
  const [webViewHeight, setWebViewHeight] = useState(props.defaultHeight)

  const webview = useRef(null)

  const _w = props.width || Dimensions.get('window').width
  const _h = props.autoHeight ? webViewHeight : props.defaultHeight

  const _onMessage = (e: WebViewMessageEvent) => {
    setWebViewHeight(Number.parseInt(e.nativeEvent.data, 10))
  }
  return (
    <WebView
      ref={webview}
      injectedJavaScript={injectedScript}
      scrollEnabled={props.scrollEnabled || false}
      onMessage={_onMessage}
      javaScriptEnabled={true}
      automaticallyAdjustContentInsets={true}
      style={[{ width: _w }, props.style, { height: _h }]}
      {...props}
    />
  )
}

export default AutoHeightWebView
