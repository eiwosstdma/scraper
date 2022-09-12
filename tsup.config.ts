import { defineConfig, Options } from 'tsup';

const options: Options = {
  minify: true,
  minifyWhitespace: true,
  minifyIdentifiers: true,
  minifySyntax: true,
  outDir: './dist/back-end/',
  target: 'node16',
  format: 'cjs',
  clean: true,
  platform: 'node',
};

export default defineConfig(options);
