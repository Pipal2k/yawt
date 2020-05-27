const registryUrl = 'http://localhost:8081'
const avro = require('avsc')
const registry = require('avro-schema-registry')(registryUrl)
var Kafka = require('node-rdkafka');
const request = require('request')



var topicName = 'transactions'; 

//counter to stop this sample after maxMessages are sent
var counter = 0;
var maxMessages = 100;

var producer = new Kafka.HighLevelProducer({
  //'debug' : 'all',
  'metadata.broker.list': 'localhost:9092',
  'dr_cb': true  //delivery report callback
});

; (async () => {


const schemas = {
    key: await fetchSchema(registryUrl, `${topicName}-key`, 1),
    value: await fetchSchema(registryUrl, `${topicName}-value`, 1)
}

  producer.setValueSerializer(async function (v) {
    return Buffer.from(await registry.encodeMessage(topicName, schemas.value, v.payload));
  });

  producer.setKeySerializer(async function (v) {
    return Buffer.from(await registry.encodeKey(topicName, schemas.key, v.key));
  });

  //logging debug messages, if debug is enabled
producer.on('event.log', function (log) {
  console.log(log);
});

//logging all errors
producer.on('event.error', function (err) {
  console.error('Error from producer');
  console.error(err);
});


producer.on('delivery-report', function (err, report) {
  console.log('delivery-report: ' + JSON.stringify(report));
  counter++;
});

//Wait for the ready event before producing
producer.on('ready', function (arg) {
  console.log('producer ready.' + JSON.stringify(arg));

  for (var i = 0; i < maxMessages; i++) {
    //var value = Buffer.from('Test-' + i);
    var value = {
      document: 'First' + i
   }

   //var key = i;

   var keyX = { transId: i.toString()}
   
    // if partition is set to -1, librdkafka will use the default partitioner
    var partition = -1;
    
    var headers = [
      { header: i.toString() }
    ]
    
    /*producer.produce(topicName, partition, value, key, Date.now(), "", headers, function(err, offset) {
      // The offset if our acknowledgement level allows us to receive delivery offsets
      setImmediate(function() {
       // producer.disconnect();
      });
    });*/

    producer.produce(topicName, partition, {payload: value}, {key: keyX}, Date.now(),  function(err, offset) {
        if(err)
         console.log("Error during producing "+err);   
    });
    
  }

  //need to keep polling for a while to ensure the delivery reports are received
  var pollLoop = setInterval(function () {
    producer.poll();
    if (counter === maxMessages) {
      clearInterval(pollLoop);
      producer.disconnect();
    }
  }, 1000);

});

producer.on('disconnected', function (arg) {
  console.log('producer disconnected. ' + JSON.stringify(arg));
});





//starting the producer
producer.connect();
 
})()

/*var fetchSchema = async function(registryUrl, topic, version) {
  return new Promise((resolve, reject) => {
    request(
      `${registryUrl}/subjects/${topic}/versions/${version}/schema`,
      (err, res, body) => {
        if (res.statusCode !== 200) {
          const error = JSON.parse(res.data)
          return reject(
            new Error(
              `Schema registry error: ${error.error_code} - ${error.message}`
            )
          )
        }
        resolve(JSON.parse(body))
      }
    )
  })
}*/

function fetchSchema(registryUrl, topic, version) {
  return new Promise((resolve, reject) => {
      request(
          `${registryUrl}/subjects/${topic}/versions/${version}/schema`,
          (err, res, body) => {
              if (res.statusCode !== 200) {
                  const error = JSON.parse(res.data)
                  return reject(
                      new Error(
                          `Schema registry error: ${error.error_code} - ${error.message}`
                      )
                  )
              }
              resolve(JSON.parse(body))
          }
      )
  })
}




/*producer.setKeySerializer(function (v) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(null);
    }, 20);
  });
});*/









/*producer.connect(null, function() {
  producer.produce('test', null, {
    message: 'alliance4ever',
  }, null, Date.now(), function(err, offset) {
    // The offset if our acknowledgement level allows us to receive delivery offsets
    setImmediate(function() {
      producer.disconnect();
    });
  });
});*/