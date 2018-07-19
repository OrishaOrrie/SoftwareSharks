package com.example.noelmatodzi.mobile_app_design;

import android.Manifest;
import android.annotation.TargetApi;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.support.annotation.NonNull;
import android.support.annotation.RequiresApi;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import java.util.ArrayList;
import java.util.List;

public class Continue extends AppCompatActivity {


    Button button;

    private String[] permissions = {Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission
            .INTERNET, Manifest.permission.READ_EXTERNAL_STORAGE , Manifest.permission.CAMERA,Manifest.permission.MEDIA_CONTENT_CONTROL};
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_continue);
        button =  findViewById(R.id.buttonContinue);
        button.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                    if(arePermissionsEnabled()){
//                    permissions granted, continue flow normally
                    }else {
                        requestMultiplePermissions();
                    }
                }

                //start main activity..
                Intent startIntent = new Intent(Continue.this, MainActivity.class);
                startActivity(startIntent);
                finish();


            }
        });

    }
    @RequiresApi(api = Build.VERSION_CODES.M)
    private boolean arePermissionsEnabled(){
        for(String permission : permissions){
            if(checkSelfPermission(permission) != PackageManager.PERMISSION_GRANTED)
                return false;
        }
        return true;
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    private void requestMultiplePermissions(){
        List<String> remainingPermissions = new ArrayList<>();
        for (String permission : permissions) {
            if (checkSelfPermission(permission) != PackageManager.PERMISSION_GRANTED) {
                remainingPermissions.add(permission);
            }
        }
        requestPermissions(remainingPermissions.toArray(new String[remainingPermissions.size()]), 101);
    }
    @TargetApi(Build.VERSION_CODES.M)
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions,@NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if(requestCode == 101){
            for(int i=0;i<grantResults.length;i++){
                if(grantResults[i] != PackageManager.PERMISSION_GRANTED){
                    if(shouldShowRequestPermissionRationale(permissions[i])){
                        new AlertDialog.Builder(this)
                                .setMessage("Your error message here")
                                .setPositiveButton("Allow", (dialog, which) -> requestMultiplePermissions())
                                .setNegativeButton("Cancel", (dialog, which) -> dialog.dismiss())
                                .create()
                                .show();
                    }
                    return;
                }
            }

        }





    }



}
