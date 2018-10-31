package com.a8jielicai.whereto;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle; // here
import android.view.KeyEvent;
import android.widget.Toast;

import com.a8jielicai.whereto.utils.CommonUtil;
import com.a8jielicai.whereto.utils.DownloadManagerUtil;
import com.a8jielicai.whereto.x5webview.X5WebView;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;

import cn.jpush.reactnativejpush.JPushPackage;

import com.facebook.soloader.SoLoader;
import com.a8jielicai.whereto.invokenative.RNUMConfigure;
import com.a8jielicai.whereto.invokenative.ShareModule;
import com.a8jielicai.whereto.utils.UMengUtil;
import com.tencent.smtt.sdk.QbSdk;
import com.tencent.smtt.sdk.WebView;
import com.umeng.analytics.MobclickAgent;
import com.umeng.commonsdk.UMConfigure;
import com.umeng.socialize.UMShareAPI;
// react-native-splash-screen >= 0.3.1
import org.devio.rn.splashscreen.SplashScreen; // here

public class MainActivity extends ReactActivity {

  public X5WebView x5WebView;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this);  // here
    SoLoader.init(this, false);
    rnUmConfigInit(this, "5b7e5b30f43e4836c3000021", "ANDROID_MARKET", UMConfigure.DEVICE_TYPE_PHONE, null);
    super.onCreate(savedInstanceState);
    ShareModule.initSocialSDK(this);
    initX5WebKit();
//    initDownLoadManager();
  }

  /**
   * Returns the name of the main component registered from JavaScript.
   * This is used to schedule rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "RN_qunalicai";
  }

  /**
   * 初始化友盟配置
   *
   * @param context
   * @param Appkey
   * @param channel
   * @param AppKind
   * @param secret  如果没有使用push，可以为空
   */
  public void rnUmConfigInit(Context context, String Appkey, String channel, int AppKind, String secret) {
    RNUMConfigure.init(context, Appkey, channel, AppKind, secret);
  }

  public void onResume() {
    super.onResume();
    MobclickAgent.onResume(this);
  }

  public void onPause() {
    super.onPause();
    MobclickAgent.onPause(this);
  }

  @Override
  public void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    UMShareAPI.get(this).onActivityResult(requestCode, resultCode, data);
  }

  public void initX5WebKit() {
    QbSdk.setDownloadWithoutWifi(true);
    Toast.makeText(getApplicationContext(), "0022200~", Toast.LENGTH_LONG).show();
    QbSdk.PreInitCallback callback = new QbSdk.PreInitCallback() {
      @Override
      public void onCoreInitFinished() {
      }

      @Override
      public void onViewInitFinished(boolean b) {
        if (b) {
//          Toast.makeText(getApplicationContext(), "初始化成功~", Toast.LENGTH_LONG).show();
        } else {
          Toast.makeText(getApplicationContext(), "初始化失败~", Toast.LENGTH_LONG).show();
        }
      }
    };
    QbSdk.initX5Environment(getApplicationContext(), callback);
  }

  @Override
  public boolean onKeyDown(int keyCode, KeyEvent event) {
    x5WebView = X5WebView.getX5WebViewInstance(this);
    if (keyCode == KeyEvent.KEYCODE_BACK) {
      if (x5WebView != null && x5WebView.canGoBack() && !CommonUtil.isNavigateNativePage) {
        x5WebView.goBack();
        if (Integer.parseInt(android.os.Build.VERSION.SDK) >= 16)
          changGoForwardButton(x5WebView);
        return true;
      } else
        return super.onKeyDown(keyCode, event);
    }
    return super.onKeyDown(keyCode, event);
  }

  private void changGoForwardButton(WebView webView) {
  }

  @Override
  protected void onDestroy() {
    x5WebView = X5WebView.getX5WebViewInstance(this);
    if (x5WebView != null) {
      x5WebView.destroy();
    }
    super.onDestroy();
  }

}
