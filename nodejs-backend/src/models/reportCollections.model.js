
    module.exports = function (app) {
        const modelName = 'report_collections';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            testName: { type:  String , required: true, minLength: null, maxLength: null },
targetUrl: { type:  String , required: true, minLength: null, maxLength: null },
status: { type:  String , required: true, minLength: null, maxLength: null },
additionalNotes: { type:  String , required: true, minLength: null, maxLength: null },
dateStarted: { type: Date, required: false },
dateCompleted: { type: Date, required: false },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };