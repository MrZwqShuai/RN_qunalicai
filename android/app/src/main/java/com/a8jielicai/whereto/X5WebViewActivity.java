package com.a8jielicai.whereto;

import android.app.Activity;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.KeyEvent;
import android.widget.Toast;

public class X5WebViewActivity extends Activity {

  @Override
  protected void onCreate(@Nullable Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
  }

  @Override
  public boolean onKeyDown(int keyCode, KeyEvent event) {
    Toast.makeText(this, "后退拉", Toast.LENGTH_SHORT).show();
    return super.onKeyDown(keyCode, event);
  }
}
