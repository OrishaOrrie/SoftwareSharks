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


        //TODO: Fix setPic on result page

        Bitmap bitmap = BitmapFactory.decodeFile(ex.getString("Photopath"));
        ivDisplayResPicture.setImageBitmap(bitmap);

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

}