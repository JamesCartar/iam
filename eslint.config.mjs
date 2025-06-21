import eslintPluginPrettier from 'eslint-plugin-prettier';
import prettierConfig from './.prettierrc.mjs';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: './tsconfig.json',
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
            prettier: eslintPluginPrettier,
        },
        rules: {
            quotes: ['error', 'double'],
            semi: ['error', 'always'],
            'prettier/prettier': ['error', prettierConfig],
        },
    },
    {
        ignores: ['dist', 'node_modules'],
    },
];
