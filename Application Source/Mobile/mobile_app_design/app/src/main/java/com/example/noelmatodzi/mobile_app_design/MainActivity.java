package com.example.noelmatodzi.mobile_app_design;


import android.content.Intent;
import android.provider.MediaStore;
import android.support.v4.app.Fragment;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AppCompatActivity;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.TextView;

import java.io.File;

public class MainActivity extends AppCompatActivity implements UploadFragment.OnUploadFragmentListener,FileUploadFragment.OnFileUploadFragmentListener {

    private TextView mTextMessage;


    private FrameLayout mainFrame;



    private HomeFragment homeFragment;
    private UploadFragment uploadFragment;
    private ResultFragment resultFragment;
    private ToolsFragment toolsFragment;
    private Button button;

    Integer REQUEST_CAMERA=1, SELECT_FILE=0;



    private BottomNavigationView.OnNavigationItemSelectedListener mOnNavigationItemSelectedListener
            = new BottomNavigationView.OnNavigationItemSelectedListener() {

        @Override
        public boolean onNavigationItemSelected(@NonNull MenuItem item) {
            switch (item.getItemId()) {
                case R.id.navigation_home:
                    setFragment(homeFragment);
                    return true;
                case R.id.navigation_result:

                    Bundle args = new Bundle();
                    args.putString("jsonResponse","empty");
                    resultFragment.setArguments(args);
                    setFragment(resultFragment);
                    return true;
               // case R.id.navigation_tools:
                   // setFragment(toolsFragment);
                   // return true;
                case R.id.navigation_upload:
                    setFragment(uploadFragment);
                    return true;
            }
            return false;
        }
    };


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);



        setContentView(R.layout.activity_main);
       // setFragment(homeFragment);


    mainFrame =(FrameLayout) findViewById(R.id.mainframe);

    homeFragment = new HomeFragment();
    uploadFragment = new UploadFragment();
    resultFragment = new ResultFragment();
    toolsFragment = new ToolsFragment();


    mTextMessage = (TextView) findViewById(R.id.message);
        BottomNavigationView navigation = (BottomNavigationView) findViewById(R.id.navigation);
        navigation.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener);
        setFragment(homeFragment);



    }


    private void setFragment(Fragment fragment)
    {
        FragmentTransaction fragTransaction = getSupportFragmentManager().beginTransaction();
        fragTransaction.replace(R.id.mainframe,fragment);
        fragTransaction.commit();

    }


    private void openGallery()
    {
        Intent intent = new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
        intent.setType("image/*");
        startActivityForResult(intent,SELECT_FILE);

    }


    @Override
    public void pathFromUploadFragment(String text) {

        // The user selected the headline of an article from the HeadlinesFragment
        // Do something here to display that article

        FileUploadFragment fileUploadFragment = (FileUploadFragment)
              getSupportFragmentManager().findFragmentById(R.id.file_upload);

        if (fileUploadFragment!= null) {


            // Call a method in the ArticleFragment to update its content
            fileUploadFragment.setPath(text);
        } else {
            // Otherwise, we're in the one-pane layout and must swap frags...

            // Create fragment and give it an argument for the selected article
            FileUploadFragment newFragment = new FileUploadFragment();
            Bundle args = new Bundle();
            args.putString("photoPath",text);
            args.putString("note","data passed!!");
            newFragment.setArguments(args);
            setFragment(newFragment);
        }
    }

    @Override
    public void getResponseString(String text) {

        resultFragment = (ResultFragment) getSupportFragmentManager().findFragmentById(R.id.result_fragment);
        if(resultFragment != null)
        {


            //Create fragment and give it an argument for the selected article

            Bundle args = new Bundle();
            args.putString("jsonResponse",text);
            resultFragment.setArguments(args);
            setFragment(resultFragment);

        }
        else
        {
            //do nothing..empty results
        }



    }
}

