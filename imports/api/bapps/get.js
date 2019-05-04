import { bapps } from './bapps';

export const getBapp = function(id) {
    return _.find(bapps, (bapp) => {
        return bapp.txId === id;
    });
};
