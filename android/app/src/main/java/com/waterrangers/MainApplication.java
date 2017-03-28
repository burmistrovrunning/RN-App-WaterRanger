package com.waterrangers;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.cboy.rn.splashscreen.SplashScreenReactPackage;
import com.cboy.rn.splashscreen.SplashScreenReactPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.mapbox.reactnativemapboxgl.ReactNativeMapboxGLPackage;
import com.imagepicker.ImagePickerPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.horcrux.svg.SvgPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.showlocationservicesdialogbox.LocationServicesDialogBoxPackage;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ImageResizerPackage(),
            new SplashScreenReactPackage(),
            new VectorIconsPackage(),
            new ReactNativeMapboxGLPackage(),
            new ImagePickerPackage(),
            new RCTCameraPackage(),
            new SvgPackage(),
            new FBSDKPackage(mCallbackManager),
            new LocationServicesDialogBoxPackage()
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
    FacebookSdk.sdkInitialize(getApplicationContext());
    // If you want to use AppEventsLogger to log events.
    AppEventsLogger.activateApp(this);
    SoLoader.init(this, /* native exopackage */ false);

  }
}
