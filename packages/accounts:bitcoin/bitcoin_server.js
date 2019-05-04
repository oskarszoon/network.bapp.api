const Message = require('bsv/message');

// Handler to login with a bitcoin address.
//
Accounts.registerLoginHandler("bitcoin", options => {
  if (! options.signature)
    return undefined; // don't handle

  check(options, {
    address: String,
    timestamp: Number,
    challenge: String,
    signature: String
  });

  const user = Meteor.users.findOne({
    address: options.address
  });
  if (!user) {
    handleError("User not found");
  }

  const currentTimestamp = Math.round(+new Date()/1000);
  if (options.timestamp < (currentTimestamp - 30) || options.timestamp > currentTimestamp) {
    throw new Meteor.Error(500, "Invalid timestamp");
  }

  // check signature
  const message = '' + options.challenge + options.timestamp;
  if (!validSignature(options.address, message, options.signature)) {
    return {
      error: "Login incorrect"
    };
  }

  return {
    userId: user._id
  };
});

const validSignature = function(address, message, signature) {
  if (!address || typeof address !== 'string') return false;
  if (!message || typeof message !== 'string') return false;
  if (!signature || typeof signature !== 'string') return false;

  return Message.verify(message, address, signature);
};
