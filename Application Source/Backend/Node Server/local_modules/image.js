module.exports.predictImage = function (image_url, callback) {
    const Clarifai = require('clarifai')

    const app = new Clarifai.App({
    apiKey: 'f62c9b0b74db45199506a05366548a0b'
    })
    //"https://samples.clarifai.com/metro-north.jpg"
    // {base64: "G7p3m95uAl..."}
    //var toBase64 = '{base64: "' + image_url +'"}';
    console.log('--------------')
    console.log('Image Request Recieved:')
    console.log('--------------')
    console.log('URL: ' + image_url) 
    app.models.predict(Clarifai.GENERAL_MODEL, image_url).then(
        function(response) {
          console.log('--------------')
          console.log('Image Request Recieved:')
          console.log('--------------')
          console.log('URL: ' + image_url)
          console.log('Model: ' + Clarifai.GENERAL_MODEL)
          console.log('Response: ' + response.outputs[0].data.concepts)
          //return JSON.stringify(response)
          callback(response.outputs[0].data.concepts)
        },
        function(err) {
            console.log('--------------')
            console.log('Error Logged:')
            console.log('--------------')
            console.log('Module: image.js')
            console.log(err)
            var errorText = '{ error : ' + err + '}'
            //return JSON.stringify(errorText)
            callback(errorText)
        }
      );
};