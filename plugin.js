const CompressionPlugin = require("compression-webpack-plugin")

module.exports = {
		apply(cogear){
			// Process hooks here
			cogear.hooks.loadPagesForWebpack.tap('cogear-plugin-compressor',()=>{
				cogear.webpackConfig.plugins.push(
					new CompressionPlugin({
						test: /\.(html|js|css|svg|eos|woff|woff2|ttf)$/
					})
				)
			})
		}
}