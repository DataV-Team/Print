module.exports = {
  devServer: {
    proxy: {
      '/API': {
        target: 'http://localhost:5921/Other_Project/jiaminghi/API/'
      }
    }
  }
}