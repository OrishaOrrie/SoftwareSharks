package com.example.noelmatodzi.mobile_app_design;


import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.MimeTypeMap;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.Toast;

import java.io.File;
import java.io.IOException;

import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;


/**
 * A simple {@link Fragment} subclass.
 */
public class FileUploadFragment extends Fragment implements View.OnClickListener {


    View view;
    Button uploadButton;
    Button backButton;
    ImageView imageView;
    String path = null;
    String note;
    private String jsonString = null;
    private  OnFileUploadFragmentListener mCallback;


    public FileUploadFragment() {
        // Required empty public constructor
    }


   public void setPath(String p)
   {
       path = p;
   }


    public interface OnFileUploadFragmentListener {
        void getResponseString(String text);
    }

    // This method insures that the Activity has actually implemented our
    // listener and that it isn't null.
    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof OnFileUploadFragmentListener) {
            mCallback = ( OnFileUploadFragmentListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must OnUploadFragmentListner");
        }
    }




    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        view = inflater.inflate(R.layout.fragment_file_upload, container, false);


        uploadButton = (Button) view.findViewById(R.id.upload_button);
        backButton = (Button) view.findViewById(R.id.back_button);
        uploadButton.setOnClickListener(this);
        backButton.setOnClickListener(this);
        imageView = (ImageView) view.findViewById(R.id.imageViewUploader);

        Bundle bundle=getArguments();

        path = bundle.getString("photoPath");
        note =  bundle.getString("note");


       if(path != null)
       {
           Bitmap bitmap = BitmapFactory.decodeFile(path);
           imageView.setImageBitmap(bitmap);

       }
       else
       {
           Toast.makeText(getActivity(), note, Toast.LENGTH_SHORT).show();
       }


        return  view;
    }


    @Override
    public void onClick(View view) {

        if(view == uploadButton)
        {
            load();
        }
        else if (view == backButton)
        {
            UploadFragment fragment = new UploadFragment();
            setFragment(fragment);

        }

    }

    private void uploadImage(String filepath) {

if(filepath != null) {
    String content_type = "image/png";


    OkHttpClient client = new OkHttpClient();
    File f = new File(filepath);


    RequestBody file_body = RequestBody.create(MediaType.parse(content_type),f);

    RequestBody request_body = new MultipartBody.Builder()
            .setType(MultipartBody.FORM)
            .addFormDataPart("type", content_type)
            .addFormDataPart("file", filepath.substring(filepath.lastIndexOf("/") + 1), file_body)
            .build();

    Request request = new Request.Builder()
            .url("http://169.0.58.55:8000/upload")
            .post(request_body)
            .build();

    Response response = null;
    try {
        response = client.newCall(request).execute();
        onResponse(response);
    } catch (IOException e) {
        e.printStackTrace();
    }

}
else
{
    Toast.makeText(getActivity(), "ImageError!", Toast.LENGTH_SHORT).show();
}
        }



    public void onResponse(Response response) throws IOException
    {
        if (response.isSuccessful())
        {
            jsonString = response.body().string();

            if(jsonString != null)
            {
                //pass json string....
                processResponse();
            }
        }
        else
        {
            Toast.makeText(getActivity(), "No response received \n Check Internet Connection", Toast.LENGTH_SHORT).show();
        }
    }

    private String getMimeType(String path) {

        String extension = MimeTypeMap.getFileExtensionFromUrl(path);

        return MimeTypeMap.getSingleton().getMimeTypeFromExtension(extension);
    }


    private void setFragment(Fragment fragment)
    {
        FragmentTransaction fragTransaction = getActivity().getSupportFragmentManager().beginTransaction();
        fragTransaction.replace(R.id.mainframe,fragment);
        fragTransaction.commit();

    }


    public void processResponse()
    {

          if(jsonString != null) {
              Toast.makeText(getActivity(), "json file reecieved!", Toast.LENGTH_SHORT).show();
            //pass jsonString to results activity.
              mCallback.getResponseString(jsonString);
          }
          else{

            Toast.makeText(getActivity(), "FiLE UPLOAD ERROR \n check Internet connection!", Toast.LENGTH_SHORT).show();
          }
    }


    private void load()
    {
        //Toast.makeText(this,"uploading", Toast.LENGTH_SHORT).show();

        if(path != null) {
            Thread thread = new Thread(new Runnable() {
                @Override
                public void run() {
                    uploadImage(path);
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
        else
        {

            Toast.makeText(getActivity(), "image cannot be uploaded..check conncetion!", Toast.LENGTH_SHORT).show();
        }
    }


}
