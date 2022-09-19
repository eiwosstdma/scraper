import { defineConfig, Options } from 'tsup';

const options: Options = {
  minify: true,
  minifyWhitespace: true,
  minifyIdentifiers: true,
  minifySyntax: true,
  outDir: './dist/',
  target: 'node18',
  dts: true,
  format: 'cjs',
  clean: true,
  platform: 'node',
};

export default defineConfig(options);
