const webpack = require('webpack')
const path = require('path')
// 加载本地数据文件
const appData = require('./mockData.json')
// 获取对应的本地数据
const seller = appData.seller
const goods = appData.goods
const ratings = appData.ratings

function resolve(dir) {
  // __dirname当前文件的目录的绝对地址(项目的目录)
  // 进行拼接最终返回 项目目录/src/components
  return path.join(__dirname, dir)
}

module.exports = {
  css: {
      loaderOptions: {
        // 给 sass-loader 传递选项
        sass: {
          // @/ 是 src/ 的别名
          // 所以这里假设你有 `src/variables.sass` 这个文件
          // 注意：在 sass-loader v7 中，这个选项名是 "data"
          // prependData: `@import "~@/variables.sass"`
        },
        // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
        // 因为 `scss` 语法在内部也是由 sass-loader 处理的
        // 但是在配置 `data` 选项的时候
        // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
        // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
        scss: {
          // prependData: `@import "~@/variables.scss";`
        },
        less: {
          globalVars: {
            primary: "#fff"
          }
        }
      }
    },
  // 第三方插件配置
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  /* devServer的before在服务内部的所有其他中间件之前，提供执行自定义中间件的功能。
     这可以用来配置自定义处理程序。不需要我们require express，可以直接使用before提供的参数。 */
  devServer: {
    before(app) {
      app.get('/api/seller', function(req, res) {
        // 接口返回json数据，上面配置的数据seller就赋值给data请求后调用
        const id = req.query.id
        res.json({
          errno: 0,
          data: Object.assign({}, seller, { id })
        })
      })
      app.get('/api/goods', function(req, res) {
        res.json({
          errno: 0,
          data: goods
        })
      })
      app.get('/api/ratings', function(req, res) {
        res.json({
          errno: 0,
          data: ratings
        })
      })
    }
  },
  chainWebpack(config) {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'))
    config.plugin('context')
      .use(webpack.ContextReplacementPlugin,
        [/moment[/\\]locale$/, /zh-cn/])
  }
}
