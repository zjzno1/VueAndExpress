var mongoose = require('./db.js'),
    Schema = mongoose.Schema;

var DtaSchema = new Schema({          
    data : { type: Array },
});

module.exports = mongoose.model('repeat',DtaSchema);