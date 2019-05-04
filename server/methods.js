import { getBapp } from '../imports/api/bapps/get';
import { searchBapps } from '../imports/api/bapps/search';

Meteor.methods({
    'bapps/get'(id) {
        return getBapp(id);
    },
    'bapps/search'(searchTerm) {
        return searchBapps(searchTerm);
    }
});
