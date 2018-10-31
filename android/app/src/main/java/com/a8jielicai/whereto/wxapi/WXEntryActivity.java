package com.a8jielicai.whereto.wxapi;

import android.app.Activity;
import android.os.Bundle;
import android.widget.Toast;

import com.theweflex.react.WeChatModule;
import com.umeng.socialize.weixin.view.WXCallbackActivity;

public class WXEntryActivity extends WXCallbackActivity {
  @Override
  public void onBackPressed() {
    super.onBackPressed();
    Toast.makeText(this, "回退把", Toast.LENGTH_SHORT).show();
  }
}
