package example.com.picturethat;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.ActivityNotFoundException;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v4.content.FileProvider;
import android.util.Base64;
import android.util.Log;
import android.view.View;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.webkit.MimeTypeMap;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.CountDownLatch;

import okhttp3.Call;
import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class navigation_activity extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener {


    private static final int PERMS_REQUEST_CODE = 123;
    private  static final  int WRITE_REQUEST_RES = 10;
    String mCurrentPhotoPath;
    File photoFile = null; //File to be uploaded.
    Uri uri; //global uri

    private  String resultant = "";

    Button uploadButton;

    ImageView ivDisplayPicture;
    ImageView ivCam;
    Integer REQUEST_CAMERA=1, SELECT_FILE=0;
    final int PIC_CROP = 2;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_navigation_activity);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        ivDisplayPicture = findViewById(R.id.ivDisplayPicture);

        uploadButton = findViewById(R.id.uploadButton);

        uploadButton.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                Load();
            }
        });



        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                if(!hasWritePermissions())
                {

                    requestWritePerms();
                }
                if(!hasPermissions())
                {
                    requestPerms();
                }
                if(!hasInternetPermissions())
                {
                    requestInternetPerms();
                }



                selectImage();

                /*Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
                        */
            }
        });

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.addDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);
    }

    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.navigation_activity, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        // Handle navigation view item clicks here.
        int id = item.getItemId();

        if (id == R.id.nav_camera) {
            // Handle the camera action


        } else if (id == R.id.nav_gallery) {



        } else if (id == R.id.nav_slideshow) {

        } else if (id == R.id.nav_manage) {

        } else if (id == R.id.nav_share) {

        } else if (id == R.id.nav_send) {

        }

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }

    @SuppressLint("WrongConstant")
    private boolean hasPermissions(){
        int res = 0;
        //string array of permissions,
        String[] permissions = new String[]{Manifest.permission.CAMERA};

        for (String perms : permissions){
            res = checkCallingOrSelfPermission(perms);
            if (!(res == PackageManager.PERMISSION_GRANTED)){
                return false;
            }
        }
        return true;
    }

    private void requestPerms(){
        String[] permissions = new String[]{Manifest.permission.CAMERA};
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M){
            requestPermissions(permissions,PERMS_REQUEST_CODE);
        }
    }

    @SuppressLint("WrongConstant")
    private boolean hasInternetPermissions(){
        int res = 0;
        //string array of permissions,
        String[] permissions = new String[]{Manifest.permission.INTERNET};

        for (String perms : permissions){
            res = checkCallingOrSelfPermission(perms);
            if (!(res == PackageManager.PERMISSION_GRANTED)){
                return false;
            }
        }
        return true;
    }

    private void requestInternetPerms(){
        String[] permissions = new String[]{Manifest.permission.INTERNET};
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M){
            requestPermissions(permissions,PERMS_REQUEST_CODE);
        }
    }

    @SuppressLint("WrongConstant")
    private boolean hasWritePermissions(){
        int res = 0;
        //string array of permissions,
        String[] permissions = new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE};

        for (String perms : permissions){
            res = checkCallingOrSelfPermission(perms);
            if (!(res == PackageManager.PERMISSION_GRANTED)){
                return false;
            }
        }
        return true;
    }

    private void requestWritePerms(){
        String[] permissions = new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE};
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M){
            requestPermissions(permissions,WRITE_REQUEST_RES);
        }
    }


