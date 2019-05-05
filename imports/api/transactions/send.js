import datapay from 'datapay';
import { deductCredits } from './credits';
import { TransactionQueue } from '../schemas/transaction-queue';

const _sendTransaction = function(userId, transaction, encryptedSecret, callback) {
    /*
    const paymentKeys = Meteor.settings.paymentKeys;
    const useKey = Math.floor((Math.random() * paymentKeys.length));

    datapay.send({
        data: transaction,
        pay: {
            key: paymentKeys[useKey]
        }
    }, Meteor.bindEnvironment((err, hash) => {
        console.log('payment result', err, hash);
        if (err) {
            callback(err);
        } else {
            deductCredits(userId, transaction, hash, encryptedSecret);
            callback(null, hash);
        }
    }));
    */

    datapay.build({
        data: transaction,
    }, Meteor.bindEnvironment((err, tx) => {
        if (err) {
            callback(err);
        } else {
            console.log(transaction, tx.toObject());
            // Have to use a queue for now
            // Cannot send too many large transactions in 1 chain to the blockchain
            TransactionQueue.insert({
                txId: tx.hash,
                tx: tx.toString()
            }, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    deductCredits(userId, transaction, tx.hash, encryptedSecret);
                    callback(null, tx.hash);
                }
            });
        }
    }));
};
export const sendTransaction = Meteor.wrapAsync(_sendTransaction);
