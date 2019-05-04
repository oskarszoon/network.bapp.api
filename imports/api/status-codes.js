/* global statusCodes: true */

export const returnData = function(data) {
    let returnValue = _.clone(statusCodes.ok);
    returnValue.body.data = data;

    return returnValue;
};

export const statusCodes = {};

statusCodes.ok = {
    statusCode: 200,
    body: {
        status: "ok",
        message: "ok"
    }
};

statusCodes.notFound = {
    statusCode: 400,
    body: {
        status: "error",
        message: "Not found"
    }
};

statusCodes.dataInvalid = {
    statusCode: 403,
    body: {
        status: "error",
        message: "Data is invalid"
    }
};

statusCodes.noAccess = {
    statusCode: 404,
    body: {
        status: "error",
        message: "No access"
    }
};

statusCodes.notAcceptable = {
    statusCode: 406,
    body: {
        status: "error",
        message: "Not Acceptable"
    }
};

statusCodes.processingError = {
    statusCode: 500,
    body: {
        status: "error",
        message: "Something went wrong in the processing"
    }
};
