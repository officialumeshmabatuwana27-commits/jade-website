/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./preview.html",
    "./admin.html",
    "./wp-theme/jade-coatings/**/*.{php,html,js}"
  ],
  safelist: [
    'h-18',
    'sm:h-13',
    'bg-white/98',
    'shadow-xs',
    'scrollbar-none',
    'bg-[#00A651]',
    'bg-[#EBF8F2]',
    'bg-[#074626]',
    'text-[#00A651]',
    'text-[#074626]',
    'text-[#231F20]',
    'border-[#00A651]/20',
    'pointer-events-none',
    'opacity-50',
    'from-[#00A651]',
    'to-[#074626]',
    'from-stone-500',
    'to-zinc-400',
    'from-stone-400',
    'to-zinc-300',
    'from-zinc-700',
    'to-stone-800',
    'from-emerald-500',
    'to-emerald-700',
    'from-zinc-800',
    'to-slate-900',
    'from-blue-600',
    'to-indigo-700',
    'md:grid-cols-1',
    'md:grid-cols-2',
    'md:grid-cols-3',
    'md:grid-cols-4',
    'md:grid-cols-12',
    'md:col-span-5',
    'md:col-span-7',
    'md:gap-6',
    'md:gap-8',
    'md:flex',
    'md:block',
    'md:hidden',
    'md:text-6xl',
    'md:h-52',
    'md:h-[620px]'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        'md': '768px',  // Tablet Portrait
        'lg': '1024px', // Tablet Landscape / Desktop
        'xl': '1280px',
        '2xl': '1536px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Manrope', 'Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#00A651',
          hover: '#008F45',
          dark: '#074626',
          deep: '#032613',
          pale: '#EBF8F2',
          light: '#bbf1d5',
          charcoal: '#231F20',
        },
        dark: {
          bg: '#0B0F17',
          card: '#131B26',
          surface: '#1A2433',
          border: '#233044',
        }
      }
    }
  },
  plugins: [],
}
