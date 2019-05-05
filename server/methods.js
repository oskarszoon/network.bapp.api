import { getBapp } from '../imports/api/bapps/get';
import { searchBapps } from '../imports/api/bapps/search';
import { sendTransaction } from '../imports/api/transactions/send';
import { verifyTransaction } from '../imports/api/transactions/verify';
import { broadcastTransaction } from '../imports/api/schemas/transaction-queue';
import { creditsAvailable, getCredits, addCredits } from '../imports/api/transactions/credits';
import Message from 'bsv/message';
import bsv from 'bsv';

Meteor.methods({
    'bapps/get'(id) {
        return getBapp(id);
    },
    'bapps/search'(searchTerm) {
        return searchBapps(searchTerm);
    },
    'transactions/send'(transaction, encryptedSecret) {
        if (!this.userId) {
            throw new Meteor.Error(404, "access denied");
        }

        if (verifyTransaction(transaction)) {
            if (creditsAvailable(this.userId, transaction)) {
                return sendTransaction(this.userId, transaction, encryptedSecret);
            } else {
                throw new Meteor.Error(500, 'No credits available for transaction');
            }
        } else {
            throw new Meteor.Error(500, 'Could not verify transaction');
        }
    },
    'transactions/verify'(transaction) {
        if (!this.userId) {
            throw new Meteor.Error(404, "access denied");
        }
        return verifyTransaction(transaction);
    },
    'credits/get'() {
        if (!this.userId) {
            throw new Meteor.Error(404, "access denied");
        }
        return getCredits(this.userId);
    },
    'credits/add'(credits) {
        // This is a fake function for now and will be integrated into in app purchase later
        if (!this.userId) {
            throw new Meteor.Error(404, "access denied");
        }
        return addCredits(this.userId, credits);
    },
    'create-user'(address, timestamp, signature) {
        check(address, String);
        check(timestamp, Number);
        check(signature, String);

        let bAddress;
        try {
            bAddress = bsv.Address.fromString(address).toObject();
        } catch (e) {
            console.error(e);
            throw new Meteor.Error(500, "Invalid address");
        }
        if (bAddress.network !== 'livenet' || bAddress.type !== 'pubkeyhash') {
            throw new Meteor.Error(500, "Invalid address");
        }

        const currentTimestamp = Math.round(+new Date()/1000);
        if (timestamp < (currentTimestamp - 30) || timestamp > currentTimestamp) {
            throw new Meteor.Error(500, "Invalid timestamp");
        }

        const message = "Create new user " + address + " " + timestamp;
        let verify;
        try {
            verify = Message.verify(message, address, signature);
        } catch(e) {
            console.log(e);
            throw new Meteor.Error(500, "Invalid signature");
        }
        if (!verify) {
            throw new Meteor.Error(500, "Invalid signature");
        }

        const existingUser = Meteor.users.findOne({address: address});
        if (existingUser) {
            throw new Meteor.Error(500, "User already exists");
        }

        return Meteor.users.insert({
            address: address
        });
    },
    'broadcast-transaction'(id) {
        broadcastTransaction(id);
    }
});