//this function is used to create a dialog for choosing camera/gallery method to upload the image.
private static final String TAG = navigation_activity.class.getSimpleName();

    private void dispatchTakePictureIntent() {
        Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        // Ensure that there's a camera activity to handle the intent
        if (takePictureIntent.resolveActivity(getPackageManager()) != null) {
            // Create the File where the photo should go

            try {
                photoFile = createImageFile();
            } catch (IOException ex) {
                // Error occurred while creating the File
            }


                //uri = Uri.fromFile(file);


                // Continue only if the File was successfully created
                if (photoFile != null) {
                    uri = FileProvider.getUriForFile(this,
                            "example.com.android.fileprovider",
                            photoFile);
                    takePictureIntent.putExtra(MediaStore.EXTRA_OUTPUT, uri);
                    takePictureIntent.putExtra("return-data", true);
                    startActivityForResult(takePictureIntent, REQUEST_CAMERA);
                }
            }
        }



        private void openCamera()
        {
            Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
            photoFile = new File(Environment.getExternalStorageDirectory(),
                    "file"+String.valueOf(System.currentTimeMillis())+".jpg");
            uri = Uri.fromFile(photoFile);
            intent.putExtra(MediaStore.EXTRA_OUTPUT,uri);
            intent.putExtra("return-data",true);
            startActivityForResult(intent,REQUEST_CAMERA);

        }


    private void Load()
    {
        Toast.makeText(this,"uploading", Toast.LENGTH_SHORT).show();

        if(photoFile != null)
        {

            Thread thread = new Thread(new Runnable() {
                @Override
                public void run() {

                    uploadToServer(photoFile);
                }
            });

            thread.start();


            try {
                thread.join();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }


            processResponse();


        }


    }



    private void selectImage() {
        final CharSequence[] items={"Camera","Gallery", "Cancel"};

        AlertDialog.Builder builder = new AlertDialog.Builder(navigation_activity.this);
        builder.setTitle("Upload Image");

        builder.setItems(items, new DialogInterface.OnClickListener() {

            @Override
            public void onClick(DialogInterface dialogInterface, int i) {
                if (items[i].equals("Camera")) {


                  //dispatchTakePictureIntent();
                    openCamera();

                } else if (items[i].equals("Gallery")) {

                    openGallery();

                } else if (items[i].equals("Cancel")) {
                    dialogInterface.dismiss();
                }
            }
        });
        builder.show();
    }



    private void setPic(String mCurrentPhotoPath) {
        // Get the dimensions of the View
        int targetW = ivDisplayPicture.getWidth();
        int targetH = ivDisplayPicture.getHeight();

        // Get the dimensions of the bitmap
        BitmapFactory.Options bmOptions = new BitmapFactory.Options();
        bmOptions.inJustDecodeBounds = true;
        BitmapFactory.decodeFile(mCurrentPhotoPath, bmOptions);
        int photoW = bmOptions.outWidth;
        int photoH = bmOptions.outHeight;

        // Determine how much to scale down the image
        int scaleFactor = Math.max(photoW/targetW, photoH/targetH);

        // Decode the image file into a Bitmap sized to fill the View
        bmOptions.inJustDecodeBounds = false;
        bmOptions.inSampleSize = scaleFactor;
        bmOptions.inPurgeable = true;

        Bitmap bitmap = BitmapFactory.decodeFile(mCurrentPhotoPath, bmOptions);
        ivDisplayPicture.setImageBitmap(bitmap);
    }





    @Override
    public  void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (resultCode == Activity.RESULT_OK) {

            //set the image  to be viewed.
            if (requestCode == REQUEST_CAMERA){
                cropImage();
            }
            else if (requestCode == SELECT_FILE) {
                if(data != null) {
                    uri = data.getData();
                    cropImage();
                }

            } else if (requestCode == PIC_CROP){
                if(data != null)
                {
                    Bundle bundle = data.getExtras();
                    //setting the image.
                   Bitmap bitmap = bundle.getParcelable("data");
                    ivDisplayPicture.setImageBitmap(bitmap);
                    String path= FilePath.getPath(this,uri);
                    photoFile = new File(path);
                    Button resetButton = findViewById(R.id.uploadButton);
                    resetButton.setVisibility(View.VISIBLE);
                }
                else
                {
                    Toast toast = Toast.makeText(this,"data is null is guess", Toast.LENGTH_SHORT);
                }

            }



        }
    }
    /**
     * this function opens the gallery intent.
     */
    private void openGallery()
    {
        Intent intent = new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
        intent.setType("image/*");
        startActivityForResult(intent,SELECT_FILE);

    }


    /**
     * This function crops an image
     * @throws  ActivityNotFoundException if the device does not support the cropping functionality.
     */
    private void cropImage(){

        try {

            Intent cropIntent = new Intent("com.android.camera.action.CROP");
            //indicate image type and Uri
            cropIntent.setDataAndType(uri, "image/*");
            //set crop properties
            cropIntent.putExtra("crop", "true");
            //indicate aspect of desired crop
            cropIntent.putExtra("aspectX", 1);
            cropIntent.putExtra("aspectY", 1);
            //indicate output X and Y
            cropIntent.putExtra("outputX", 256);
            cropIntent.putExtra("outputY", 256);
            //retrieve data on return
            cropIntent.putExtra("return-data", true);

           cropIntent.putExtra("scaleUpIfNeeded",true);
            startActivityForResult(cropIntent, PIC_CROP);



        }
        catch(ActivityNotFoundException anfe){
            //display an error message
            String errorMessage = "Whoops - your device doesn't support the crop action!";
            Toast toast = Toast.makeText(this, errorMessage, Toast.LENGTH_SHORT);
            toast.show();
        }


    }



    /**
     * this function creates a new image file.
     * @return a File image.
     * @throws IOException
     */
    private File createImageFile() throws IOException {
        // Create an image file name
        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        String imageFileName = "JPEG_" + timeStamp + "_";
        File storageDir = getExternalFilesDir(Environment.DIRECTORY_PICTURES);
        File image = File.createTempFile(
                imageFileName,  /* prefix */
                ".jpg",         /* suffix */
                storageDir      /* directory */
        );

        // Save a file: path for use with ACTION_VIEW intents
        mCurrentPhotoPath = image.getAbsolutePath();
        return image;
    }


    /**
     * This function uploads a file to the server using the okhttp request.
     * @param f File to be uploaded to the server
     */
    private  void uploadToServer(File f)
    {


        String file_path = f.getAbsolutePath();
        String content_type  = getMimeType(f.getPath());
        OkHttpClient client = new OkHttpClient();
        RequestBody file_body = RequestBody.create(MediaType.parse(content_type),f);

        RequestBody request_body = new MultipartBody.Builder()
                .setType(MultipartBody.FORM)
                .addFormDataPart("type",content_type)
                .addFormDataPart("file",file_path.substring(file_path.lastIndexOf("/")+1),file_body)
                .build();

        Request request = new Request.Builder()
                .url("http://192.168.1.100:8000/upload")
                .post(request_body)
                .build();

        Response response = null;
        try {
             response = client.newCall(request).execute();


             onResponse(response);
        }
        catch (IOException e)
        {


            e.printStackTrace();
        }


    }

    public void onResponse(Response response) throws IOException
    {
        if (response.isSuccessful())
        {
           resultant = response.body().string();
        }
        else
        {

        }
    }

    /**
     * This function starts a new results activity after recieve a json string from the server
     */
    public  void processResponse()
    {
        if(resultant != "")
        {//process the response.

            Toast.makeText(this, "json file reecieved!", Toast.LENGTH_SHORT).show();
//
//            Intent intent = new Intent(getBaseContext(), Results.class);
//            intent.putExtra("JSON_RESULT",resultant);
//            startActivity(intent);


            getResponse(resultant);


        }
        else
        {
            Toast.makeText(this, "FiLE UPLOAD ERROR /n PLEASE TRY AGAIN LATER!", Toast.LENGTH_SHORT).show();

        }

    }


    /**
     *  This function gets the mime type of a file given the file path string.
     * @param path a string of the path of the file
     * @return a string that is a mime type of the file.
     */

    private String getMimeType(String path) {

        String extension = MimeTypeMap.getFileExtensionFromUrl(path);

        return MimeTypeMap.getSingleton().getMimeTypeFromExtension(extension);
    }



    void getResponse(String res)
    {

        //Parse json
        JSONArray reader = null;
        try
        {
            //Into java object
            reader = new JSONArray(res);
            //Place name and value in string[]
            String resNames[] = new String[reader.length()];
            String resValues[] = new String[reader.length()];
            for(int n = 0; n < reader.length(); n++)
            {
                JSONObject object = reader.getJSONObject(n);
                resNames[n] = object.get("name").toString();
                resValues[n] = object.get("value").toString();
                //System.out.println(resNames[n] + ": " + Float.parseFloat(resValues[n])*100 + " %");
            }

            //Display response(start activity)

            Intent rez =  new Intent(this, results_activity.class);

            rez.putExtra("Photopath", photoFile.getAbsolutePath());
            rez.putExtra("Names", resNames);
            rez.putExtra("Values", resValues);
            startActivity(rez);


        }
        catch(Exception e)
        {
            System.out.println("We dun goofed");
            e.printStackTrace();
        }



    }
}
