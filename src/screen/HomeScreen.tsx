import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import {WebViewNativeEvent} from 'react-native-webview/lib/WebViewTypes';
import {PushContext} from '../App';

function HomeScreen(props: any) {
  const webViewRef = useRef<WebView>(null);

  const {displayUrl} = useContext(PushContext);

  // const userAgent = Platform.select({ios: 'FITAMIN_IOS', android: 'FITAMIN_ANDROID'});

  const onNavigationStateChange = (state: WebViewNativeEvent) => {
    // console.log(state.url);
    //setGoUrl(state.url);
  };
  useEffect(() => {
    //
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <WebView
          style={{width: '100%'}}
          onNavigationStateChange={onNavigationStateChange}
          allowFileAccess={true}
          scalesPageToFit={true}
          source={{
            uri: displayUrl === '' ? 'https://blog.naver.com/symj2001' : displayUrl,
            // headers: {'User-Agent': userAgent},
          }}
          ref={webViewRef}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    //height: Platform.select({ios: height + 10, android: height}),
    //justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
