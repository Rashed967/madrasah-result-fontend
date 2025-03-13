/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // use font (kalpurush) variable font, like karpurush.variable, make it primary font


  theme: {
    extend: {
      fontFamily: {
        kalpurush: ['Kalpurush', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
