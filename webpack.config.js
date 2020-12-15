const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	target: 'web',
	entry: path.resolve(__dirname, 'js/main.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: "someLibName.js",
		library: "someLibName",
		libraryTarget: "umd",
		auxiliaryComment: "Test Comment",
		devtoolModuleFilenameTemplate: info => {
			return 'webpack'
		}
	},
	mode: "production",
	devServer: {
		lazy: false,
		filename: "someLibName.js",
		contentBase: path.join(__dirname, "dist"),
		compress: true,
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
	module: {
		rules: [{
			test: /\.css$/,
			use: [{
					loader: 'style-loader'
				},
				{
					loader: 'css-loader',
					options: {
						module: true
					}
				}
			]
		}, {
			test: /\.ts$/,
			use: 'ts-loader'
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: '测试',
			template: './src/index.html'
		})
	]
};
