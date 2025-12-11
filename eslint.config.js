// eslint.config.js
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import hooks from 'eslint-plugin-react-hooks';
import a11y from 'eslint-plugin-jsx-a11y';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(js.configs.recommended, ...tseslint.configs.recommended, {
  plugins: { react, 'react-hooks': hooks, 'jsx-a11y': a11y },
  languageOptions: {
    ecmaVersion: 'latest',
    globals: globals.browser,
    parserOptions: {
      ecmaFeatures: { jsx: true },
    },
  },
  settings: { react: { version: 'detect' } },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-explicit-any': 'error',

    /* 🔥 Newly Added Rules for Security, Bug Prevention & Standardization */

    // Possible Errors & Best Practices
    eqeqeq: ['error', 'always'], // Enforce === and !== for type-safe comparisons
    'no-console': ['warn', { allow: ['warn', 'error'] }], // Warn if console.log is used
    'no-alert': 'error', // Disallow alert, confirm, prompt (security concern)
    'no-eval': 'error', // Disallow eval() for security reasons
    'no-implied-eval': 'error', // Prevent setTimeout/setInterval from using strings

    // Variables & Code Quality
    'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }], // Prevent unused variables
    'no-undef': 'error', // Disallow using undeclared variables
    'no-shadow': 'error', // Prevent variable shadowing

    // Code Style
    curly: ['error', 'all'], // Force {} for all control statements
    semi: ['error', 'always'], // Enforce semicolons
    quotes: ['error', 'single', { avoidEscape: true }], // Use single quotes
    indent: ['error', 2, { SwitchCase: 1, ignoredNodes: ['JSXElement *', 'JSXElement'] }], // Enforce 2-space indentation
    'object-curly-spacing': ['error', 'always'], // Enforce spacing in object literals

    // React Specific
    'react/jsx-uses-react': 'off', // Handled by new JSX transform
    'react/jsx-uses-vars': 'error', // Prevent unused React components
    'react/self-closing-comp': 'error', // Require self-closing tags where possible

    // React Hooks
    'react-hooks/rules-of-hooks': 'error', // Enforce correct hook usage
    'react-hooks/exhaustive-deps': 'warn', // Warn about missing effect dependencies

    // Accessibility
    'jsx-a11y/alt-text': 'error', // Ensure <img> has alt text
    'jsx-a11y/anchor-is-valid': 'error', // Ensure anchors are valid
    'jsx-a11y/no-autofocus': 'warn', // Prevent autoFocus for accessibility

    // TypeScript-Specific
    '@typescript-eslint/explicit-function-return-type': 'warn', // Warn if return type not specified
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/no-non-null-assertion': 'error', // Prevent using ! (non-null assertions)
    '@typescript-eslint/consistent-type-imports': 'error', // Enforce type imports for clarity
  },
});
