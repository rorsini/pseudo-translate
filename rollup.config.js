import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';

export default [
	// browser-friendly UMD build
	{
        input: 'src/ptify.js',
        external: ['fs'],
		output: {
			name: 'pseudoTranslatify',
			file: pkg.browser,
            format: 'umd',
            globals: {
                fs: 'fs'
            }
		},
		plugins: [
            commonjs({
                include: 'node_modules/**'
            }),
            resolve({
                include: 'node_modules/**',
                extensions: ['.js'],
                preferBuiltins: true
            })
		]
	},
	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify
    // `file` and `format` for each target)
	{
        input: 'src/ptify.js',
        external: ['fs'],
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		]
	}
];
