var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');

// should be options
var distFolder = "dist";
var srcFolder = path.join(__dirname, "js");

var loaders = [
    {
        test: /\.(png|jpg)$/,
        loader: "url?limit=100"
    },
    {
        test: /\.woff$/,
        loader: "url?limit=10000&minetype=application/font-woff"
    },
    {
        test: /\.(ttf|eot|svg)$/,
        loader: "file"
    },
    {
        test: /\.html$/,
        loader: "html"
    }
];

var externals = [];

var defaultExtensions = ["", ".webpack.js", ".web.js", ".js"];

/*
options.separateStylesheet
options.hotComponents
options.devServer
options.longTermCaching
options.debug
options.debugType
options.minimize
 */
module.exports = function (options) {

    /* entry */
    var entry = options.entry;

    /* module.loaders */
    var stylesheetLoaders = [
        {
            test: /\.css$/,
            loader: options.separateStylesheet ? ExtractTextPlugin.extract("style-loader", "css-loader", { publicPath: "" }) : "style-loader!css-loader"
        }
    ];
    var reactLoaders = [
        {
            test: /\.jsx$/,
            loader: options.hmr ? "react-hot-loader!jsx-loader?harmony" : "jsx-loader?harmony"
        }
    ];
    loaders = loaders.concat(stylesheetLoaders);
    if (options.react) {
        loaders = loaders.concat(reactLoaders);
    }

    /* output */
    var publicPath = options.devServer ?
        options.devServer + '/' + distFolder + '/':
        '/' + distFolder + '/';

    var output = {
        path: path.join(__dirname, distFolder),
        publicPath: publicPath,
        filename: "[name].js" + (options.longTermCaching  ? "?[chunkhash]" : ""),
        chunkFilename: (options.devServer ? "[id].js" : "[name].js") + (options.longTermCaching ? "?[chunkhash]" : ""),
        pathinfo: options.debug
    };

    /* resolve */
    var extensions = defaultExtensions;
    if (options.react) {
        extensions.push(".jsx");
    }
    
    /* plugins */
    var plugins = [
        new webpack.optimize.OccurenceOrderPlugin(true)
    ];
    if (options.separateStylesheet) {
        plugins.push(new ExtractTextPlugin("[name].css"));
    }
    if (options.stats) {
        plugins.push(function() {
            this.plugin("done", function(stats) {
                var jsonStats = stats.toJson({
                    chunkModules: true
                });
                jsonStats.publicPath = publicPath;
                require("fs").writeFileSync(path.join(__dirname, distFolder, "stats.json"), JSON.stringify(jsonStats));
            });
        });
    }

    if (options.commonsChunk) {
        plugins.push(new webpack.optimize.CommonsChunkPlugin("commons", "commons.js" + (options.longTermCaching ? "?[chunkhash]" : "")));
    }

    if (options.newWatch) {
        plugins.push(new webpack.NewWatchingPlugin());
    }

    return {
        entry: entry,
        output: output,
        module: {
            loaders: loaders
        },
        debug: options.debug,
        debugType: options.debugType,
        externals: externals,
        resolve: {
            extensions: extensions,
            root: srcFolder,
            modulesDirectories: ["web_modules", "node_modules"]
        },
        plugins: plugins
    };
};