export const bapps = [
    {
        txId: "fa84be7e9e44dd1fa0ce9f85bf6e22265ba056f35dc23817883cff33af1f5f96",
        name: "Bitstagram poster",
        description: "Post an image from Bapps directly to the Bitstagram feed",
        definition: {
            bappVersion: 1,
            inputFields: {
                image: {
                    type: "image",
                    output: "binary" // binary / base64
                }
            },
            protocolAddress: "19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut",
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
            encrypt: [1],
            sign: [1],
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
            inputFields: {
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
                },
                files: {
                    type: "image",
                    multiple: true,
                    upload: true // uploads files into b:// and references only txId's
                }
            },
            protocolAddress: "1Simsqfg7zu7uhgbaZoKjwKgsHCYEssBD",
            protocol: [
                "${JSON.fields}"
            ],
            encrypt: [1],
            sign: [1],
            website: 'https://inspector.bapps.network',
            logo: 'https://inspector.bapps.network/inspector.png',
            icon: 'https://inspector.bapps.network/inspector.png'
        }
    }
];
