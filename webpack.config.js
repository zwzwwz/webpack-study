const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, 'src/js/main.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: "[name].js",
	},
	devServer: {
		port: 8081,
		open: false,
		overlay: {
			warnings: false,
			errors: true
		},
		headers: {
			"X-Custom-Foo": "bar111"
		},
		proxy: {
			// proxy all requests starting with /api to jsonplaceholder
			'/xhx_middle/*': {
				target: 'http://webevent.61.com/',
				secure: false, // 接受 运行在 https 上的服务
				changeOrigin: true
			}
		}
	},
	optimization: {
		minimizer: [
			// new UglifyJsPlugin({
			// 	exclude: /\.min\.js$/, // 过滤掉以".min.js"结尾的文件，我们认为这个后缀本身就是已经压缩好的代码，没必要进行二次压缩
			// 	cache: true,
			// 	parallel: true, // 开启并行压缩，充分利用cpu
			// 	sourceMap: false,
			// 	extractComments: false, // 移除注释
			// 	uglifyOptions: {
			// 		compress: {
			// 			unused: true,
			// 			warnings: false,
			// 			drop_debugger: true
			// 		},
			// 		output: {
			// 			comments: false
			// 		}
			// 	}
			// }),
			// 用于压缩css文件
			new OptimizeCSSAssetsPlugin({
				assetNameRegExp: /\.css$/g,
				cssProcessorOptions: {
					safe: true,
					autoprefixer: {
						disable: true
					},
					mergeLonghand: false,
					discardComments: {
						removeAll: true // 移除注释
					}
				},
				canPrint: true
			})
		]
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: [{
					loader: MiniCssExtractPlugin.loader,
					options: {
						// 这里可以指定一个 publicPath
						// 默认使用 webpackOptions.output中的publicPath
						publicPath: '../'
					},
				},
				'css-loader',
			],
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new MiniCssExtractPlugin({
			// 类似 webpackOptions.output里面的配置 可以忽略
			filename: '[name].css',
			chunkFilename: '[id].css',
		})
	]
};
