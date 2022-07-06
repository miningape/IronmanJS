// License at bottom of file, because who wants to start by reading a license?
const fs = require('fs');

let startCb = () => {};

const whitelist = process.env.IRONMANJS_WHITELIST?.split(',') || [];
whitelist.push('ironmanjs');
const whitelistMap = whitelist.reduce((prev, cur) => { prev[cur] = true; return prev; }, {});

fs.readFile('package.json', (err, data) => {
    if (err) {
        if (!err.code === 'ENOENT') throw new Error('IronmanJS - Cannot read package.json');
        return;
    }

    const dependencies = Object.keys(JSON.parse(data.toString())['dependencies']);
    const extraDependencies = dependencies.filter(dep => !whitelistMap[dep])

    if (extraDependencies.length !== 0) {
        console.log(
            'Uninstall these packages to get the ironman JS experience: "' +
            extraDependencies.join('", "') + '"'
        );
        

        throw new Error('IronmanJS - Too Many Packages');
    }

    startCb();
});

module.exports = (cb) => {
    startCb = cb;
}

/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <miningape@gmail.com> wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return.  Kyle Craig Johnson
 * ----------------------------------------------------------------------------
 */
