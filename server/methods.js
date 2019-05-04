import { getBapp } from '../imports/api/bapps/get';
import { searchBapps } from '../imports/api/bapps/search';
import Message from 'bsv/message';
import bsv from 'bsv';

Meteor.methods({
    'bapps/get'(id) {
        return getBapp(id);
    },
    'bapps/search'(searchTerm) {
        return searchBapps(searchTerm);
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
    }
});
