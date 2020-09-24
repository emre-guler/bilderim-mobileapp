package com.bilderimapp;
// Added for React Native Splash Screen
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;
import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */

  // Added for React Native Splash Screen
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this);
  }
  @Override
  protected String getMainComponentName() {
    return "BilderimApp";
  }
}
