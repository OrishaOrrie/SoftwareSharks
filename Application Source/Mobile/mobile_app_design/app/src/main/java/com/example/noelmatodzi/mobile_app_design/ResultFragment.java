package com.example.noelmatodzi.mobile_app_design;


import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;


/**
 * A simple {@link Fragment} subclass.
 */
public class ResultFragment extends Fragment {




    View view;
    String response = null;



    public ResultFragment() {
        // Required empty public constructor
    }
    public void setResponse(String s)
    {
        response = s;
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment

              view =   inflater.inflate(R.layout.fragment_result, container, false);

              Bundle bundle = getArguments();

             response = bundle.getString("jsonResponse");
              return  view;
    }





}
