/**
 * ircloggr - a node.js all-in-one implementation of irc logging visible via
 *            a REST/JSON interface.
 *
 * See LICENSE file for licensing information.
 */

// server configuration, config file parsing, and eventually command line switch
// handling.

const path = require('path'),
        fs = require('fs');

exports.bot_name = "ircloggr";

exports.config_path = path.join(path.dirname(__dirname), "config.json");

exports.servers = {
};

exports.parse_config_file = function() {
    // let exceptions fly
    var conf = JSON.parse(fs.readFileSync(exports.config_path));
    
    for (var k in conf) {
        if (exports[k] === undefined || k.substr(0,5) === "parse")
            throw "unsupported key: " + k;
        if (exports[k] !== null && typeof exports[k] !== typeof conf[k]) {
            throw "'"+k+"' is a "+ typeof exports[k] +", it should be a " + typeof conf[k]; 
        }
        exports[k] = conf[k];
    }
};
