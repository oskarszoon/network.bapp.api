Package.describe({
  summary: "Public key support for accounts",
  name: "accounts:bitcoin",
  version: "1.0.0"
});

// TODO: add bsv npm package dependency

Package.onUse(api => {
  api.use('npm-bcrypt', 'server');

  api.use([
    'accounts-base',
    'srp',
    'sha',
    'ejson',
    'ddp'
  ], ['client', 'server']);

  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base', ['client', 'server']);

  api.use('random', 'server');
  api.use('check', 'server');
  api.use('ecmascript');

  api.addFiles('bitcoin_server.js', 'server');
  api.addFiles('bitcoin_client.js', 'client');
});
