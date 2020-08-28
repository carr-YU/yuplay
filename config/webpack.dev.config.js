const path = require("path");
const merge = require("webpack-merge");
const webpackConfigBase = require("./webpack.base.config");
 
const webpackConfigDev = {
    mode:'development',
    devtool:'inline-source-map',
    devServer:{
        host:'localhost',
        port:'8088',
        contentBase:'./dist',
        proxy: {
            '/api/*': {
                target: 'http://localhost:8081',
                changeOrigin: true
            },
            '/txt/*': {
                target: 'http://122.51.238.220:8081',
                changeOrigin: true
            },

        },
    },
}
module.exports = merge(webpackConfigBase, webpackConfigDev);