package com.a8jielicai.whereto;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.view.KeyEvent;
import android.webkit.JavascriptInterface;
import android.widget.ImageView;
import android.widget.Toast;

import com.a8jielicai.whereto.utils.DownloadManagerUtil;
import com.a8jielicai.whereto.x5webview.X5WebView;
import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.image.ReactImageView;
import com.tencent.smtt.sdk.WebView;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Map;

import javax.annotation.Nullable;

public class X5WebViewManger extends SimpleViewManager<X5WebView> {

  public long downloadId = 0;
  public static final String R_Class = "X5WebView";
  private ThemedReactContext mContext;

  @Override
  public String getName() {
    return R_Class;
  }

  @Override
  protected X5WebView createViewInstance(ThemedReactContext reactContext) {
    this.mContext = reactContext;
    X5WebView x5WebView = X5WebView.getX5WebViewInstance(reactContext);
    // 给webview添加接口 会自动生成一个JSCAllJAVA对象
    x5WebView.addJavascriptInterface(new JsInterface(), "JSCAllJAVA");
    return x5WebView;
  }

  @SuppressWarnings("unused")
  private final class JsInterface {
    // webview前端代码应该保持一致 如下面例子 JSCAllJAVA对象是上面给webview注册的
    // JSCAllJAVA.downloadAPK('https://downpack.baidu.com/appsearch_AndroidPhone_v8.0.3(1.0.65.172)_1012271b.apk', 'test.apk', '下载完成后，点击安装')
    @JavascriptInterface
    public void downloadAPK(String apkUrl, String apkName, String desc) {
      initDownLoadManager(mContext, apkUrl, apkName, desc);
    }
  }

  // 初始化下载管理
  public void initDownLoadManager(ThemedReactContext reactContext, String apkUrl, String apkName, String desc) {
    DownloadManagerUtil downloadManagerUtil = new DownloadManagerUtil(reactContext);
    if (downloadId != 0) {
      downloadManagerUtil.clearCurrentTask(downloadId);
    }
//    downloadId = downloadManagerUtil.download("https://downpack.baidu.com/appsearch_AndroidPhone_v8.0.3(1.0.65.172)_1012271b.apk", "test.apk", "下载完成后，点击安装");
    downloadId = downloadManagerUtil.download(apkUrl, apkName, desc);
  }

  @ReactProp(name = "src")
  public void setSrc(X5WebView x5WebView, @Nullable String sources) {
    x5WebView.loadUrl(sources);
  }

  @Nullable
  @Override
  public Map getExportedCustomBubblingEventTypeConstants() {
    return MapBuilder.builder()
      .put("topChange", MapBuilder.of("phasedRegistrationNames", MapBuilder.of("bubbled", "onChange"))).put("progressChange", MapBuilder.of("phasedRegistrationNames", MapBuilder.of("bubbled", "onProgressChange"))).build();
  }

}
