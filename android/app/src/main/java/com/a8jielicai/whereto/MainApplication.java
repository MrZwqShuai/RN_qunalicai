package com.a8jielicai.whereto;

import android.app.Application;
import android.widget.Toast;

// react-native-splash-screen >= 0.3.1
import org.devio.rn.splashscreen.SplashScreenReactPackage;

import com.RNFetchBlob.BuildConfig;
import com.facebook.react.ReactApplication;
import com.microsoft.codepush.react.CodePush;
import com.lmy.smartrefreshlayout.SmartRefreshLayoutPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.example.qiepeipei.react_native_clear_cache.ClearCachePackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.beefe.picker.PickerViewPackage;
import com.horcrux.svg.SvgPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.a8jielicai.whereto.invokenative.DplusReactPackage;
import com.theweflex.react.WeChatPackage;
import com.umeng.socialize.PlatformConfig;

import cn.jpush.reactnativejpush.JPushPackage;   // <--   导入 JPushPackage

import java.util.Arrays;
import java.util.List;


public class MainApplication extends Application implements ReactApplication {
  // 设置为 true 将不会弹出 toast
  private boolean SHUTDOWN_TOAST = true;
  // 设置为 true 将不会打印 log
  private boolean SHUTDOWN_LOG = false;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        protected String getJSBundleFile() {
        return CodePush.getJSBundleFile();
        }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey), getApplicationContext(), BuildConfig.DEBUG,getResources().getString(R.string.reactNativeCodePush_androidServerURL)),
            new SmartRefreshLayoutPackage(),
            new PickerPackage(),
            new ClearCachePackage(),
            new RNFetchBlobPackage(),
            new PickerViewPackage(),
            new SvgPackage(),
            new VectorIconsPackage(),
//            new WeChatPackage(),
            new SplashScreenReactPackage(),  //here
            new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG),   //  <-- 添加 JPushPackage
            new DplusReactPackage(),
            new X5WebViewPackage(),
            new CommonConfigPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
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

  {
    PlatformConfig.setWeixin("wx203bdbf6749d77e8", "80a44bf7372a5bd8e0f332f40f55d2b5");
  }
}
