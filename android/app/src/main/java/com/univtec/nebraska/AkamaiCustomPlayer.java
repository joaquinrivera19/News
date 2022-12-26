package com.univtec.nebraska;
import android.content.Intent;
import android.util.Log;

import androidx.annotation.NonNull;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;


public class AkamaiCustomPlayer extends ReactContextBaseJavaModule{
    private static ReactApplicationContext reactContext;
    AkamaiCustomPlayer(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "AkamaiCustomPlayer";
    }

    @ReactMethod
    public void playPressed(String urlVideo,String preRolls, Integer timeWatched ) {
        Intent intent = new Intent(reactContext, AkamaiActivity.class);
        intent.putExtra("EXTRA_PLAYER_HD_URI", urlVideo);
        intent.putExtra("EXTRA_PREROLL", preRolls);
        intent.putExtra("EXTRA_SEEK_TIME", timeWatched);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        reactContext.startActivity(intent);
    }

    public static void closePlayer(Integer time, Integer totalTime){

    }
}

