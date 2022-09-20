import { defineConfig, Options } from 'tsup';

const options: Options = {
  minify: true,
  minifyWhitespace: true,
  minifyIdentifiers: true,
  minifySyntax: true,
  outDir: './dist/',
  target: 'node18',
  globalName: 'mtg-scraper',
  dts: {
    only: true,
    resolve: false
  },
  format: 'cjs',
  clean: true,
  platform: 'node',
};

export default defineConfig(options);
