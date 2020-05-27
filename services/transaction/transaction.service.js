//"use strict";

const TransactionKafkaManager =  require('./transKafkaManager');
  

module.exports = {
	name: "transaction",

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
		 * Welcome a username
		 *
		 * @param {String} name - User name
		 */
		create: {
			params: {
				 transactionId: "string",
				 metadata: "object" 
             },
			handler(ctx) {
				  //register Transaction
				  
				 this.kafkaManager.initNewTransaction();
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

	    this.kafkaManager = new TransactionKafkaManager();
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