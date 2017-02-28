package com.linksa;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;  
import com.rnfs.RNFSPackage;
import com.beefe.picker.PickerViewPackage;
import com.reactnativecomponent.barcode.RCTCapturePackage;
import cn.reactnative.httpcache.HttpCachePackage;
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
		  new RNDeviceInfo(),
		  new ImagePickerPackage(),
		  new PickerViewPackage(),
		  new BaiduMapPackage(getApplicationContext()),
		  new RNFSPackage(),
		  new HttpCachePackage(),
		  new RCTCapturePackage(),
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
