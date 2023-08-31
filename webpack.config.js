const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry:{
        main:'./src/index'
    },
    mode: "development",
    output: {
        path: path.resolve(__dirname,'dist')
    },
    resolve: {
        extensions: ['.tsx','.ts','.jsx','.js']
    },
    module:{
        rules: [{
            test: /\.(tsx|ts|jsx|js)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    devServer: {
     hot:true
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./public/index.html'
        })
    ]
}