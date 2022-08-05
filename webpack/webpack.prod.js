const miniCssExtractPlugin = require('mini-css-extract-plugin')
const cssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { merge } = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')

module.exports = merge(
    commonConfiguration,
    {
        mode: 'production',

        devtool: false,

        output:
        {
            publicPath: '.', // in generated html path will start with . like <script defer="defer" src="./bundles/app.js"></script>
        },

        plugins: [
            new miniCssExtractPlugin(
            {
                    filename: 'styles/[name].css',
                    chunkFilename: '[id].css'
            })
        ],

        module:
        {
            rules:
            [
                {
                    test: /\.css$/,
                    use:
                    [
                        miniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options:
                            {
                                sourceMap: false,
                                modules: false,
                                url: false
                            },
                        }
                    ]
                }
            ]
        },

        optimization:
        {
            minimize: true,
            minimizer: [new cssMinimizerPlugin(), '...'],
  
        },

        performance:
        {
            hints: false,
            maxEntrypointSize: 512000,
            maxAssetSize: 512000,
        }
    }
)