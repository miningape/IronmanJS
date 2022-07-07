# IronmanJS
Bringing Ironman mode to JavaScript - JavaScript without bloat.


Do you think that JavaScript has too many packages? Are you looking for a challenge? Do you want to ensure you have absolutely no dependencies? Do you want bragging rights? Or are you just old school? If you answered `yes` to any of these questions then IronmanJS is for you.


This simple (yet effective) package prevents any other packages from being installed in your codebase. It does so by scanning `package.json` for any (and all) dependencies, if it detects any additional dependencies it throws an error.

# Usage
Using IronmanJS is simple and easy, simply include this single line at the beginning of any one file that is used in your app (I recommend your app's entrypoint):
```javascript
require('ironmanjs');
```

It is usually desirable to only run code after `package.json` is checked (although this will not affect whether `ironmanjs` throws an error or not). In this case a callback can be supplied to the default export like so:
```javascript
function main() {
    console.log('This code is better than before');
}

require('ironmanjs')(main);
```

# Caveats
The callback is necessary because reading a file takes longer to execute than simple JavaScript, for example the following code will result in `"Hello World!"` being printed before the `ironmanjs` error is thrown.
```javascript
require('ironmanjs');
console.log('Hello World!');
```

For this reason it is not recommended to call the default export after the require statement, because then it becomes much harder to predict the order of execution and therefore if the callback will be called, for example in cases like this:
```javascript
const setcb = require('ironmanjs');

(() => {
    // Some long running code
})();

// Callback may never be called if ironmanjs' check completes before IIFE
setcb(() => {
    console.log('Hello World!');
});
```

# TypeScript and whitelists
I am working on a TypeScript based version of the code, however, to support this use case (and others) we allow for a whitelist to be created in your `.env` file. Since reading values from `.env` requires the `dotenv` package this package must be added to the whitelist.
```
// .env
IRONMANJS_WHITELIST='typescript,axios,dotenv'
```

For this code to then behave correctly the `dotenv` package must be run before `ironmanjs` is required:
```javascript
// Any imports can appear above (or below) the entrypoint
import { post } from 'axios'

// This should be the entrypoint of your app
require('dotenv').config();
require('ironmanjs')(() => {
    // Your code here
});
```

I recommend using the `require` function over `import` statements for both the `dotenv` package and the `ironmanjs` package, this is because it is more predictable than the corresponding `import` statements. However, this is only in the case of `ironmanjs` and `dotenv` you are then free to use whatever syntax for the rest of your imports.

Of course it goes without saying, if you use this feature you are no longer using ironman JavaScript, and you immediately lose all bragging rights.