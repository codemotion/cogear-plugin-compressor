const CompressionPlugin = require("compression-webpack-plugin")

module.exports = {
		apply(){
			// Process hooks here
			cogear.hooks.webpack.tap('cogear-plugin-compressor',(webpackConfig)=>{
				webpackConfig.plugins.push(
					new CompressionPlugin({
						test: /\.(html|js|css|svg|eos|woff|woff2|ttf)$/
					})
				)
			})
		}
}