var kafka = require("kafka-node");

module.exports = class TransactionKafkaManager {

  constructor() {
    this.Producer = kafka.Producer;
    this.HighLevelProducer = kafka.HighLevelProducer;
    this.client = new kafka.KafkaClient();

    const options = {
      // Configuration for when to consider a message as acknowledged, default 1
      requireAcks: 1,
      // The amount of time in milliseconds to wait for all acks before considered, default 100ms
      ackTimeoutMs: 100,
      // Partitioner type (default = 0, random = 1, cyclic = 2, keyed = 3, custom = 4), default 0
      partitionerType: 3
    }

     this.producer = new this.HighLevelProducer(this.client,options);
  }
  /*set name(name) {
    this._name = name.charAt(0).toUpperCase() + name.slice(1);
  }
  get name() {
    return this._name;
  }*/
  initNewTransaction() {

    
    var payloads = [
      { topic: "transactions",key: "hi", messages: `I have cats`  }
    ];

    this.producer.send(payloads, function(err, data) {
      console.log(data);
      console.log(err);
      //count += 1;
    });

  }
}

  //module.exports.TransactionKafkaManager = TransactionKafkaManager; 