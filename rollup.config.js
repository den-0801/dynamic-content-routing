import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import ts from 'rollup-plugin-ts';
import { terser } from 'rollup-plugin-terser';

import pcg from './package.json';

const input = './src/main.ts';

const terserOptions = {
  compress: { drop_console: true },
  output: { comments: false },
};

const babelOptions = {
  babelHelpers: 'bundled',
};

const postcssOptions = {
  minimize: true,
};

function tsOptionsOverwritten(resolvedConfig) {
  return {
    ...resolvedConfig,
    declaration: false,
  };
}

export default [
  {
    input,
    output: [
      {
        file: `./dist/index.js`,
        format: 'es',
      },
    ],
    plugins: [
      ts(),
      babel(babelOptions),
      postcss({
        ...postcssOptions,
        extract: `styles.min.css`,
      }),
    ],
  },
  {
    input,
    output: [
      {
        file: `./dist/index.min.js`,
        plugins: [terser(terserOptions)],
        format: 'es',
      },
    ],
    plugins: [
      ts({
        tsconfig: tsOptionsOverwritten,
      }),
      ,
      babel(babelOptions),
      postcss({
        ...postcssOptions,
        extract: false,
      }),
    ],
  },
  {
    input,
    output: [
      {
        file: `./dist/index-umd.min.js`,
        plugins: [terser(terserOptions)],
        format: 'umd',
        name: 'DynamicContentRouting',
      },
    ],
    plugins: [
      ts({
        tsconfig: tsOptionsOverwritten,
      }),
      babel(babelOptions),
      postcss({
        ...postcssOptions,
        extract: false,
      }),
    ],
  },
  {
    input: './src/utils.ts',
    output: [
      {
        file: `./dist/utils/index.js`,
        format: 'es',
      },
      {
        file: `./dist/utils/index.min.js`,
        plugins: [terser(terserOptions)],
        format: 'es',
      },
      {
        file: `./dist/utils/index-umd.min.js`,
        plugins: [terser(terserOptions)],
        format: 'umd',
        name: 'DynamicContentRoutingUtils',
      },
    ],
    plugins: [
      ts({
        tsconfig: tsOptionsOverwritten,
      }),
      babel(babelOptions),
    ],
  },
];
