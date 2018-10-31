package com.a8jielicai.whereto.utils;

/**
 * author : Zwq
 * e-mail : 1098621287qq.com
 * date   : 2018/10/1210:17
 * desc   :
 * version: 1.0
 */
public class StringUtil {

  public static final String APP_PROTOCOLPREFIX = "app://interface";

  public static boolean  hasProtocolCharacter(String s) {
    boolean isTrue = s.contains(APP_PROTOCOLPREFIX);
    return isTrue;
  }

  public static String getMethodFromUrl(String url) {
    if(hasProtocolCharacter(url)) {
      return interceptString(url);
    } else {
      return "";
    }
  }

  // 截取字符串
  public static String interceptString(String s) {
    Integer equalStrIndex = s.indexOf("=");
    Integer andStrIndex = s.indexOf("&");
    String expectStr = "";
    if(andStrIndex >= 0 && andStrIndex >= equalStrIndex) {
       expectStr = s.substring(s.indexOf("=") + 1, s.indexOf("&"));
    } else {
       expectStr = s.substring(s.indexOf("=") + 1);
    }
    return expectStr;
  }

  // 是否有.apk
  public static Boolean hasApkSuffix(String s) {
    return s.contains(".apk");
  }
}
