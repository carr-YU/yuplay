const path = require("path");
const glob = require('glob')
const merge = require("webpack-merge");
const webpackConfigBase = require("./webpack.base.config");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const PurgecssPlugin = require("purgecss-webpack-plugin")

const PATHS = {
    src: path.join(__dirname, 'src'),
    assets: path.join(__dirname, 'assets')
}
 
const webpackConfigProd = {
    mode:'production',
    resolve:{
        alias: {
            'bn.js': path.resolve(process.cwd(), 'node_modules', 'bn.js'),
        },
    },
    
    optimization:{
        splitChunks: {
            chunks: "all",
            minSize: 30000, // 模块的最小体积
            minChunks: 1, // 模块的最小被引用次数
            maxAsyncRequests: 5, // 按需加载的最大并行请求数
            maxInitialRequests: 5, // 一个入口最大并行请求数
            automaticNameDelimiter: '~', // 文件名的连接符
            name: true,
            cacheGroups: { // 缓存组
                common:{//
                    name:'common',
                    chunks:'all',
                    minSize:1,
                    minChunks:1,
                    priority:1//设置匹配优先级，数字越小，优先级越低
                },
                vendor:{
                    name:'vender',
                    test:/[\\/]node_modules[\\/]/,//匹配node模块中匹配的的模块
                    priority:10,//设置匹配优先级，数字越大，优先级越高
                    chunks:'all'
                },
                react_dom: {  //拆分指定文件(react-dom)
                    test: /[\\/]node_modules[\\/]react-dom[\\/]/,
                    name: 'react-dom',
                    chunks: 'initial',
                    minSize:10,
                    priority:20
                },
                crypto_js: {  //拆分指定文件(crypto-js)
                    test: /[\\/]node_modules[\\/]crypto-js[\\/]/,
                    name: 'crypto-js',
                    chunks: 'initial',
                    minSize:10,
                    priority:15
                },
                elliptic: {  //拆分指定文件(elliptic)
                    test: /[\\/]node_modules[\\/]elliptic[\\/]/,
                    name: 'elliptic',
                    chunks: 'initial',
                    minSize:10,
                    priority:15
                }
            }
        }
    },
    plugins:[
        new BundleAnalyzerPlugin({ analyzerPort: 8919 }),
        new WebpackDeepScopeAnalysisPlugin(),
        new CleanWebpackPlugin(),
        //这里的css three sharking有点问题。先放着
        // new PurgecssPlugin({
        //     paths: glob.sync(`${PATHS.assets}/**/*.scss`,  { nodir: true }),
        //     whitelistPatternsChildren: collectWhitelistPatternsChildren,
        //     keyframes:true
        // }),
    ]
}

function collectWhitelistPatternsChildren(){
    return [/^login-modal-wrap/]
}
module.exports = merge(webpackConfigBase, webpackConfigProd);