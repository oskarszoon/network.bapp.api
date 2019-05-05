export const bapps = [];

/*
bapps.push({
    txId: "11614d6c694d1c4d17929c3d4779191f4533e239c84668dd0a05cb3e39563c81",
    protocolAddress: "19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut",
    name: "Bitstagram",
    description: "Post an image from Bapps directly to the Bitstagram feed",
    definition: {
        version: 1,
        inputFields: [
            {
                id: "image",
                type: "image",
                required: true,
                output: "base64"
            }
        ],
        protocol: [
            {
                dataElement: "image.data",
                process: "base64atob"
            },
            "${image.type}",
            "binary",
            "${image.fileName}"
        ],
        template: '<div class="image"><img src="data:${s3};base64,${lb2}" /></div>',
        encrypt: false,
        sign: false,
        website: 'https://bitstagram.bitdb.network',
        logo: 'https://bitstagram.bitdb.network/bitstagram.png'
    }
});

bapps.push({
    txId: "a370e267830e304339b98d3fa32cb809dfad426ed535cd47325ceb272df34204",
    protocolAddress: "19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut",
    name: "B protocol",
    description: "Post any file to the blockchain",
    definition: {
        version: 1,
        inputFields: [
            {
                id: "file",
                type: "file",
                required: true,
                output: "base64"
            }
        ],
        protocol: [
            {
                dataElement: "file.data",
                process: "base64atob"
            },
            "${file.type}",
            "binary",
            "${file.fileName}"
        ],
        template: '<div class="file"><a href="b://${h}">${s5}</a></div>',
        encrypt: false,
        sign: false,
        website: 'https://github.com/unwriter/B',
        logo: 'https://api.bapp.network/images/b/logo.png'
    }
});

bapps.push({
    txId: "2b766f55becfa47a09b5cd2389b1be975ebe2bed3c2dba932354aa9a7a610d80",
    protocolAddress: "1Simsqfg7zu7uhgbaZoKjwKgsHCYEssBD",
    name: "Site Inspector",
    description: "Create an inspection report for a site",
    definition: {
        version: 1,
        inputFields: [
            {
                id: "name",
                type: "text",
                description: "Name of the site",
                required: true,
            },
            {
                id: "location",
                type: "geo-device",
                description: "Location of the site report",
            },
            {
                id: "report",
                type: "text",
                description: "Site report",
                required: true,
            },
            {
                id: "files",
                type: "image",
                multiple: true,
                upload: true // uploads files into b:// and references only txId's
            }
        ],
        protocol: [
            "${JSON.fields}"
        ],
        encrypt: [1],
        sign: [1],
        website: 'https://inspector.bapps.network',
        logo: 'https://api.bapp.network/images/inspector/logo.png'
    }
});

Meteor.startup(() => {
    import datapay from 'datapay';
    _.each(bapps, (bapp) => {
       const protocol = [
           '1BappGysvZJ6iE5PgXUnA6S4XsGbWDSodr',
           bapp.protocolAddress,
           bapp.name,
           bapp.description,
           JSON.stringify(bapp.definition)
       ];

       console.log(protocol);

       return false;
       const bappsKey = "5K2oghKVoWhfQhn54agUARM35J7auf95wRYzT47iPTUY3QoPoQj";
       datapay.send({
           data: protocol,
           pay: {
               key: bappsKey
           }
       }, Meteor.bindEnvironment((err, hash) => {
           console.log('protocol', bapp.protocolAddress, err, hash);
       }));
   });
});
*/
