package com.waterrangers;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.cboy.rn.splashscreen.SplashScreen;
import android.app.Activity;
import android.os.Handler;

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
      SplashScreen.show(this);  // here
      final Activity activity = this;
      final Handler handler = new Handler();
      handler.postDelayed(new Runnable() {
        @Override
        public void run() {
          SplashScreen.hide(activity);
        }
      }, 3000);
      super.onCreate(savedInstanceState);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
      return "WaterRangers";
    }

}
