import datapay from 'datapay';

export const sendTransaction = function(transaction, callback) {
    const paymentKeys = Meteor.settings.paymentKeys;
    const useKey = Math.floor((Math.random() * paymentKeys.length));
    datapay.send({
        data: transaction,
        pay: {
            key: paymentKeys[useKey]
        }
    }, function(result) {
        console.log('payment result', result);
        callback(null, result);
    });
};
