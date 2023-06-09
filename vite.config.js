import { resolve } from 'path'
import { defineConfig } from 'vite'
import { writeFile } from 'fs/promises';
import crypto from 'node:crypto'
import pkg from './package.json'

const packageName = pkg.name.charAt(0).toUpperCase() + pkg.name.slice(1)

export function createBanner() {
    return `/**
   * ${packageName}
   * version: ${pkg.version}
   * 
   * Copyright (c) itsrav.dev
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */`
}

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        footer: createBanner()
      }
    },
    outDir: './dist/js',
    minify: 'esbuild',
    lib: {
      entry: resolve(__dirname, 'resources/js/index.js'),
      name: packageName,
      fileName: pkg.name,
      formats: ['es']
    }
  },
  plugins: [
    {
        name: 'generate-build-id',
        apply: 'build',
        async writeBundle() {
            const buildId = crypto.randomUUID();
            const manifestData = { buildId };

            await writeFile('dist/manifest.json', JSON.stringify(manifestData, null, 2));
        },
    }
  ],
})
