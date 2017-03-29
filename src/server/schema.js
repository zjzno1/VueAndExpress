var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var DtaSchema = new Schema({          
    stage : { type: String },
    date : { type: String },
    ball: {type: Array}
});

module.exports = mongoose.model('data',DtaSchema);