package com.linksa;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.keyee.datetime.RCTDateTimePickerPackage;
import com.keyee.datetime.RCTDateTimePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.keyee.datetime.RCTDateTimePickerPackage; 
import com.cboy.rn.splashscreen.SplashScreen;
import com.rnfs.RNFSPackage;
import com.reactnativecomponent.barcode.RCTCapturePackage;
import com.beefe.picker.PickerViewPackage;
import cn.reactnative.httpcache.HttpCachePackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import org.lovebing.reactnative.baidumap.BaiduMapPackage;
import com.imagepicker.ImagePickerPackage;
public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "linksa";
    }
	
	@Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this,true);
        super.onCreate(savedInstanceState);
    }
}
