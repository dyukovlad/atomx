import ts from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  external: ['@atomx-fast/core', 'vue'],
  output: [
    { file: 'dist/index.js', format: 'es' },
    { file: 'dist/index.cjs', format: 'cjs' },
  ],
  plugins: [
    ts({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist',
    }),
  ],
};
