const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyPlugin = require("copy-webpack-plugin")

module.exports={
    mode:'development',
    entry:'./app.js',
    output:{
        filename:'bundle.[chunkhash].js',
        path:path.resolve(__dirname,'../dist')
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env','@babel/preset-react']
                    }
                }
            },
            {
                test:/(\.css|\.scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                            fallback:'style-loader'
                        },
                    },
                    'css-loader',
                    'sass-loader',
                    'less-loader'
                ],
            },
            {
                test: /\.(gif|png|jpe?g|svg|ico)$/i,
                use: [
                    // {
                    // loader: 'url-loader',
                    //     options: {
                    //       limit: 500,
                    //     }
                    // },
                    { 
                    loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            publicPath: '/'
                        }
                    },
                //   {
                //     loader: 'image-webpack-loader',
                //     options: {
                //         bypassOnDebug: true,
                //     }
                //   }   
                ]
            },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./index.html'
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: '[name].css',
            chunkFilename: '[name].[chunkhash].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, "../favicon.ico"), to: './' },
                { from: path.resolve(__dirname, "../assets/js/"), to: './assets/js/' },
                { from: path.resolve(__dirname, "../public/Resources/"), to: './Resources/' },
            ],
        }),
    ]
}