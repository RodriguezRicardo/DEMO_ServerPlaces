var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb+srv://Lorenzo:casada11@learnandtravel.qzfpb.mongodb.net/LearnAndTravel?retryWrites=true&w=majority'

/* GET users listing. */
router.get('/:yMin/:xMin/:yMax/:xMax', function (req, res, next) {
    console.log(req.params); //Leggo i parametri passati all'url
    yMin = req.params.yMin;
    xMin = req.params.xMin;
    yMax = req.params.yMax;
    xMax = req.params.xMax;

    yMinFloat = parseFloat(yMin);
    xMinFloat = parseFloat(xMin);
    yMaxFloat = parseFloat(yMax);
    xMaxFloat = parseFloat(xMax);

   
    

    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(searchPlace);
        
        function searchPlace(err){
            if (err) console.log("connesione al db non riuscita");
            else{
                const collection = client.db("LearnAndTravel").collection("Places");
               
                collection.find({$and:[{'Coordinate.Latitudine' : {'$gt': yMinFloat, '$lt': yMaxFloat}},{'Coordinate.Longitudine':{'$gt': xMinFloat, '$lt': xMaxFloat}}]}).toArray(callBackQuery);
            }

        }  
        function callBackQuery(err, result){
            if (err) console.log(err.message);
            else res.send(result);
            client.close();
        }
}); 





module.exports = router;
