module.exports = require('./webpack/create-config')({
    entry: "./js/main.jsx",
    commonsChunk: false,
    debug: true,
    debugType: 'eval',
    devServer: "http://localhost:2992",
    hmr: true,
    minimize: false,
    longTermCaching: false,
    separateStylesheet: true,
    separateStylesheetPublicPath: "",
    react: true
});