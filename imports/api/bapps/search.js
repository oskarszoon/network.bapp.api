import { bapps } from './bapps';
import { Base64 } from 'meteor/base64';
import { HTTP } from 'meteor/http';

export const _searchBapps = function(searchTerm) {
    const results = [];
    const regex = new RegExp(searchTerm, 'i');

    _.each(bapps, (bapp) => {
        const name = bapp.name || "";
        const description = bapp.description || "";
        if (!searchTerm || name.match(regex) || description.match(regex)) {
            results.push(bapp);
        }
    });

    return results;
};

export const searchBapps = function(searchTerm) {
    const query = {
        v: 3,
        q: {
            find: {
                'out.s1': "1BappGysvZJ6iE5PgXUnA6S4XsGbWDSodr",
                'out.s3': { $regex: "^" + searchTerm + ".*",  }
            },
            skip: 0,
            limit: 99,
        }
    };
    const bQuery = Base64.encode(JSON.stringify(query));
    const url = `https://genesis.bitdb.network/q/1FnauZ9aUH2Bex6JzdcV4eNX7oLSSEbxtN/${bQuery}`;

    const response = HTTP.get(url, {
        headers: {
            key: '1KJPjd3p8khnWZTkjhDYnywLB2yE1w5BmU',
        },
    });

    const bapps = {};
    if (response && response.data && response.data.c) {
        _.each(response.data.c, (bapp) => {
            try {
                const out = bapp.out[0]; // first output
                // dedupe by protocol address
                // TODO: make this more intelligent
                bapps[out.s2+out.s3] = {
                    txId: bapp.tx.h,
                    protocolAddress: out.s2,
                    name: out.s3,
                    description: out.s4,
                    definition: JSON.parse(out.s5)
                };
            } catch(e) {
                console.error(e);
            }
        });
    }

    return _.values(bapps);
};
