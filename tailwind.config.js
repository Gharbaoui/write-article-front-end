// tailwind.config.js
module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [
    './public/**/*.html',
    './src/**/*.vue'
  ],
  theme: {
    extends: {},
  },
  variants: {},
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};  