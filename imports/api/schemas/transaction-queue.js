import { Meteor } from 'meteor/meteor';
import datapay from 'datapay';

export const TransactionQueue = new Meteor.Collection('transaction-queue');

export const broadcastTransaction = function(transactionId) {
    const transaction = TransactionQueue.findOne({_id: transactionId});
    if (!transaction) {
        throw new Meteor.Error(404, "Could not find transaction");
    }
    if (transaction.broadcastAt) {
        throw new Meteor.Error(500, "Transaction already broadcasted");
    }

    console.log('Broadcasting transaction', transactionId, transaction.txId);

    const paymentKeys = Meteor.settings.paymentKeys;
    // selected a key at random
    const useKey = Math.floor((Math.random() * paymentKeys.length));

    datapay.send({
        tx: transaction.tx,
        pay: {
            key: paymentKeys[useKey]
        }
    }, Meteor.bindEnvironment((err, hash) => {
        // hash contains the transaction hash after the broadcast
        if (err) {
            console.error(err);
        } else {
            TransactionQueue.update({
                _id: transaction._id
            },{
                $set: {
                    broadcastAt: new Date(),
                    broadcastHash: hash
                }
            });
        }
    }));
};

Meteor.setInterval(() => {
    // quick and naive implementation of the queue processing
    // try every 60 seconds to send 1 transaction - just for being able to test
    TransactionQueue.find({
        broadcastAt: {
            $exists: false
        }
    }, {
        limit: 1
    }).forEach((queueItem) => {
        broadcastTransaction(queueItem._id);
    });
}, 60000);
