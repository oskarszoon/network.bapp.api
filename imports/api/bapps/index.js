import { searchBapps } from './search';
import { getBapp } from './get';
import { statusCodes, returnData } from '../status-codes';

Api.addRoute('bapps/search/:searchTerm', {
    authRequired: false
}, {
    get: {
        authRequired: false,
        action: function() {
            try {
                const searchTerm = this.urlParams.searchTerm;
                const bapps = searchBapps(searchTerm);
                return returnData(bapps);
            } catch(e) {
                return statusCodes.processingError;
            }
        }
    }
});

Api.addRoute('bapps/:id', {
    authRequired: false
}, {
    get: {
        authRequired: false,
        action: function() {
            try {
                const id = this.urlParams.id;
                const bapp = getBapp(id);
                if (!bapp) {
                    return statusCodes.notFound;
                }
                return returnData(bapp);
            } catch(e) {
                return statusCodes.processingError;
            }
        }
    }
});
