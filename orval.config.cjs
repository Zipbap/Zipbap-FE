module.exports = {
  zipbap: {
    input: {
      target: './src/shared/lib/models/swagger.json',
    },
    output: {
      target: './src/shared/lib/domain',
      mode: 'tags-split',
      client: 'axios',
      baseUrl: 'https://zipbap.store',
    },
  },
};
