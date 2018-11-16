module.exports = {
  devServer: {
    port: 6681,
    proxy: {
      '/API': {
        target: 'http://localhost:5921/Other_Project/jiaminghi'
      }
    }
  }
}