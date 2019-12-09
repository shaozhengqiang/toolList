const path = require('path');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionWebpackPlugin = require("compression-webpack-plugin");

const IS_PROD = ['production'].includes(process.env.NODE_ENV);//环境判断
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;//Gzip压缩规则

function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    publicPath:"./",
    devServer: {
        port: 8080, // 端口
    },
     lintOnSave: false, // 取消 eslint 验证
    //配置node-model引入文件，防止报错
    transpileDependencies: [
        'vue-particles',
        'animejs'
    ],
    chainWebpack: config => {
        //打包依赖检查工具
        // config
        //     .plugin('webpack-bundle-analyzer')
        //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        // 移除 prefetch 插件
        config.plugins.delete('prefetch-index');
        // 移除 preload 插件
        config.plugins.delete('preload-index');
        config.resolve.alias
            .set('src', resolve('src/'))


    },


    configureWebpack: config => {
        //     resolve: {
        //     alias: {
        //         vue: 'vue/dist/vue.js'
        //     }
        // }
        const plugins = [];
        if (IS_PROD) {
            plugins.push(
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            drop_debugger: true, // console
                            drop_console: true,
                            pure_funcs:['console.log'] // 移除console
                        },
                    },
                    sourceMap: false,
                    parallel: true,
                })
            )
            plugins.push(
                new CompressionWebpackPlugin({
                    test: productionGzipExtensions,
                    threshold: 10240,
                    minRatio: 0.8,
                    deleteOriginalAssets: false
                })

            )

        }
        config.plugins = [...config.plugins, ...plugins];

    }
}
