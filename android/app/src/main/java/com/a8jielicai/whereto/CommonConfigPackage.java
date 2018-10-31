package com.a8jielicai.whereto;

import com.a8jielicai.whereto.invokenative.CommonConfigModule;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * author : Zwq
 * e-mail : 1098621287qq.com
 * date   : 2018/10/2515:04
 * desc   :
 * version: 1.0
 */
public class CommonConfigPackage implements ReactPackage {

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }

  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    List<NativeModule> modules = new ArrayList<>();
    modules.add(new CommonConfigModule(reactContext));
    return modules;
  }
}
