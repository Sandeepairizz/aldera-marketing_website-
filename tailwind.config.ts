import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/context/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        porcelain: '#F5F5F0',
        onyx: '#0A0A0A',
        'electric-red': '#FF2E1F',
        alabaster: '#DFDFDA',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        display: ['var(--font-sans)', 'sans-serif'],
        body: ['var(--font-sans)', 'sans-serif'],
        inter: ['var(--font-sans)', 'sans-serif'],
        h1: ['var(--font-sans)', 'sans-serif'],
        heading: ['var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-sans)', 'sans-serif'],
      },
      letterSpacing: {
        h1: '-0.035em',
        h2: '-0.035em',
        statement: '-0.035em',
        label: '0.04em',
      },
      lineHeight: {
        h1: '1.05',
        h2: '1.05',
        statement: '1.08',
        p: '1.45',
      },
    },
  },
  plugins: [],
};

export default config;
