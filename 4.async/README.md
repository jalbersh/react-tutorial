# React.js + redux

## Installation

1. `echo 'export NODE_TLS_REJECT_UNAUTHORIZED=0' >> ~/.bash_profile && source ~/.bash_profile`
1. __OFF__ the VPN
1. `brew update && brew install node`
    If node is already installed, you should
     ```
     brew uninstall --force node
     sudo rm -fr /usr/local/share/doc/node
     sudo rm -fr /usr/local/share/systemtap
     sudo rm -rf /usr/local/lib/node_modules
     brew install node
     ```
1. `git clone git@gitlab.global.dish.com:pivotal-ofm/react-redux-context.git /codev/workspace/react-redux-context`
1. `cd /codev/workspace/react-redux-context/4.async`
1. Copy `1.react/.npmrc` to your home directory `cp 1.react/.npmrc ~/`
1. `npm install`
1. `npm install -g gulp`

## Problem

Make the test pass to implement that app with async actions.

- There are existing passing tests. Look at the implementation of those tests for a template on how to make the failing tests pass.

## Running tests

1. `$ npm test`
1. Navigate to `http://localhost:9876/debug.html`

## Viewing the app

1. `$ gulp js`
1. `$ open index.html`

## Resources

- [Jasmine](http://jasmine.github.io/2.4/introduction.html)
- [React TestUtils](https://facebook.github.io/react/docs/test-utils.html)
