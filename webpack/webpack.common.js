const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const rootPath = path.join(__dirname, '..')

module.exports = 
{
    entry:
    {
        app:
        [
            path.join(rootPath, 'src', 'frontend', 'pages', 'app', 'app.js')
        ],
        log:
        [
            path.join(rootPath, 'src', 'frontend', 'pages', 'log', 'log.js')
        ]
    },

    output:
    {
        filename: 'bundles/[name].js',
        path: path.join(rootPath, '_build'),
        publicPath: '/',
    },

    target: 'web',

    plugins:
    [           
        new CleanWebpackPlugin(),

        new htmlWebpackPlugin(
        {
            filename: 'app.html',
            template: path.join(rootPath, 'src', 'frontend', 'pages', 'app', 'app.html'),
            chunks: ['app']
        }),

        new htmlWebpackPlugin(
        {
            filename: 'log.html',
            template: path.join(rootPath, 'src', 'frontend', 'pages', 'log', 'log.html'),
            chunks: ['log']
        }),
    ],

    module:
    {
        rules:
        [
            {
                test: /\.(svg)$/,
                type: 'asset/source'
            }
        ]
    }
}