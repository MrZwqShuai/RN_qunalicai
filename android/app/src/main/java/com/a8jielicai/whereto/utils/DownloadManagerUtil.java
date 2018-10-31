package com.a8jielicai.whereto.utils;

import android.app.DownloadManager;
import android.content.Context;
import android.net.Uri;
import android.nfc.Tag;
import android.os.Build;
import android.os.Environment;
import android.os.StrictMode;
import android.util.Log;
import android.widget.Toast;

import java.io.File;

/**
 * author : Zwq
 * e-mail : 1098621287qq.com
 * date   : 2018/10/249:34
 * desc   :
 * version: 1.0
 */
public class DownloadManagerUtil {
  private Context mContext;

  public DownloadManagerUtil(Context context) {
    mContext = context;
  }

  public long download(String url, String title, String desc) {
    Uri uri = Uri.parse(url);
    DownloadManager.Request req = new DownloadManager.Request(uri);
    //设置WIFI下进行更新
    req.setAllowedNetworkTypes(DownloadManager.Request.NETWORK_WIFI);
    //下载中和下载完后都显示通知栏
    req.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
    //使用系统默认的下载路径 此处为应用内 /android/data/packages ,所以兼容7.0
    req.setDestinationInExternalFilesDir(mContext, Environment.DIRECTORY_DOWNLOADS, title);
    //通知栏标题
    req.setTitle(title);
    //通知栏描述信息
    req.setDescription(desc);
    //设置类型为.apk
    req.setMimeType("application/vnd.android.package-archive");
    //获取下载任务ID
    DownloadManager dm = (DownloadManager) mContext.getSystemService(mContext.DOWNLOAD_SERVICE);
    return dm.enqueue(req);
  }

  // 防止重复下载
  public void clearCurrentTask(long downloadId) {
    DownloadManager dm = (DownloadManager) mContext.getSystemService(Context.DOWNLOAD_SERVICE);
    try {
      dm.remove(downloadId);
    } catch (IllegalArgumentException ex) {
      ex.printStackTrace();
    }
  }
}
