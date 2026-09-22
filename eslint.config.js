import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import reactHooks from 'eslint-plugin-react-hooks'

export default tseslint.config(
  { ignores: ['dist', 'coverage', 'node_modules'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: { 'react-hooks': reactHooks },
    rules: reactHooks.configs.recommended.rules,
  },
  {
    files: ['src/**/*.tsx'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          // Tailwind scans built files as static text, so a class name assembled from a
          // variable produces no CSS and the component renders unstyled with no error.
          // Same rule, and same reason, as in the unitykit repository.
          selector: 'JSXAttribute[name.name="className"] TemplateLiteral',
          message:
            'Class names must be written out in full, not built by interpolation. Use a lookup object.',
        },
      ],
    },
  },
)
