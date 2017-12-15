const MongoClient = require('mongodb').MongoClient;
const conf = require('config');
assert = require('assert');
var MongoConnector = function(dbname) {
 this.mongo_url =  'mongodb://localhost:27017/ParkMe';
 this.mongo_url_alerts = "mongodb://bflogadmin:safe4now@bfmongo201.innovate.ibm.com:27017/bfdata";
}

MongoConnector.prototype.getUserParkMe = function(query,callback) {
  // callback({"message": err}, null);
  var findDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('Users');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      callback(null,docs);
    });
  }

  
  
    MongoClient.connect("mongodb://localhost:27017/ParkMe", function(err, db) {
      if(err){
        console.log("Error connecting server");
        callback({"message":err}, null);
      }
      else {
        db.collection('Users').find({'Username':query.Username,'Password':query.Password}).toArray(function (err, docs){
          if(err){
            
            db.close();
            callback({"message": err}, null);
          }
  
          if(!docs || docs.length<1){
  
            db.close();
            //callback(null, query);
            callback(null, false);
          }
          else {
            db.close();
            
            callback(null, docs[0]);
          }
        });

      }
  
      db.close();
    });
  };


  
MongoConnector.prototype.getPrivateParkings = function(query,callback) {
  // callback({"message": err}, null);
  var findDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('PrivateParking');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      callback(null,docs);
    });
  }

  
  
    MongoClient.connect("mongodb://localhost:27017/ParkMe", function(err, db) {
      if(err){
        console.log("Error connecting server");
        callback({"message":err}, null);
      }
      else {
        db.collection('PrivateParking').find({}).toArray(function (err, docs){
          if(err){
            
            db.close();
            callback({"message": err}, null);
          }
  
          if(!docs || docs.length<1){
  
            db.close();
            //callback(null, query);
            callback(null, []);
          }
          else {
            db.close();
            
            callback(null, docs);
          }
        });

      }
  
      db.close();
    });
  };

  MongoConnector.prototype.getMyParkingHistory = function(query,callback) {
    // callback({"message": err}, null);
    var findDocuments = function(db, callback) {
      // Get the documents collection
      var collection = db.collection('userParkingDetails');
      // Find some documents
      collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs)
        callback(null,docs);
      });
    }
  
    
    
      MongoClient.connect("mongodb://localhost:27017/ParkMe", function(err, db) {
        if(err){
          console.log("Error connecting server");
          callback({"message":err}, null);
        }
        else {
          db.collection('userParkingDetails').find({"userId":query.userId}).toArray(function (err, docs){
            if(err){
              
              db.close();
              callback({"message": err}, null);
            }
    
            if(!docs || docs.length<1){
    
              db.close();
              //callback(null, query);
              callback(null, []);
            }
            else {
              db.close();
              
              callback(null, docs);
            }
          });
  
        }
    
        db.close();
      });
    };

   
MongoConnector.prototype.setUserParkMe = function(query,callback) {
  // callback({"message": err}, null);
  var findDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('PrivateParking');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      callback(null,docs);
    });
  }

  
  
    MongoClient.connect("mongodb://localhost:27017/ParkMe", function(err, db) {
      if(err){
        console.log("Error connecting server");
        callback({"message":err}, null);
      }
      else {

          // Get the documents collection
          var collection = db.collection('Users');
          // Insert some documents
          collection.insertMany([
            {'Username':query.Username,'Password':query.Password}
          
          ], function(err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            assert.equal(1, result.ops.length);
            console.log("Inserted 2 documents into the collection");
            callback(null,"Success");
          });
        

      }
  
      db.close();
    });
  };

  

  MongoConnector.prototype.bookParkings = function(query,callback) {
    // callback({"message": err}, null);
  
    var findDocuments = function(db, callback) {
      // Get the documents collection
      var collection = db.collection('userParkingDetails');
      // Find some documents
      collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs)
        callback(null,docs);
      });
    }
  
    
    
      MongoClient.connect("mongodb://localhost:27017/ParkMe", function(err, db) {
        if(err){
          console.log("Error connecting server");
          callback({"message":err}, null);
        }
        else {
          console.log("reached");
            // Get the documents collection
            var collection = db.collection('userParkingDetails');
            // Insert some documents
            collection.insertMany([
              {'userId':query.userId,'locationId':query.locationId,'Name':query.name,'startTime':query.startTime,'endTime':query.endTime}
            
            ], function(err, result) {
              assert.equal(err, null);
              assert.equal(1, result.result.n);
              assert.equal(1, result.ops.length);
             // console.log("Inserted 2 documents into the collection");
              callback(null,"Success");
            });
          
  
        }
    
        db.close();
      });
    };

    MongoConnector.prototype.shareParking = function(query,callback) {
      // callback({"message": err}, null);
    
      var findDocuments = function(db, callback) {
        // Get the documents collection
        var collection = db.collection('PrivateParking');
        // Find some documents
        collection.find({}).toArray(function(err, docs) {
          assert.equal(err, null);
          console.log("Found the following records");
          console.log(docs)
          callback(null,docs);
        });
      }
    
      
      
        MongoClient.connect("mongodb://localhost:27017/ParkMe", function(err, db) {
          if(err){
            console.log("Error connecting server");
            callback({"message":err}, null);
          }
          else {
           
              // Get the documents collection
              console.log(query.latitude);
              console.log(query.longitude);
              console.log(query.name);
              console.log(query.startTime);
              console.log(query.endTime);

              var collection = db.collection('PrivateParking');
              // Insert some documents
              collection.insertMany([
                {'userId':"query.userId",'Latitude':40.726932,'Longitude':-74.06857200000002,'Name':query.name,'startTime':query.startTime,'endTime':query.endTime}
              
              ], function(err, result) {
                assert.equal(err, null);
                assert.equal(1, result.result.n);
                assert.equal(1, result.ops.length);
               // console.log("Inserted 2 documents into the collection");
                callback(null,"Success");
              });
            
    
          }
      
          db.close();
        });
      };


module.exports = MongoConnector;
