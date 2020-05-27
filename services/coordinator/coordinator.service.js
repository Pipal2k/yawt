"use strict";
const KafkaAvro = require('kafka-node-avro');

module.exports = {
	name: "coordinator",

	/**
	 * Service settings
	 */
	settings: {

	},

	/**
	 * Service dependencies
	 */
	dependencies: [],	

	/**
	 * Actions
	 */
	actions: {

		/**
		 * Say a 'Hello'
		 *
		 * @returns
		 */
		async hello(ctx) {
			const payload = `hallo from Greeter du sack@${this.broker.nodeID}`;
            const number = await ctx.call("helper.random");

			ctx.emit("hello.called",{payload,number});
			return {payload, number};

		},
		/**
		 * Welcome a username
		 *
		 * @param {String} name - User name
		 */
		save: {
			params: {
				 metadata: "object"
				    
             },
			handler(ctx) {
                //Init Transaction use ctx.id 
				//transaction in kafka schreiben
				const Settings  = {
					"kafka" : {
					  "kafkaHost" : "localhost:9092"
					},
					"schema": {
					  "registry" : "http://localhost:8081"
					}
				  };


				  
				  KafkaAvro.init(Settings).then( kafka => {
					// ready to use
					

					kafka.send({
						topic    : 'transactions',
						key: 1,
						messages : {
						  documents : 'hallo',
						  asdasd: 'asdsd',
						  asd:"sd"
						}
					  }).then( success => {
						console.log("Success");
						// Message was sent encoded with Avro Schema
					  }, error => {
						// Something wrong happen
						console.log("Error");
					  });


				  } , error => {
					  console.log("Error");
					// something wrong happen
				  });
				
				return `Welcome, ${ctx.params.metadata.document}`;
			}
		}
	},

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: {

	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	started() {

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	stopped() {
		

	}
};