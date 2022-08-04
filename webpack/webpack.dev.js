const path = require('path')
const { merge } = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')
const portFinderSync = require('portfinder-sync')

const infoColor = (_message) =>
{
    return `\u001b[1m\u001b[34m${_message}\u001b[39m\u001b[22m`
}

module.exports = merge(
    commonConfiguration,
    {
        stats: 'errors-warnings',

        mode: 'development',

        infrastructureLogging:
        {
            level: 'warn',
        },

        devtool: 'inline-source-map',

        devServer:
        {
            // host: 'local-ip', // use local-ip if you want the devserver to run on local machine ip
            host: 'localhost',
            port: portFinderSync.getPort(8080),
            open: false,
            https: false,
            allowedHosts: 'all',
            hot: false,
            watchFiles: ['src/**'],//, 'static/**'],
            /*static:
            {
                watch: true,
                directory: path.join(__dirname, '../static')
            },*/
            client:
            {
                logging: 'none',
                overlay: true,
                progress: false
            },
            setupMiddlewares: function (middlewares, devServer)
            {
                console.log('------------------------------------------------------------')
                const port = devServer.options.port
                const https = devServer.options.https ? 's' : ''
                const domain = `http${https}://${devServer.options.host}:${port}`

                console.log(`Project running at:\n  - ${infoColor(domain)}\n`)

                return middlewares
            }
        },

        module:
        {
            rules:
            [
                {
                    test: /\.css$/,
                    use:
                    [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {sourceMap: true, url: false},
                        }
                    ],
                }
            ]
        }
    }
)
