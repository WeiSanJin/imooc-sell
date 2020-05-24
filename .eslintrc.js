module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
	'semi': ['error', 'always'],
	'no-tabs': 'off',
	'indent' : 'off',
	// 'no-mixed-spaces-and-tabs': 0,
	'space-before-function-paren': 0,
	'prefer-const':0,
	'no-unused-vars':0,
  }
}
