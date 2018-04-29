package example.com.picturethat;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.ImageView;
import android.widget.TextView;

import java.text.DecimalFormat;

public class results_activity extends AppCompatActivity {

    ImageView ivDisplayResPicture;


    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.results_activity);

        ivDisplayResPicture = findViewById(R.id.ivDisplayResPicture);

        Bundle ex =  getIntent().getExtras();

        System.out.println("Photo Path: " + ex.getString("Photopath"));

        //TODO: Fix setPic on result page
        //setPic(ex.getString("Photopath"));

        TextView editResult = (TextView) findViewById(R.id.TextViewResult);
        String[] Names = ex.getStringArray("Names");
        String[] Values = ex.getStringArray("Values");

        for(int n = 0; n < Names.length; n++)
        {
            DecimalFormat decimalFormat = new DecimalFormat("#.##");
            float out = Float.valueOf(decimalFormat.format(Float.parseFloat(Values[n])*100));

            editResult.append(Names[n] + " " + out + "%");
            editResult.append("\n");
        }
        //editResult.setText(getIntent().getExtras().toString());
    }

    private void setPic(String mCurrentPhotoPath) {
        // Get the dimensions of the View
        int targetW = ivDisplayResPicture.getWidth();
        int targetH = ivDisplayResPicture.getHeight();

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
        ivDisplayResPicture.setImageBitmap(bitmap);
    }
}