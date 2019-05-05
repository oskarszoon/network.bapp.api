import { sendTransaction } from './send';
import { verifyTransaction } from './verify';
import { statusCodes, returnData, returnError } from '../status-codes';

Api.addRoute('transaction/send', {
    authRequired: false
}, {
    post: {
        authRequired: true,
        action: function() {
            try {
                if (verifyTransaction(this.params.transaction)) {
                    const txId = sendTransaction(this.params.transaction);
                    return returnData(txId);
                } else {
                    return returnError("Could not verify transaction", "dataInvalid")
                }
            } catch(e) {
                return statusCodes.processingError;
            }
        }
    }
});

Api.addRoute('transaction/verify', {
    authRequired: false
}, {
    post: {
        authRequired: true,
        action: function() {
            try {
                if (verifyTransaction(this.params.transaction)) {
                    return returnData("OK");
                } else {
                    return returnError("Could not verify transaction", "dataInvalid")
                }
            } catch(e) {
                return statusCodes.processingError;
            }
        }
    }
});
