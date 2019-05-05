export const bapps = [
    {
        txId: "ba84be7e9e44dd1fa0ce9f85bf6e22265ba056f35dc23817883cff33af1f5f96",
        protocolAddress: "19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut",
        name: "Bitstagram",
        description: "Post an image from Bapps directly to the Bitstagram feed",
        definition: {
            version: 1,
            inputFields: {
                image: {
                    type: "image",
                    required: true,
                    output: "binary" // binary / base64
                }
            },
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
    },
    {
        txId: "fa84be7e9e44dd1fa0ce9f85bf6e22265ba056f35dc23817883cff33af1f5f96",
        protocolAddress: "19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut",
        name: "B protocol",
        description: "Post any file to the blockchain",
        definition: {
            version: 1,
            inputFields: {
                file: {
                    type: "file",
                    required: true,
                    output: "binary" // binary / base64
                }
            },
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
            logo: 'https://api.bapp.network/images/b.png'
        }
    },
    {
        txId: "3e79ffb07d71c2248fb2356b67c9cb177a9f21de7a0d9ff3be6a71033b64fa03",
        protocolAddress: "1Simsqfg7zu7uhgbaZoKjwKgsHCYEssBD",
        name: "Site Inspector",
        description: "Create an inspection report for a site",
        definition: {
            version: 1,
            inputFields: {
                name: {
                    type: "text",
                    description: "Name of the site",
                    required: true,
                },
                location: {
                    type: "geo-device",
                    description: "Location of the site report",
                },
                report: {
                    type: "text",
                    description: "Site report",
                    required: true,
                },
                files: {
                    type: "image",
                    multiple: true,
                    upload: true // uploads files into b:// and references only txId's
                }
            },
            protocol: [
                "${JSON.fields}"
            ],
            encrypt: [1],
            sign: [1],
            website: 'https://inspector.bapps.network',
            logo: 'https://api.bapp.network/images/inspector/logo.png'
        }
    }
];
