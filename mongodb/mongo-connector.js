const MongoClient = require('mongodb').MongoClient;
const conf = require('config');
assert = require('assert');
var MongoConnector = function(dbname) {
 this.mongo_url =  'mongodb://localhost:27017/ParkMe';
 this.mongo_url_alerts = "mongodb://bflogadmin:safe4now@bfmongo201.innovate.ibm.com:27017/bfdata";
}

MongoConnector.prototype.getAccountsAndServicesByPersona = function(persona, callback) {

  MongoClient.connect(this.mongo_url, function(err, db) {
    if(err){

      callback({"message":err}, null);
    }
    else {
      db.collection('access_control').find({"persona": persona}, {"_id": 0, "username": 0, "password":0}).limit(1).toArray(function(err, docs) {
        if(err){

          db.close();
          callback({"message": err}, null);
        }

        if(!docs || docs.length<1){

          db.close();
          callback({"message": "No such persona"}, null);
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

MongoConnector.prototype.getOrgsByPersona = function(persona, callback) {

  MongoClient.connect(this.mongo_url, function(err, db) {
    if(err){

      callback({"message":err}, null);
    }
    else {
      db.collection('users').find({"persona": persona}, {"_id": 0, "username": 0, "password":0}).limit(1).toArray(function(err, docs) {
        if(err){

          db.close();
          callback({"message": err}, null);
        }

        if(!docs || docs.length<1){

          db.close();
          callback({"message": "No such persona"}, null);
        }
        else {
          db.close();
          callback(null, docs[0].orgs);
        }
      });
    }

    db.close();
  });
};

MongoConnector.prototype.getAccountsByOrg = function(org, callback) {

  MongoClient.connect(this.mongo_url, function(err, db) {
    if(err){

      callback({"message":err}, null);
    }
    else {
      db.collection('orgs').find({"org": org}, {"_id": 0}).limit(1).toArray(function(err, docs) {
        if(err){

          db.close();
          callback({"message": err}, null);
        }

        if(!docs || docs.length<1){

          db.close();
          callback({"message": "No such persona"}, null);
        }
        else {
          db.close();
          callback(null, docs[0].accounts);
        }
      });
    }

    db.close();
  });
};

MongoConnector.prototype.getDashboardsByService = function(service, callback) {

  MongoClient.connect(this.mongo_url, function(err, db) {
    if(err){

      callback({"message":err}, null);
    }
    else {
      db.collection('dashboards').find({"service": service}, {"_id": 0}).toArray(function(err, docs) {
        if(err){

          db.close();
          callback({"message": err}, null);
        }

        if(!docs || docs.length<1){

          db.close();
          callback({"message": "No such service"}, null);
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

MongoConnector.prototype.getAlertSettingsByPersona = function(persona, callback) {

  MongoClient.connect(this.mongo_url_alerts, function(err, db) {
    if(err){

      callback({"message":err}, null);
    }
    else {

      db.collection('webapp_settings').find({'persona':persona},{"_id": 0}).toArray(function (err, docs){
        if(err){

          db.close();
          callback({"message": err}, null);
        }

        if(!docs || docs.length<1){

          db.collection('webapp_settings').find({'persona': "default"}, {"_id": 0}).toArray(function (err, docs){
            if(err){
              db.close();
              callback({"message": err}, null);
            }

            db.close();
            callback(null, docs);
          });
        }
        else {
          db.close();
          callback(null, docs);
        }
      });
    }

    // db.close();
  });
};

MongoConnector.prototype.getLogsByName = function(adopter_name, callback) {

  MongoClient.connect(this.mongo_url_alerts, function(err, db) {
    if(err){

      callback({"message":err}, null);
    }
    else {

      db.collection('JobOutput').find({'adopter_name':adopter_name},{"_id": 0}).toArray(function (err, docs){
        if(err){

          db.close();
          callback({"message": err}, null);
        }

        if(!docs || docs.length<1){

          db.close();
          callback({"message": "No such record"}, null);
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
MongoConnector.prototype.getLogsByNameAndDate = function(adopter_name, completed_at, callback) {

  MongoClient.connect(this.mongo_url_alerts, function(err, db) {
    if(err){

      callback({"message":err}, null);
    }
    else {

      db.collection('JobOutput').find({'adopter_name':adopter_name,'completed_at':completed_at},{"_id": 0}).toArray(function (err, docs){
        if(err){

          db.close();
          callback({"message": err}, null);
        }

        if(!docs || docs.length<1){

          db.close();
          callback({"message": "No such record"}, null);
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
MongoConnector.prototype.updateLogsByNameAndDate = function(adopter_name, completed_at, callback) {

  MongoClient.connect(this.mongo_url_alerts, function(err, db) {
    if(err){

      callback({"message":err}, null);
    }
    else {

      db.collection('JobOutput').updateOne({"adopter_name":"adopter119","completed_at":"2017-03-22T15:42:24.039383"},{$set:{"jobID":"IBM143224456_summary_msgtype_2017-2-27_2017-2-28_1490211734840"}},(err, docs)=>{
        if(err){

          db.close();
          callback({"message": err}, null);
        }

        if(!docs || docs.length<1){

          db.close();
          callback({"message": "No such record"}, null);
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
MongoConnector.prototype.getLogsByJobIDAndDate = function(jobID, completed_at, callback) {

  MongoClient.connect(this.mongo_url_alerts, function(err, db) {
    if(err){

      callback({"message":err}, null);
    }
    else {

      db.collection('JobOutput').find({'jobID':jobID,'completed_at':completed_at},{"_id": 0}).toArray(function (err, docs){
        if(err){

          db.close();
          callback({"message": err}, null);
        }

        if(!docs || docs.length<1){

          db.close();
          callback({"message": "No such record"}, null);
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
MongoConnector.prototype.getAlertsQuickSummaryData = function(query,callback) {

  MongoClient.connect(this.mongo_url_alerts, function(err, db) {
    if(err){

      callback({"message":err}, null);
    }
    else {

      db.collection('mockdata').find({},{"_id": 0}).toArray(function (err, docs){
        if(err){

          db.close();
          callback({"message": err}, null);
        }

        if(!docs || docs.length<1){

          db.close();
          callback({"message": "No such record"}, null);
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
MongoConnector.prototype.getAllLogs = function(query,callback) {

  MongoClient.connect(this.mongo_url_alerts, function(err, db) {
    if(err){

      callback({"message":err}, null);
    }
    else {

      db.collection('JobOutput').find({},{"_id": 0}).toArray(function (err, docs){
        if(err){

          db.close();
          callback({"message": err}, null);
        }

        if(!docs || docs.length<1){

          db.close();
          callback({"message": "No such record"}, null);
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
            
            callback(null, true);
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

MongoConnector.prototype.getAlertSettings = function(query,callback) {

  MongoClient.connect(this.mongo_url_alerts, function(err, db) {
    if(err){

      callback({"message":err}, null);
    }
    else {

      db.collection('webapp_settings').find({},{"_id": 0}).toArray(function (err, docs){
        if(err){

          db.close();
          callback({"message": err}, null);
        }

        if(!docs || docs.length<1){

          db.close();
          callback({"message": "No such record"}, null);
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
MongoConnector.prototype.updateAlertSettings = function(persona, settings_doc, callback) {

 MongoClient.connect(this.mongo_url_alerts, function(err, db) {
    if(err){

      callback({"message":err}, null);
    }
    else {

      db.collection('webapp_settings').update({"persona": persona}, settings_doc, {upsert:true},(err, docs)=>{
        if(err){

          db.close();
          callback({"message": err}, null);
        }

        if(!docs || docs.length<1){

          db.close();
          callback({"message": "No such record"}, null);
        }
        else {
          db.close();
          callback(null, docs);
        }
      });
    }
});
}

MongoConnector.prototype.getAlertsQuickSummaryDataByDate = function(date, callback) {

  MongoClient.connect(this.mongo_url_alerts, function(err, db) {
    if(err){

      callback({"message":err}, null);
    }
    else {

      db.collection('mockdata').find({'date':date},{"_id": 0}).toArray(function (err, docs){
        if(err){

          db.close();
          callback({"message": err}, null);
        }

        if(!docs || docs.length<1){

          db.close();
          callback({"message": "No such record"}, null);
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
MongoConnector.prototype.getAlertSettingsByPersonaAndDashboard = function(persona, dashboard, callback) {

  MongoClient.connect(this.mongo_url_alerts, function(err, db) {
    if(err){

      callback({"message":err}, null);
    }
    else {

      db.collection('webapp_settings').find({'persona':persona,'dashboard':dashboard},{"_id": 0}).toArray(function (err, docs){
        if(err){

          db.close();
          callback({"message": err}, null);
        }

        if(!docs || docs.length<1){

          db.close();
          callback({"message": "No such record"}, null);
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
MongoConnector.prototype.addAlertSettings = function(body, callback) {

  MongoClient.connect(this.mongo_url_alerts, function(err, db) {

    if(err){

      callback({"message":err}, null);
    }
    else {

      db.collection('webapp_settings').insert(body, (err, docs) => {

        if(err){

          db.close();
          callback({"message": err}, null);
        }

        if(!docs || docs.length<1){

          db.close();
          callback({"message": "No such record"}, null);
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

MongoConnector.prototype.addLogs = function(body, callback) {

  MongoClient.connect(this.mongo_url_alerts, function(err, db) {

    if(err){

      callback({"message":err}, null);
    }
    else {

      db.collection('JobOutput').insert(body, (err, docs) => {

        if(err){

          db.close();
          callback({"message": err}, null);
        }

        if(!docs || docs.length<1){

          db.close();
          callback({"message": "No such record"}, null);
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
MongoConnector.prototype.addAlertQuickSummaryData = function(body, callback) {

  MongoClient.connect(this.mongo_url_alerts, function(err, db) {

    if(err){

      callback({"message":err}, null);
    }
    else {

      db.collection('mockdata').insert(body, (err, docs) => {


        if(err){

          db.close();
          callback({"message": err}, null);
        }

        if(!docs || docs.length<1){

          db.close();
          callback({"message": "No such record"}, null);
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



module.exports = MongoConnector;
