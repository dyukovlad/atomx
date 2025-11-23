#!/usr/bin/env node
import { rollup } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const watch = process.argv.includes('--watch');

const pkgs = ['core', 'react', 'vue'];

async function build(name) {
  const pkg = JSON.parse(
    readFileSync(
      new URL(`../packages/${name}/package.json`, import.meta.url),
      'utf8'
    )
  );
  const input = `packages/${name}/src/index.ts`;
  const external = [
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.peerDependencies ?? {}),
  ];

  const bundle = await rollup({
    input,
    external,
    plugins: [
      typescript({
        tsconfig: `packages/${name}/tsconfig.json`,
        sourceMap: true,
      }),
    ],
  });

  await Promise.all([
    bundle.write({
      format: 'es',
      file: `packages/${name}/dist/index.js`,
      sourcemap: true,
    }),
    bundle.write({
      format: 'cjs',
      file: `packages/${name}/dist/index.cjs`,
      sourcemap: true,
    }),
  ]);

  if (!watch) await bundle.close();
}

(async () => {
  if (watch) {
    console.log('👀 watch mode');
    await Promise.all(pkgs.map(build));
  } else {
    await Promise.all(pkgs.map(build));
    console.log('✅ build complete');
  }
})();
