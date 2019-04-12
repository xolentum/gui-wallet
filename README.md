# Loki Electron GUI Wallet

### Introduction
Loki is a private cryptocurrency based on Monero. Loki aims to provide a private data transmission layer using a second layer of Service Nodes.
More information on the project can be found on the [website](https://loki.network) and in the [whitepaper](https://loki.network/whitepaper). Loki is an open source project, and we encourage contributions from anyone with something to offer. 
<p align="center">
 <img src="https://raw.githubusercontent.com/KeeJef/loki-electron-gui-wallet/master/src-electron/icons/mrcuug.PNG" width="600">
</p>



### About this project

This is the new electron GUI for Loki. It is open source and completely free to use without restrictions, anyone may create an alternative implementation of the Loki Electron GUI that uses the protocol and network in a compatible manner.

Please submit any changes as pull requests to the development branch, all changes are assessed in the development branch before being merged to master, release tags are considered stable builds for the GUI.

#### Pre-requisites
- Download latest [Lokid](https://github.com/loki-project/loki/releases/latest)

#### Commands
```
nvm use 11.9.0
npm install -g quasar-cli
git clone https://github.com/loki-project/loki-electron-wallet
cd loki-electron-wallet
cp path_to_loki_binaries/lokid bin/
cp path_to_loki_binaries/loki-wallet-rpc bin/
npm install
quasar build -m electron -t mat
```

### Adding language support

Adding a new language is fairly simple.

1. Duplicate the language file `src/i18n/en-us.js` and rename it to the relevant language code.
2. Translate all the strings in that duplicated file. Take note that capitalization matters.
3. Add the language to the `languages` array in `src/i18n/index.js`. The `flag` property is the [ISO 3166-1-alpha-2 code](https://www.iso.org/obp/ui/#search/code/) of a country.
4. Submit a PR with your changes.
