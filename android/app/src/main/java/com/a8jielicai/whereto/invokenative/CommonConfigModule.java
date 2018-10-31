package com.a8jielicai.whereto.invokenative;

import android.widget.Toast;

import com.a8jielicai.whereto.utils.CommonUtil;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * author : Zwq
 * e-mail : 1098621287qq.com
 * date   : 2018/10/2514:33
 * desc   :
 * version: 1.0
 */
public class CommonConfigModule extends ReactContextBaseJavaModule {

  public CommonConfigModule(ReactApplicationContext reactApplicationContext) {
    super(reactApplicationContext);
  }

  @Override
  public String getName() {
    return "CommonConfigModule";
  }

  @ReactMethod
  public void getUserId(Integer userId) {
    Toast.makeText(getReactApplicationContext(), userId.toString(), Toast.LENGTH_SHORT).show();
    CommonUtil.userId = userId;
  }
}
