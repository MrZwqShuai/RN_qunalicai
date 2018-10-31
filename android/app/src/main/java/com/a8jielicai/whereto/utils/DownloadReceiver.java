package com.a8jielicai.whereto.utils;

import android.app.DownloadManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.os.StrictMode;
import android.support.v4.content.FileProvider;
import android.util.Log;
import android.widget.Toast;

import java.io.File;

/**
 * author : Zwq
 * e-mail : 1098621287qq.com
 * date   : 2018/10/2323:19
 * desc   :
 * version: 1.0
 */
public class DownloadReceiver extends BroadcastReceiver {

  @Override
  public void onReceive(Context context, Intent intent) {
    if (intent.getAction().equals(DownloadManager.ACTION_DOWNLOAD_COMPLETE)) {//下载成功 触发
      long id = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1);
      String apkSavePath = context.getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS) + "/test.apk";
      installApk(context, id, apkSavePath);
    } else if (intent.getAction().equals(DownloadManager.ACTION_NOTIFICATION_CLICKED)) {//点击通知栏下载 触发
      Intent viewDownloadIntent = new Intent(DownloadManager.ACTION_VIEW_DOWNLOADS);
      viewDownloadIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
      context.startActivity(viewDownloadIntent);
    }
  }

  // 如果安装出现解析软件包出现问题，基本是安装的路径不对，要看你包下面这个apk路径对不对 比如...com.a8jielicai.whereto.某某apk;
  private static void installApk(Context context, long downloadApkId, String apkPath) {
    DownloadManager dManager = (DownloadManager) context.getSystemService(Context.DOWNLOAD_SERVICE);
    Intent install = new Intent(Intent.ACTION_VIEW);
    Uri downloadFileUri = dManager.getUriForDownloadedFile(downloadApkId);
    if (downloadFileUri != null) {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {//安卓版本大于7 android7隐私限制必须使用fileprovider启动
        File file = new File(apkPath);
        Uri apkUri = FileProvider.getUriForFile(context, "com.a8jielicai.whereto.provider", file);//在AndroidManifest中的android:authorities值
        install.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        // 临时授权跳转file之外的应用
        install.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
        install.setDataAndType(apkUri, "application/vnd.android.package-archive");
        context.startActivity(install);
      } else {
        Log.d("DownloadManager", downloadFileUri.toString());
        install.setDataAndType(Uri.fromFile(new File(apkPath)), "application/vnd.android.package-archive");
        install.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(install);
      }
    } else {
      Log.e("DownloadManager", "download error");
    }
  }
}
