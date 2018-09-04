const CompressionPlugin = require('compression-webpack-plugin');
const zlib = require('zlib');
const Buffer = require('buffer').Buffer;
const fs = require('fs');
const now = require('performance-now');
module.exports = {
  apply(){
    // Process hooks here
    cogear.on('webpack.config',(webpackConfig)=>{
      if(!['production','build','deploy'].includes(cogear.mode)) return;
      webpackConfig.plugins.push(
        new CompressionPlugin({
          test: /\.(html|js|css|svg|eos|woff|woff2|ttf)$/
        })
      );
    });
    cogear.on('build.done',()=>{
      if(!['production','build','deploy'].includes(cogear.mode)) return;
      cogear.loader.succeed('All pages are compressed.');
    });
    cogear.on('build.page.writeAfter',([page,html])=>{
      if(!['production','build','deploy'].includes(cogear.mode)) return;
      let start = now();
      zlib.gzip(new Buffer(html),(err,result)=>{
        if(err){
          console.error(err);
        }
        try {
          fs.writeFileSync(
            page.writePath + '.gz',
            result
          );
          // ora().succeed(`Compressor: ${chalk.bold(page.path)} => ${chalk.bold(page.path + '.gz')} (${prettyMs(now()-start)})`);
        } catch (e){
          console.error(e);
        }
      });
    });
    // Add support of cogear-plugin-pages-json
    cogear.on('pages.json',(file)=>{
      if(!['production','build','deploy'].includes(cogear.mode)) return;
      let start = now();
      zlib.gzip(fs.readFileSync(file),(err,result)=>{
        if(err){
          console.error(err);
        }
        try {
          fs.writeFileSync(
            file + '.gz',
            result
          );
          let filePath = file.replace(process.cwd(),'.');
          // ora().succeed(`Compressor: ${chalk.bold(filePath)} => ${chalk.bold(filePath + '.gz')} (${prettyMs(now()-start)})`);
        } catch (e){
          console.error(e);
        }
      });
    });
  }
};