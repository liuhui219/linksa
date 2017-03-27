package com.linksa;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.gcrabtree.rctsocketio.SocketIoPackage;
import cn.reactnative.httpcache.HttpCachePackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.reactlibrary.RNReactNativeDocViewerPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;  
import com.rnfs.RNFSPackage; 
import com.filepicker.FilePickerPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage; 
import com.beefe.picker.PickerViewPackage;
import com.reactnativecomponent.barcode.RCTCapturePackage; 
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.cboy.rn.splashscreen.SplashScreenReactPackage;
import org.lovebing.reactnative.baidumap.BaiduMapPackage;
import com.imagepicker.ImagePickerPackage;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new SocketIoPackage(), 
          new RNFetchBlobPackage(), 
		  new RNDeviceInfo(),
		  new ImagePickerPackage(),
		  new PickerViewPackage(),
		  new FilePickerPackage(),
		  new RNReactNativeDocViewerPackage(),
		  new BaiduMapPackage(getApplicationContext()),
		  new RNFSPackage(),
		  new HttpCachePackage(), 
		  new RCTCapturePackage(),
		  new ReactNativePushNotificationPackage(),
		  new SplashScreenReactPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
