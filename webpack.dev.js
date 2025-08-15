const {merge} = require("webpack-merge");
const common = require("./webpack.common.js");

//Uses webpack.merge to combine our common file with specific mode
module.exports = merge(common, {
    mode: "development", //Development mode
    //Dev local webserver setup
    devtool: "eval-source-map", //For live error reporting
    devServer: {
        /*
        Dev server by default only updates when js file is changed, 
        but we add our html file to the watchlist so that it will 
        update when our html changes too. No need to watch CSS
        */
        watchFiles: ["./src/index.html"], 
    },
});