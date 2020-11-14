const offersCollection = require('../models/offerSchema');

module.exports = {

    add: (request, response) => {
        const body = request.body;
        const offer = new offersCollection(body);

        offer.save((error) => {
            if(error) {
                return response.status(400).send(error);
            }
            return response.status(201).send(offer);
        });
    },

    get: (request, response) => {
        offersCollection.find((error, offers) => {
            if(error) {
                return response.status(400).send(error);
            }
            return response.status(200).send(offers);
        });
    },

    remove: (request, response) => {
        const idParam = request.params.id;
        offersCollection.findByIdAndDelete(idParam, (error, offer) => {
            if(error) {
                return response.status(500).send(error);
            } else if(offer) {
                return response.status(200).send('Oferta cancelada!');
            }
            return response.sendStatus(404);
        });
    },

    edit: (request, response) => {
        const idParam = request.params.id;
        const body = request.body;
        const options = { new: true };

        offersCollection.findByIdAndUpdate(
            idParam, body, options, (error, offer) => {
                if(error) {
                    return response.status(500).send(error);
                } else if(offer) {
                    return response.status(200).send(offer);
                }
                return response.sendStatus(404);
            }
        );
    }

};