const path = require('path');

module.exports = {
    entry: "./client-src/evie.entry.js",
    output: {
        path: path.resolve(__dirname, "./server/public"),
        filename: "evie.bundle.js",
    },
    devtool: "source-map",
    target: "web"
};