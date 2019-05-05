const MAX_OP_RETURN = 100000;
export const verifyTransaction = function(transaction) {
    if (!_.isArray(transaction) || transaction.length < 2) {
        return false;
    }

    return transaction.join(' ').length < MAX_OP_RETURN;
};
