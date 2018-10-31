package com.a8jielicai.whereto.utils;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.widget.Toast;

import com.tencent.smtt.sdk.DownloadListener;

/**
 * author : Zwq
 * e-mail : 1098621287qq.com
 * date   : 2018/10/2211:23
 * desc   :
 * version: 1.0
 */
public class CustomDownLoad implements DownloadListener {

  private Context context;

  public CustomDownLoad(Context context) {
    this.context = context;
  }

  @Override
  public void onDownloadStart(String s, String s1, String s2, String s3, long l) {
    if (s.endsWith(".apk")) {
      Uri uri = Uri.parse(s);
      Intent intent = new Intent(Intent.ACTION_VIEW, uri);
      context.startActivity(intent);
    }
  }
}
