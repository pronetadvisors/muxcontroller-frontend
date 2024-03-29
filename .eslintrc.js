module.exports = {
	root: true,
	env: {
		node: true
	},
	'extends': [
		'plugin:vue/vue3-essential',
		'eslint:recommended'
	],
	parserOptions: {
		parser: '@babel/eslint-parser',
		requireConfigFile: false
	},
	globals: {
		"M": true
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		"indent": ["warn", "tab"],
		"no-tabs": ["warn", { allowIndentationTabs: true }],
		"eol-last": ["warn", "never"],
		"semi": ["warn", 'always']
	}
};