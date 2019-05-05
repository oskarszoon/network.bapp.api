import datapay from 'datapay';
import { deductCredits } from './credits';

const _sendTransaction = function(userId, transaction, encryptedSecret, callback) {
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
};
export const sendTransaction = Meteor.wrapAsync(_sendTransaction);
