/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // toggle via class="dark" on <html>
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        whatsapp: {
          teal: '#00a884',      // primary accent (light)
          tealDark: '#005c4b',  // sent bubble (dark mode)
          panel: '#ffffff',     // light panel bg
          panelDark: '#111b21', // dark panel bg
          bg: '#f0f2f5',        // light app bg
          bgDark: '#0b141a',    // dark app bg
          bubbleIn: '#ffffff',
          bubbleInDark: '#202c33',
          bubbleOut: '#d9fdd3',
          bubbleOutDark: '#005c4b',
          border: '#e9edef',
          borderDark: '#2a3942',
          textMuted: '#667781',
          textMutedDark: '#8696a0',
        },
      },
    },
  },
  plugins: [],
};
