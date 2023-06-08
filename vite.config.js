import { resolve } from 'path'
import { defineConfig } from 'vite'
import vitePluginBanner from 'vite-plugin-banner';
import { writeFile } from 'fs/promises';
import crypto from 'node:crypto'

export function createBanner() {
    return `/**
   * Aquastrap
   * version: v1.0.0
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
        input: resolve(__dirname, 'resources/js/index.js')
    },
    outDir: './dist/js',
    minify: 'esbuild',
    lib: {
      entry: resolve(__dirname, 'resources/js/index.js'),
      name: 'Aquastrap',
      fileName: 'aquastrap',
      formats: ['es']
    }
  },
  plugins: [
    vitePluginBanner(createBanner()),
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
