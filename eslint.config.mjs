import globals from 'globals'
import parser from 'vue-eslint-parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
})

export default [
	...compat.extends(
		'plugin:vue/vue3-recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'plugin:prettier/recommended'
	),
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			},

			parser: parser,
			ecmaVersion: 2020,
			sourceType: 'module',

			parserOptions: {
				parser: '@typescript-eslint/parser',
				jsxPragma: 'React',

				ecmaFeatures: {
					jsx: true
				}
			}
		},

		rules: {
			'no-var': 'error',

			'no-multiple-empty-lines': [
				'error',
				{
					max: 1
				}
			],

			'no-use-before-define': 'off',
			'prefer-const': 'off',
			'no-irregular-whitespace': 'off',
			'@typescript-eslint/no-unused-vars': 'error',
			'@typescript-eslint/prefer-ts-expect-error': 'error',
			'@typescript-eslint/no-inferrable-types': 'off',
			'@typescript-eslint/no-namespace': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/ban-types': 'off',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/no-var-requires': 'off',
			'@typescript-eslint/no-empty-function': 'off',
			'@typescript-eslint/no-use-before-define': 'off',
			'@typescript-eslint/ban-ts-comment': 'off',
			'@typescript-eslint/no-non-null-assertion': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off'
		}
	}
]
