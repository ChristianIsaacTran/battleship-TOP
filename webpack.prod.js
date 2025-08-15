const {merge} = require("webpack-merge");
const common =  require("./webpack.common.js");

//No dev server needed. Uses merge with common to combine for 
//specific mode.
module.exports = merge(common, {
    mode: "production", //Production mode optimizes code further for faster render times
});