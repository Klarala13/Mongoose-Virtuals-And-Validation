const Schema = require("mongoose").Schema;

const areaSchema = new Schema({
  name: String,
  validate: {
    isAsync: true,
    validator: function (v, callback) {
      setTimeout(() =>{
        const result = v.length > 3;
        callback(result);
      }, 2000);
    },
    message: 'You must provide more than 3 characters.'
    },

    validate: {
      isAsync: true,
      validator: function (v, callback) {
        setTimeout(() =>{
          const result = v.length > 3;
          callback(result);
        }, 2000);
      },
      message: 'You must provide more than 3 characters.'
    },

  type: {
    type: String,
    validate: {
      isAsync: true,
      validator: function (v, callback) {
        setTimeout(() =>{
          const result = v.length > 3;
          callback(result);
        }, 2000);
      },
      message: 'You must provide more than 3 characters.'
    },
  },
  properties: {},
  geometry: {
      type: { 
        type: String,
        validate: {
          isAsync: true,
          validator: function (v, callback) {
            setTimeout(() =>{
              const result = v.length > 3;
              callback(result);
            }, 2000);
          },
          message: 'You must provide more than 3 characters.'
        }, 
      },
      coordinates: {}
  }
});
areaSchema.index({ geometry: '2dsphere' });

module.exports = areaSchema;
