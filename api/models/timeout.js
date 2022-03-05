var mongoose  =  require('mongoose');

var timeoutSchema = new mongoose.Schema({
    Code: {
        type : String,
    },
    Country: {
        type : String, 
    },
    Timeout: {
        type: String, 
    },
    updated_at: { 
        type: Date, 
        default: Date.now
      }
});

module.exports = mongoose.model('Timeout',timeoutSchema);