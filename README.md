# IronmanJS
Bringing Ironman mode to JavaScript


Do you think that JavaScript has too many packages? Do you wish JavaScript was that little bit more challenging? Do you want to ensure you have absolutely no dependencies? If you answered `yes` to any of these questions then IronmanJS is for you.


This simple (yet effective) package prevents any other packages from being installed in your codebase. It does so by scanning `package.json` for any (and all) dependencies, if it detects any additional dependencies it throws an error.

# Usage
Using IronmanJS is simple and easy, simply include this single line at the beginning of any file that is used in your code (we recommend your app's entrypoint):
```javascript
require('ironmanjs');
``` 
