module.exports = {
    resolve: {
      fallback: {
        assert: require.resolve('assert/'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        querystring: require.resolve('querystring-es3'),
        os: require.resolve('os-browserify/browser'),
        zlib: require.resolve('browserify-zlib'),
        url: require.resolve('url/'),
        process: require.resolve('process/browser'),
        fs: false,  // 'fs' is typically not needed in the browser and can be set to false
        path: require.resolve('path-browserify'),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify')
      }
    }
  };
  