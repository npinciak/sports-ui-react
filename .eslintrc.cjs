module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  overrides: [
    {
      files: '**/*.+(ts|tsx)',
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint/eslint-plugin'],
      extends: [
        'plugin:@@typescript-eslint/no-unused-vars',
        'plugin:@typescript-eslint/eslint-recommended', // removes redundant warnings between TS & ESLint
        'plugin:@typescript-eslint/recommended', // rules specific to typescript, e.g., writing interfaces
        'eslint-config-prettier/@typescript-eslint', // ensure rule set doesn't conflict with prettier for TS files too
      ],
      rules: {
        '@typescript-eslint/no-unused-vars': 'warn',
      },
    },
  ],
};
