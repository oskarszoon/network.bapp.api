export const bapps = [
    {
        txId: "fa84be7e9e44dd1fa0ce9f85bf6e22265ba056f35dc23817883cff33af1f5f96",
        name: "Bitstagram poster",
        description: "Post an image from Bapps directly to the Bitstagram feed",
        definition: {
            bappVersion: 1,
            fields: {
                image: {
                    type: "image"
                }
            },
            protocol: [
                "19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut",
                "${image.content}",
                "${image.type}",
                "binary",
                "${image.name}"
            ],
            template: '<div class="image"><img src="data:${s3};base64,${lb2}" /></div>',
            encrypt: false,
            sign: false,
            website: 'https://bitstagram.bitdb.network',
            logo: 'https://bitstagram.bitdb.network/bitstagram.png',
            icon: 'https://bitstagram.bitdb.network/bitstagram.png'
        }
    },
    {
        txId: "3e79ffb07d71c2248fb2356b67c9cb177a9f21de7a0d9ff3be6a71033b64fa03",
        name: "Site Inspector",
        description: "Create an inspection report for a site",
        definition: {
            bappVersion: 1,
            fields: {
                name: {
                    type: "text",
                    description: "Name of the site"
                },
                location: {
                    type: "location",
                    description: "Location of the site report"
                },

                report: {
                    type: "text",
                    description: "Site report"
                }
            },
            protocol: [
                "1Simsqfg7zu7uhgbaZoKjwKgsHCYEssBD",
                "${JSON.fields}"
            ],
            encrypt: true,
            sign: true,
            website: 'https://inspector.bapps.network',
            logo: 'https://inspector.bapps.network/inspector.png',
            icon: 'https://inspector.bapps.network/inspector.png'
        }
    }
];
