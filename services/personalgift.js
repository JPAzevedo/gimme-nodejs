const sharp = require('sharp');
const fs = require('fs');
const https = require('https');
const Stream = require('stream').Transform;

var obj = [{
  userId: "user_id_1",
  userName: "John Smith",
  userPhotoUrl: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/256/user-male-icon.png",
  id: "gift_a31d210d",
  name: "PS4",
  description: "I\'d love to have a PS4",
  currency: "€",
  price: 250.50,
  url: "https://www.fnac.pt/mp10882408/Sony-PlayStation-4-Slim-500GB-500GB-Wi-Fi-Preto?origin=google_pla_mkt_cons&gclid=CjwKCAjwp_zkBRBBEiwAndwD9dTq_Wu_qpH1Cle0KYma42FuyRSI8vj9X8ApmqaJGLvTrRpryiZuFhoCrdEQAvD_BwE",
  imageUrl: "http://192.168.1.65:3000/app-images/image-1.jpg"
},
{
  userId: "user_id_2",
  userName: "John Bigodes",
  userPhotoUrl: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/256/user-male-icon.png",
  id: "gift_a31d23ed",
  name: "Screen Protector",
  description: "My screen needs this",
  currency: "€",
  price: 10.50,
  url: "https://www.fnac.pt/mp11962747/Pelicula-Ecra-Vidro-Temperado-Advansia-para-Apple-iPhone-X-10-Proteccao-Total?omnsearchpos=1",
  imageUrl: "http://192.168.1.65:3000/app-images/image-1.jpg"
},
{
  userId: "user_id_2",
  userName: "John Bigodes",
  userPhotoUrl: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/256/user-male-icon.png",
  id: "gift_a31d23ed",
  name: "Screen Protector",
  description: "My screen needs this",
  currency: "€",
  price: 10.50,
  url: "https://www.fnac.pt/mp11962747/Pelicula-Ecra-Vidro-Temperado-Advansia-para-Apple-iPhone-X-10-Proteccao-Total?omnsearchpos=1",
  imageUrl: "http://192.168.1.65:3000/app-images/image-1.jpg"
},
{
  userId: "user_id_3",
  userName: "John Bigodes",
  userPhotoUrl: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/256/user-male-icon.png",
  id: "gift_a31d23ed",
  name: "Screen Protector",
  description: "My screen needs this",
  currency: "€",
  price: 10.50,
  url: "https://www.fnac.pt/mp11962747/Pelicula-Ecra-Vidro-Temperado-Advansia-para-Apple-iPhone-X-10-Proteccao-Total?omnsearchpos=1",
  imageUrl: "http://192.168.1.65:3000/app-images/image-1.jpg"
},
{
  userId: "user_id_6",
  userName: "John Bigodes",
  userPhotoUrl: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/256/user-male-icon.png",
  id: "gift_a31d23ed",
  name: "Screen Protector",
  description: "My screen needs this",
  currency: "€",
  price: 10.50,
  url: "https://www.fnac.pt/mp11962747/Pelicula-Ecra-Vidro-Temperado-Advansia-para-Apple-iPhone-X-10-Proteccao-Total?omnsearchpos=1",
  imageUrl: "http://192.168.1.65:3000/app-images/image-1.jpg"
},
{
  userId: "user_id_5",
  userName: "John Bigodes",
  userPhotoUrl: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/256/user-male-icon.png",
  id: "gift_a31d23ed",
  name: "Screen Protector",
  description: "My screen needs this",
  currency: "€",
  price: 10.50,
  url: "https://www.fnac.pt/mp11962747/Pelicula-Ecra-Vidro-Temperado-Advansia-para-Apple-iPhone-X-10-Proteccao-Total?omnsearchpos=1",
  imageUrl: "http://192.168.1.65:3000/app-images/image-1.jpg"
},
{
  userId: "user_id_5",
  userName: "John Bigodes",
  userPhotoUrl: "https://tinyurl.com/y6jgjpaq",
  id: "gift_a31d23eds",
  name: "Screen Protector",
  description: "My screen needs this",
  currency: "€",
  price: 10.50,
  url: "https://www.fnac.pt/mp11962747/Pelicula-Ecra-Vidro-Temperado-Advansia-para-Apple-iPhone-X-10-Proteccao-Total?omnsearchpos=1",
  imageUrl: "https://tinyurl.com/y6jgjpaq"
},
{
  userId: "user_id_5",
  userName: "John Bigodes",
  userPhotoUrl: "https://tinyurl.com/y6jgjpaq",
  id: "gift_asfd23eds",
  name: "Screen Protector",
  description: "My screen needs this",
  currency: "€",
  price: 10.50,
  url: "https://www.fnac.pt/mp11962747/Pelicula-Ecra-Vidro-Temperado-Advansia-para-Apple-iPhone-X-10-Proteccao-Total?omnsearchpos=1",
  imageUrl: "https://tinyurl.com/y6jgjpaq"
}
];


function getPersonalGiftList(res,rep){
  getImages();
  rep.status(200);
  rep.append("content-type","application/json")
  rep.send(JSON.stringify(obj));
  console.log(obj);
}

function getImages(){
  var url = "https://lalarebelo.com/wp-content/uploads/2017/07/as-ilhas-mais-lindas-do-caribe-turks-and-caicos-lala-rebelo.jpg";
  var outputFile = __dirname+"/../public/app-images/image-1.jpg";
  var inputFile = __dirname+"/../public/app-images/image-test.jpg";

  try {
    if (!fs.existsSync(outputFile)) {

      https.get(url, function(response) {
        var data = new Stream();

        response.on('data', function(chunk) {
          data.push(chunk);
        });

        response.on('end', function() {
          console.log("writing file...");
          fs.writeFileSync(__dirname+'/../public/app-images/image-test.jpg', data.read());
          resizeImage(inputFile,outputFile);
          console.log("File was written!");
        });
      }).end();

    }
  } catch(err) {
    console.error(err)
  }
}

function resizeImage(inputFile, outputFile){
  sharp(inputFile).resize({ height: 1080 }).toFile(outputFile)
    .then(function(newFileInfo) {
        // newFileInfo holds the output file properties
        console.log("Success")
    })
    .catch(function(err) {
        console.log("Error occured: "+err);
    });
}

module.exports.getPersonalGiftList = getPersonalGiftList;
module.exports.saveImages = getImages;
