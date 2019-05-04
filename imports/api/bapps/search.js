import { bapps } from './bapps';

export const searchBapps = function(searchTerm) {
    const results = [];
    const regex = new RegExp(searchTerm, 'i');
    _.each(bapps, (bapp) => {
        const name = bapp.name || "";
        const description = bapp.description || "";
        if (name.match(regex) || description.match(regex)) {
            results.push(bapp);
        }
    });

    return results;
};
