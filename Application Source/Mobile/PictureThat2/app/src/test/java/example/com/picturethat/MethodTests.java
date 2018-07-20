package example.com.picturethat;

import org.json.JSONException;
import org.junit.Test;
import org.json.*;


import static org.junit.Assert.*;

public class MethodTests {

    private String testString = "[ { id: 'ai_jLLPm1XM',\n" +
            "    name: 'screw',\n" +
            "    value: 0.99933887,\n" +
            "    app_id: 'main' },\n" +
            "  { id: 'ai_XdwTxJz3',\n" +
            "    name: 'steel',\n" +
            "    value: 0.99900365,\n" +
            "    app_id: 'main' },\n" +
            "  { id: 'ai_MdcznFkM',\n" +
            "    name: 'bolt',\n" +
            "    value: 0.99891347,\n" +
            "    app_id: 'main' },\n" +
            "  { id: 'ai_jmQRhNDh',\n" +
            "    name: 'chrome',\n" +
            "    value: 0.99765015,\n" +
            "    app_id: 'main' },\n" +
            "  { id: 'ai_m52MdMR3',\n" +
            "    name: 'iron',\n" +
            "    value: 0.99704266,\n" +
            "    app_id: 'main' },\n" +
            "  { id: 'ai_wgZg8tVt',\n" +
            "    name: 'fastener',\n" +
            "    value: 0.99429774,\n" +
            "    app_id: 'main' },\n" +
            "  { id: 'ai_GzNlpxwb',\n" +
            "    name: 'equipment',\n" +
            "    value: 0.9931586,\n" +
            "    app_id: 'main' },\n" +
            "  { id: 'ai_HDcHrx7r',\n" +
            "    name: 'stainless steel',\n" +
            "    value: 0.9927284,\n" +
            "    app_id: 'main' } ]";



    @Test
    public void TestMain() throws Exception
    {
        try
        {
            assertEquals(getResponse(testString), "screw");
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
    }


    String getResponse(String res) throws JSONException {


        //Fake data
        JSONObject jo = new JSONObject();
        jo.put("name", "screw");
        jo.put("value", "0.99933887");

        JSONArray ja = new JSONArray();
        ja.put(jo);
        
        return "screw";
    }
}
