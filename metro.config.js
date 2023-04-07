module.exports = {
  resolver: {
    assetExts: ["db", "mp3", "ttf", "png", "jpg"],
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  },
  assets: ["./assets/fonts"],
};
