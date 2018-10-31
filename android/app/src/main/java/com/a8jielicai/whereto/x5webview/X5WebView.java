package com.a8jielicai.whereto.x5webview;

import android.annotation.SuppressLint;
import android.content.Context;
import android.util.AttributeSet;
import android.view.KeyEvent;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.a8jielicai.whereto.utils.CommonUtil;
import com.a8jielicai.whereto.utils.CustomDownLoad;
import com.a8jielicai.whereto.utils.DownloadManagerUtil;
import com.a8jielicai.whereto.utils.StringUtil;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.tencent.smtt.sdk.WebChromeClient;
import com.tencent.smtt.sdk.WebSettings;
import com.tencent.smtt.sdk.WebView;
import com.tencent.smtt.sdk.WebViewClient;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.logging.Handler;

/**
 * author : Zwq
 * e-mail : 1098621287qq.com
 * date   : 2018/10/1210:54
 * desc   :
 * version: 1.0
 */
public class X5WebView extends WebView {

  public static X5WebView x5WebView = null;
  public ProgressBar mProgressBar;

  private WebViewClient webViewClient = new WebViewClient() {
    @Override
    public boolean shouldOverrideUrlLoading(WebView webView, String s) {
      if(StringUtil.hasProtocolCharacter(s)) {
        String url = StringUtil.getMethodFromUrl(s);
        Toast.makeText(getContext(), s, Toast.LENGTH_SHORT).show();
        onReceiveNativeEvent(url);
        x5WebView.canGoBack();
        CommonUtil.isNavigateNativePage = true;
      } else {
        webView.loadUrl(s);
        CommonUtil.isNavigateNativePage = false;
      }
      return true;
    }

    @Override
    public void onPageFinished(WebView webView, String s) {
      super.onPageFinished(webView, s);
      final JSONObject jsonObject = new JSONObject();
      try {
        jsonObject.put("userid", getUserId());
        jsonObject.put("CFBundleVersion", 1);
        jsonObject.put("SystemType", "Android");
        jsonObject.put("urlParams", createUrlParams());
        // 调用rn前端代码 1.原生调用webviewjs代码通过loadUrl 2.web前端代码调用原生的代码则通过 addJavascriptInterface 注册接口对象 然后添加注解JavascriptInterface给对象增加方法
        x5WebView.loadUrl("javascript:nativeObjcPageOnLoad('" + jsonObject.toString() + "')");
      } catch (JSONException e) {
        e.printStackTrace();
      }
    }
  };

  public Number getUserId() {
    return CommonUtil.userId;
  }

  public String createUrlParams() {
    String urlParams = "";
    int index = x5WebView.getUrl().indexOf("?");
    if(index != -1) {
      urlParams = x5WebView.getUrl().substring(index + 1);
    }
    return urlParams;
  }

  public void destoryX5Webview() {
    if(x5WebView != null) {
      x5WebView.destroy();
    }
  }

  public void onReceiveNativeEvent(String url) {
    WritableMap writableMap = Arguments.createMap();
    writableMap.putString("url", url);
    ReactContext reactContext = (ReactContext) getContext();
    reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
      getId(),
      "topChange",
      writableMap
    );
  }

  public void onReceiveNativeProgress(String speed) {
    WritableMap writableMap = Arguments.createMap();
    writableMap.putString("speed", speed);
    ReactContext reactContext = (ReactContext) getContext();
    reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
      getId(),
      "progressChange",
      writableMap
    );
  }

  private WebChromeClient webChromeClient = new WebChromeClient() {
    @Override
    public void onProgressChanged(WebView webView, int i) {
      super.onProgressChanged(webView, i);
      String speed = String.valueOf(i);
      onReceiveNativeProgress(speed);
      if(i == 100){
        // 加载完进度条消失
        mProgressBar.setVisibility(View.GONE);
      } else {
        if(mProgressBar.getVisibility() == GONE) {
          mProgressBar.setVisibility(VISIBLE);
          mProgressBar.setProgress(i);
        }
      }
    }
  };
  public X5WebView(Context context) {
    super(context);
    initWebViewsettings(context);
    this.getView().setClickable(true);
  }

  public X5WebView(Context context, AttributeSet attributeSet) {
    super(context, attributeSet);
    initWebViewsettings(context);
    setBackgroundColor(85621);
  }

  @SuppressLint("SetJavascriptEnable")
  public void initWebViewsettings(Context context) {
    initProgressBar(context);
    WebSettings webSetting = this.getSettings();
    webSetting.setJavaScriptEnabled(true);
    webSetting.setJavaScriptCanOpenWindowsAutomatically(true);
    webSetting.setAllowFileAccess(true);
    webSetting.setLayoutAlgorithm(WebSettings.LayoutAlgorithm.NARROW_COLUMNS);
    webSetting.setSupportZoom(true);
    webSetting.setBuiltInZoomControls(true);
    webSetting.setUseWideViewPort(true);
    webSetting.setSupportMultipleWindows(true);
    // webSetting.setLoadWithOverviewMode(true);
    webSetting.setAppCacheEnabled(true);
    // webSetting.setDatabaseEnabled(true);
    webSetting.setDomStorageEnabled(true);
    webSetting.setGeolocationEnabled(true);
    webSetting.setAppCacheMaxSize(Long.MAX_VALUE);
    // webSetting.setPageCacheCapacity(IX5WebSettings.DEFAULT_CACHE_CAPACITY);
    webSetting.setPluginState(WebSettings.PluginState.ON_DEMAND);
    // webSetting.setRenderPriority(WebSettings.RenderPriority.HIGH);
    webSetting.setCacheMode(WebSettings.LOAD_NO_CACHE);
    // 下载监听
    this.setDownloadListener(new CustomDownLoad(getContext()));
    this.setWebViewClient(webViewClient);
    this.setWebChromeClient(webChromeClient);
  }

  public void initProgressBar(Context context) {
    mProgressBar = new ProgressBar(context, null,
      android.R.attr.progressBarStyleHorizontal);
    LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(
      LinearLayout.LayoutParams.MATCH_PARENT, 10);
    mProgressBar.setLayoutParams(layoutParams);
    mProgressBar.setProgress(0);
    addView(mProgressBar);
  }

  public static X5WebView getX5WebViewInstance(Context context) {
    if (x5WebView == null) {
      synchronized (X5WebView.class) {
        if (x5WebView == null) {
          x5WebView = new X5WebView(context);
        }
      }
    }
    return x5WebView;
  }

}


