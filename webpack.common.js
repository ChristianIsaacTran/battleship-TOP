
const path = require("path"); //path to dist folder secure
const HtmlWebpackPlugin = require("html-webpack-plugin"); //Bundling HTML files

module.exports = {
    entry: "./src/index.js", //input entry point here
    output: {
        filename: "index.js", //Output js file name into dist
        path: path.resolve(__dirname, "dist"),
        clean: true, //cleans output directory before creating a new output to dist
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
    ],
    module: {
        rules: [
            {   //Handling css files and stylings, also handles images if we want to add them into our css with url().
                test: /\.css$/i, 
                use: ["style-loader", "css-loader"], //goes from right to left, so we want to load the css first then apply style load
            },
            {   //Handling images in javascript files (no install required)
                test: /\.(png|svg|jpg|jpeg|gif)$/i, 
                type: 'asset/resource',
            },
            {   //Handling fonts (no install required)
                test: /\.(woff|woff2|eot|ttf|otf)$/i, 
                type: 'asset/resource',
            },
            {   //Handling in HTML img tags
                test: /\.html$/i, 
                loader: "html-loader",
            },
        ],
    },
};

/*
In order to swtich modes, specify them inside the 
package.json files as named script commands for CLI.
*/