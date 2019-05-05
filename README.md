# Bapps
> Generic bitcoin app to upload form data to the Bitcoin SV blockchain

Bapps is a mobile application that reads Bapps definitions from the Bitcoin SV blockchain 
and creates an input form field for a user to enter data, based on a Bitcom protocol 
definition.

Bapps can be used to upload images to Bitstagram (https://bitstagram.bitdb.network/),
upload generic files according to the B protocol (https://github.com/unwriter/B) or
any other protocol that is specified according to the Bapps protocol definition and 
has been uploaded to the Bitcoin SV blokchain.

Bapps aims to make it as easy as possible to interact with the growing number of data
protocol that are being developed on top of the Bitcoin SV blockchain. With the Bapps 
app you can buy credits from the Apple App Store and Google Play Store to immediately
start interacting with the Bitcoin SV blockchain. No comlicated tokens needed.

In a future release, advanced users will be able to fund the mobile wallet within Bapps
directly to send transactions without Bapps credits.

# Bapps Definition

A Bapps definition consists of 4 elements that define how the protocol should be
handled within the Bapps app.
- protocol address (1BappGysvZJ6iE5PgXUnA6S4XsGbWDSodr)
- name of the protocol
- Description of the protocol
- A JSON definition of how the protocol should be rendered in Bapps

OP_RETURN syntax:
```
OP_RETURN
  1BappGysvZJ6iE5PgXUnA6S4XsGbWDSodr
  [Address of protocol being described]
  [String name]
  [String description]
  [String JSON stringified definition]
```

Example of a Bapps OP_RETURN:
```
OP_RETURN
  1BappGysvZJ6iE5PgXUnA6S4XsGbWDSodr
  19HxigV4QyBv3tHpQVcUEQyq1pzZVdoAut
  Bitstagram
  Post an image from Bapps directly to the Bitstagram feed
  {"version":1,"inputFields":["id":"image","type":"image","required":true,"output":...
```

Example of a parsed Bapps definition from the blockchain:
```
{
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
}
```

The Bapps api indexes all the Bapp definitions and will return only the latest version posted to the blockchain.

# Bapp definition

Attribute | Type | Description
--------- | ---- | -----------
version | Number | Version of the protocol definition
inputFields | Array | All the input fields that should be shown in the Bapps app when entering data. See below.
protocol | Array | How the protocol should be rendered to the blockchain. Note, the protocol address should not be included, it is automatically added by Bapps.
template | String | A simple template to render an element of the protocol (EXPERIMENTAL)
website | String | The website of the protocol
logo | String | A logo image to show in the Bapps explorer

## inputFields

All the input fields basically just define form fields to gather data.

All input fields take the following parameters:

Name | Type | Description
---- | ---- | -----------
id | String | Id of the field to return on submission
type | String | Type field (image, file, text, location)
description | String | Optional description of the field. Will be shown below the field on the form
required | Boolean | Whether the field must be filled in before submitting the form
output | String | Encoding of the output (binary | base64) - only for images and files

The types that are currently support are:

Field Type | Description
---- | -----------
image | Image selector from camera or local file browser
file | File selector from local mobile device
text | A text input
location | A geo location input. At the moment can only get the devices geo coordinates (EXPERIMENTAL)


## protocol

The protocol definition is a very simple array of string templates for the protocol output. Each line of the protocol definition will be used as 1 line of output in the protocol.

Just like in ES6 templates `${...}` will be replaced by the data with the id from the submitted form.

The data object has the following structure:

```
{
    text: <String>,
    image: {
        fileName: <String>,
        fileSize: <Number>,
        height: <Number>,
        width: <Number>,
        type: <mime-type>,
        data: <base64/binary contents>
    },
    file: {
        fileName: <String>,
        fileSize: <Number>,
        type: <mime-type>,
        data: <base64/binary contents>
    },
    location: {
        lat: <Number>,
        long: <Number>,
        coords: String
    },
    JSON: {
        image: <Stringified JSON of the image field excluding the actual data>
        file: <Stringified JSON of the file field excluding the actual data>
        fields: <Stringified JSON of all the fields>
    }
}
```

In the above, replace the keys of the object with the id's defined in the definition for each respective type. The JSON key is always present.

## template


# Signing

Bapps allows all protocol uploads to be signed by the uploading user, regardless of whether the protocol defines this or not. The signing is done using the AUTHOR IDENTITY PROTOCOL (https://github.com/BitcoinFiles/AUTHOR_IDENTITY_PROTOCOL).

Just like the AUTHOR_IDENTITY_PROTOCOL defines, you can choose which fields of the protocol to sign. The signing is defined as an array of indexes of the fields of the protocol.

Signing is controlled by setting the `sign` field to an array of indices.
```
definition: {
    sign: [0,1]
}
```

# Encryption

Bapps allows all protocol uploads to be encrypted using strong aes encryption. At the moment the data will be encrypted, but any content-type fields will not be ammended in the output. 

The secret key used for the encryption is randomly generated when the transaction is created and returned to the user.
```
definition: {
    encrypt: true
}
```

Encryption can be turned on an off by setting the `encrypt` attribute to `true`.
