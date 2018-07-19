package com.example.noelmatodzi.mobile_app_design;


import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.widget.CardView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.Toast;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.InterfaceAddress;


/**
 * A simple {@link Fragment} subclass.
 */
public class UploadFragment extends Fragment  implements View.OnClickListener{

    File photoFile = null;
    Uri uri;
    final int PIC_CROP = 2;
    Integer REQUEST_CAMERA=1, SELECT_FILE=0;
    View  view;
    CardView cameraCardView;
    CardView galleryCardView;


    private OnUploadFragmentListener mCallback;



    public UploadFragment() {
        // Required empty public constructor
    }







    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        view = inflater.inflate(R.layout.fragment_upload, container, false);

        cameraCardView = (CardView) view.findViewById(R.id.camera_option);
        galleryCardView = (CardView) view.findViewById(R.id.gallery_option);

        cameraCardView.setOnClickListener(this);
        galleryCardView.setOnClickListener(this);

        // Inflate the layout for this fragment
        return view;
    }

    public interface OnUploadFragmentListener {
        void pathFromUploadFragment(String text);
    }

    // This method insures that the Activity has actually implemented our
    // listener and that it isn't null.
    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof OnUploadFragmentListener) {
            mCallback = (OnUploadFragmentListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must OnUploadFragmentListner");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mCallback = null;
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
    private void openGallery()
    {
        Intent intent = new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
        intent.setType("image/*");
        startActivityForResult(intent,SELECT_FILE);

    }




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
            Toast toast = Toast.makeText(getActivity(), errorMessage, Toast.LENGTH_SHORT);
            toast.show();
        }


    }


    @Override
    public void onClick(View view) {

        if(view == cameraCardView)
        {
            //openCamera.
            openCamera();
        }
        else if(view == galleryCardView)
        {
            openGallery();

        }
    }



    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
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
                    Bitmap bitmap = bundle.getParcelable("data");
                    //ivDisplayPicture.setImageBitmap(bitmap);

                    photoFile = storeImage(bitmap);


                    String path;
                    if(photoFile!= null ) {
                        path = photoFile.getAbsolutePath();
                        mCallback.pathFromUploadFragment(path);

                    }
                    else {
                        Toast.makeText(getActivity(), "Image Cropped not stored", Toast.LENGTH_SHORT)
                         .show();
                    }



                }
                else
                {

                }

            }



        }
        else {
           // Toast.makeText(getActivity(), "Image Capture Failed", Toast.LENGTH_SHORT)
                  //  .show();
        }


    }


    private File storeImage(Bitmap image) {
        File file = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES), "crop_avatar.JPEG");
        try {
            if(!file.exists())
                file.createNewFile();
            FileOutputStream fos = new FileOutputStream(file);
            image.compress(Bitmap.CompressFormat.JPEG, 90, fos);

            fos.close();
        } catch (FileNotFoundException e) {
            Log.e("FileNotFoundException", e.getMessage());
        } catch (IOException e) {
            Log.e("IOException", e.getMessage());
        }
        return file;
    }





}
