package com.univtec.nebraska;

import android.app.Activity;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.net.Uri;
import android.os.Bundle;

import androidx.multidex.MultiDex;
import com.google.android.exoplayer2.ExoPlayer;
import com.google.android.exoplayer2.MediaItem;
import com.google.android.exoplayer2.ext.ima.ImaAdsLoader;
import com.google.android.exoplayer2.source.DefaultMediaSourceFactory;
import com.google.android.exoplayer2.source.MediaSource;
import com.google.android.exoplayer2.source.hls.HlsMediaSource;
import com.google.android.exoplayer2.ui.StyledPlayerView;
import com.google.android.exoplayer2.upstream.DataSource;
import com.google.android.exoplayer2.upstream.DefaultDataSource;
import com.google.android.exoplayer2.util.MimeTypes;
import com.google.android.exoplayer2.util.Util;

import java.net.URI;
import java.net.URISyntaxException;

public class AkamaiActivity extends Activity{

    //private static final String LOG_TAG = "Akamaitoo";
    private String VIDEO_URL = "<![CDATA[https://storage.googleapis.com/gvabox/media/samples/stock.mp4]]>";
    private String PREROLL = "<![CDATA[https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_ad_samples&sz=640x480&cust_params=sample_ct%3Dlinear&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=]]>";
    private String MIDROLL = "";
    private Integer SEEK_TIME = 0;
    private StyledPlayerView playerView;
    private ExoPlayer player;
    private ImaAdsLoader adsLoader;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_my);
        MultiDex.install(this);
        Intent intent = getIntent();
        VIDEO_URL = intent.getStringExtra("EXTRA_PLAYER_HD_URI");
        PREROLL = intent.getStringExtra("EXTRA_PREROLL");
        MIDROLL = intent.getStringExtra("EXTRA_MIDROLL");
        SEEK_TIME = intent.getIntExtra("EXTRA_SEEK_TIME", 0);
        playerView = findViewById(R.id.player_view);
        // Create an AdsLoader.
        adsLoader = new ImaAdsLoader.Builder(/* context= */ this).build();
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE);
        /*buttonClose = findViewById(com.facebook.react.R.id.button_close);
        buttonClose.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view){
                if (videoPlayerView != null) {

                    //To send info about seekTime
                    Integer time = videoPlayerView.getCurrentTimelinePosition();
                    Integer totalTime = videoPlayerView.getTimelineDuration();

                    AkamaiCustomPlayer.closePlayer(time, totalTime);
                    onBackPressed();

                }
            }
        });*/
    }

    @Override
    public void onStart() {
        super.onStart();
        if (Util.SDK_INT > 23) {
            initializePlayer();
            if (playerView != null) {
                playerView.onResume();
            }
        }
    }

    @Override
    public void onResume() {
        super.onResume();
        if (Util.SDK_INT <= 23 || player == null) {
            initializePlayer();
            if (playerView != null) {
                playerView.onResume();
            }
        }
    }

    @Override
    public void onPause() {
        super.onPause();
        if (Util.SDK_INT <= 23) {
            if (playerView != null) {
                playerView.onPause();
            }
            releasePlayer();
        }
    }

    @Override
    public void onStop() {
        super.onStop();
        if (Util.SDK_INT > 23) {
            if (playerView != null) {
                playerView.onPause();
            }
            releasePlayer();
        }
    }

    @Override
    protected void onDestroy() {
        adsLoader.release();

        super.onDestroy();
    }

    private void releasePlayer() {
        adsLoader.setPlayer(null);
        playerView.setPlayer(null);
        player.release();
        player = null;
    }

    private void initializePlayer() {
        // Set up the factory for media sources, passing the ads loader and ad view providers.
        DataSource.Factory dataSourceFactory = new DefaultDataSource.Factory(this);

        // Create media source.

        MediaSource.Factory mediaSourceFactory =
                new DefaultMediaSourceFactory(dataSourceFactory)
                        .setAdsLoaderProvider(unusedAdTagUri -> adsLoader)
                        .setAdViewProvider(playerView);

        // Create an ExoPlayer and set it as the player for content and ads.
        player = new ExoPlayer.Builder(this).setMediaSourceFactory(mediaSourceFactory).build();
        playerView.setPlayer(player);
        adsLoader.setPlayer(player);

        // Create the MediaItem to play, specifying the content URI and ad tag URI.
        Uri contentUri = Uri.parse(VIDEO_URL);

        //Uri contentUri = Uri.parse("https://nofilters-vod.akamaized.net/nof/transcoded/2f2d14b9-8149-4eaf-bf39-480d36fd05bc/hls/master.m3u8");
        URI u;
        try {
            //u = new URI("https://nofilters-vod.akamaized.net/nof/transcoded/2f2d14b9-8149-4eaf-bf39-480d36fd05bc/hls/master.m3u8");
            u = new URI("https://storage.googleapis.com/gvabox/media/samples/stock.mp4");

            Uri adTagUri = Uri.parse("<![CDATA[https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_ad_samples&sz=640x480&cust_params=sample_ct%3Dlinear&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=]]>");

            HlsMediaSource hlsMediaSource =
                    new HlsMediaSource.Factory(dataSourceFactory)
                            .createMediaSource(MediaItem.fromUri(contentUri));
            //funciona sin ads

            MediaItem mediaItem =
                    new MediaItem.Builder()
                            //.set
                            //.setUri(u.toString())
                            .setUri(hlsMediaSource.toString())
                            //.setMimeType(MimeTypes.APPLICATION_M3U8)
                            .setAdsConfiguration(new MediaItem.AdsConfiguration.Builder(adTagUri).build())
                            .build();

            //de google, https://developer.android.com/codelabs/exoplayer-intro#4
            MediaItem mediaItem2 = new MediaItem.Builder()
                    .setUri((hlsMediaSource.toString()))
                    .setMimeType(MimeTypes.APPLICATION_M3U8)
                    .build();



            //new HlsMediaSource.Factor
            // Prepare the content and ad to be played with the SimpleExoPlayer.
            //player.setMediaItem(item);
            //player.addMediaSource(hlsMediaSource);

            //player.setMediaItem(MediaItem.fromUri(hlsMediaSource.toString()));// no funciona
            player.setMediaSource(hlsMediaSource);
            //player.addMediaItem(2, mediaItem);

            player.prepare();
            adsLoader.setPlayer(player);
            player.setPlayWhenReady(true);


        }catch(URISyntaxException e) {
            e.printStackTrace();
        }

        // Set PlayWhenReady. If true, content and ads will autoplay.
        //player.setPlayWhenReady(true);
    }
}
