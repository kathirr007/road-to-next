import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  react: true,
}, {
  rules: {
    'no-console': 'off',
    'unused-imports/no-unused-vars': 'off',
    'node/prefer-global/process': 'off',
  },
})
