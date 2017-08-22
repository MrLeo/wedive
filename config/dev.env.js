var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API: '"http://118.190.40.178:8082/portal/"'//TODO:测试服务器接口地址
})
