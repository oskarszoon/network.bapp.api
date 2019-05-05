export const verifyTransaction = function(transaction) {
    if (!_.isArray(transaction) || transaction.length < 2) {
        return false;
    }

    return true;
};
