/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './content/**/*.md'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0f172a',
        paper: '#f8fafc',
        indigoBrand: '#4f46e5',
        cyanBrand: '#0891b2'
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
      },
      boxShadow: {
        lift: '0 18px 45px -24px rgba(15, 23, 42, .28)',
        glow: '0 0 0 5px rgba(79, 70, 229, .10)'
      }
    }
  }
}
