package com.a8jielicai.whereto.wxapi;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.widget.Toast;

import com.tencent.mm.sdk.constants.ConstantsAPI;
import com.tencent.mm.sdk.modelbase.BaseReq;
import com.tencent.mm.sdk.modelbase.BaseResp;
import com.tencent.mm.sdk.openapi.IWXAPI;
import com.tencent.mm.sdk.openapi.IWXAPIEventHandler;
import com.tencent.mm.sdk.openapi.WXAPIFactory;

/**
 * author : Zwq
 * e-mail : 1098621287qq.com
 * date   : 2018/10/1516:40
 * desc   :
 * version: 1.0
 */
public class WXPayEntryActivity extends Activity implements IWXAPIEventHandler {

  private IWXAPI iwxapi;
  // 处理微信支付的回调
  @Override
  public void onResp(BaseResp baseResp) {
    if(baseResp.getType() == ConstantsAPI.COMMAND_PAY_BY_WX) {
      if(baseResp.errCode == 0) {
        Toast.makeText(this, "支付成功", Toast.LENGTH_SHORT).show();
      } else {
        Toast.makeText(this, "支付失败", Toast.LENGTH_SHORT).show();
      }
      finish();
    }
  }

  @Override
  public void onReq(BaseReq baseReq) {
  }

  @Override
  protected void onCreate(@Nullable Bundle savedInstanceState) {
    iwxapi = WXAPIFactory.createWXAPI(this, "wx203bdbf6749d77e8");
    iwxapi.handleIntent(getIntent(), this);
    super.onCreate(savedInstanceState);
  }

  @Override
  protected void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    setIntent(intent);
    iwxapi.handleIntent(intent, this);
  }
}
