const path = require('path');
const  webpack = require('webpack');
const { AureliaPlugin, ModuleDependenciesPlugin } = require('aurelia-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const bundleOutputDir = './wwwroot/dist';

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    return [{
        stats: { modules: true },
        entry: { 'app': 'aurelia-bootstrapper' },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            modules: ['ClientApp', 'node_modules', 'kendo/js'],
            alias: {
                //'admin': path.resolve('ClientApp/app/components/admin.html'),
                // 'layout': path.resolve('ClientApp/app/app/layout.html'),
                }
        },
        output: {
            path: path.resolve(bundleOutputDir),
            publicPath: '/dist/',
            filename: '[name].js'
        },
        module: {
            rules: [
                { test: /\.tsx?$/, include: /ClientApp/, use: 'awesome-typescript-loader?silent=true' },
                { test: /\.html$/i, use: 'html-loader' },
                { test: /\.css$/i, use: isDevBuild ? 'css-loader' : 'css-loader?minimize' },
                {
                    test: /\.css$/i,
                    loader: ['style-loader', 'css-loader'],
                    issuer: /\.[tj]s$/i
                },
                { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' },
                { test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, loader: 'url-loader?limit=100000' },
                // { test: /\.json$/i, use: 'json-loader' }
            ]
        },
        plugins: [
            new CheckerPlugin(),            
            new webpack.DefinePlugin({ IS_DEV_BUILD: JSON.stringify(isDevBuild) }),
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./wwwroot/dist/vendor-manifest.json')
            }),
            new webpack.ProvidePlugin({
                'Promise': 'bluebird',
                '$': 'jquery',
                'jQuery': 'jquery',
                'window.jQuery': 'jquery',
              }),
            new AureliaPlugin({ aureliaApp: 'boot' }),
            new ModuleDependenciesPlugin({
                "aurelia-authentication": ["./authFilterValueConverter"],
                "aurelia-open-id-connect": [
                    "./open-id-connect-user-block",
                    "./open-id-connect-role-filter",
                    "./open-id-connect-user-debug"
                ],
                "aurelia-i18n":[
                    // PLATFORM.moduleName(path.join(__dirname,"./ClientApp/locales/en/translation.json")),
                    // PLATFORM.moduleName(path.join(__dirname,"./ClientApp/locales/fr/translation.json"))
                    // "../../../../ClientApp/resources/locales/en/translation.json",
                    // "../../../../ClientApp/resources/locales/fr/translation.json"
                ]
              })
        ].concat(isDevBuild ? [
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]')  // Point sourcemap entries to the original file locations on disk
            })
        ] : [
            new webpack.optimize.UglifyJsPlugin()
        ])
    }];
}
