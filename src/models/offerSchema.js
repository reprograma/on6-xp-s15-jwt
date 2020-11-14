const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OfferSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
        required: true
    },
    offerType: {
        type: String,
        enum: ['product', 'service']
    },
    description: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true
    }
});

const OffersCollections = mongoose.model('offer', OfferSchema);

module.exports = OffersCollections;