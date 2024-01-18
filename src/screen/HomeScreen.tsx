import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, Platform, StyleSheet, Text, View} from 'react-native';
import {IconButton, PaperProvider} from 'react-native-paper';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import {WebViewNativeEvent} from 'react-native-webview/lib/WebViewTypes';
const {width, height} = Dimensions.get('window');

function HomeScreen(props: any) {
  const webViewRef = useRef<WebView>(null);
  const [goUrl, setGoUrl] = useState(props.url);

  // const userAgent = Platform.select({ios: 'FITAMIN_IOS', android: 'FITAMIN_ANDROID'});

  const onNavigationStateChange = (state: WebViewNativeEvent) => {
    // console.log(state.url);
    //setGoUrl(state.url);
  };
  useEffect(() => {
    console.log(`Home UseEffect ${goUrl}`);
  }, [goUrl]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <WebView
          style={{width: '100%'}}
          onNavigationStateChange={onNavigationStateChange}
          allowFileAccess={true}
          scalesPageToFit={true}
          source={{
            uri: goUrl === undefined ? 'https://blog.naver.com/symj2001' : goUrl,
            // headers: {'User-Agent': userAgent},
          }}
          ref={webViewRef}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

HomeScreen.defaultProps = {
  url: 'https://blog.naver.com/symj2001',
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    //height: Platform.select({ios: height + 10, android: height}),
    //justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
