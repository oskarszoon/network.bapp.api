// Used in the various functions below to handle errors consistently
const reportError = (error, callback) => {
   if (callback) {
     callback(error);
   } else {
     throw error;
   }
};

// Attempt to log in with a public key.
//
// @param selector {String|Object} One of the following:
//   - {challenge: (challenge)}
//   - {signature: (signature)}
//   - a string which may be a username or email, depending on whether
//     it contains "@".
// @param password {String}
// @param callback {Function(error|undefined)}

/**
 * @summary Log the user in with a password.
 * @locus Client
 * @param {Object} selector
 *   An object with a public key, timestamp and challenge
 *   {publicKey: <pub key>, timestamp: <unix timestamp>, challenge: <challenge string> }
 *   The signature given is checked against a string concatination of the challenge and timestamp.
 *   The timestamp is checked to be not older than 30 seconds
 * @param {String} signature The user's signature.
 * @param {Function} [callback] Optional callback.
 *   Called with no arguments on success, or with a single `Error` argument
 *   on failure.
 * @importFromPackage meteor
 */
Meteor.loginWithBitcoin = (selector, signature, callback) => {
  Accounts.callLoginMethod({
    methodArguments: [{
      address: selector.address,
      timestamp: selector.timestamp,
      challenge: selector.challenge,
      signature: signature
    }],
    userCallback: (error, result) => {
      if (error) {
        reportError(error, callback);
      } else {
        callback && callback();
      }
    }
  });
};
