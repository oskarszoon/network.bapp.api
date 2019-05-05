import { Transactions } from '../schemas/transactions';

export const calcCreditsNeeded = function(transaction) {
    // Need to find a better way to estimate credit costs

    // TODO: integrate nChain service call for fees

    const size = transaction.join(' ').length;
    return Math.ceil(size / 10000); // 1 credit per 10KB
};

export const creditsAvailable = function(userId, transaction) {
    // estimate costs based on size of transaction
    const creditsNeeded = calcCreditsNeeded(transaction);

    const user = Meteor.users.findOne({_id: userId}) || {};

    // this is not very good, cause if 2 transactions happen at the same time
    return user.private && user.private.credits > creditsNeeded;
};

export const deductCredits = function(userId, transaction, txId) {
    const creditCost = calcCreditsNeeded(transaction);
    Transactions.insert({
        txId,
        userId,
        creditCost,
    });

    // TODO: move this into a database hook on transaction insert...
    Meteor.users.update({
        _id: userId
    },{
        $inc: {
            'private.credits': -1 * creditCost
        }
    });
};

export const getCredits = function(userId) {
    const user = Meteor.users.findOne({_id: userId});
    if (user && user.private) {
        return user.private.credits;
    }

    return 0;
};

export const addCredits = function(userId, credits) {
    Meteor.users.update({
        _id: userId
    },{
        $inc: {
            'private.credits': credits
        }
    });

    return Meteor.users.findOne({_id: userId}).private.credits;
};
