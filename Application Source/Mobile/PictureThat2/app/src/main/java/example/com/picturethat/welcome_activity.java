package example.com.picturethat;

import android.content.Intent;
import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

public class welcome_activity extends AppCompatActivity {


    private int SPLASH_TIME_OUT = 2000;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_welcome_activity);
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                Intent startIntent = new Intent(welcome_activity.this,navigation_activity.class);
                startActivity(startIntent);
                finish();

            }
        },SPLASH_TIME_OUT);
    }
}
