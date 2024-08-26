import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'flowgames-black': "url('/flowgames-bg-black.png')",
        'flowgames-footer-bar': "url('/flowgames-footer-bar.png')",
      },
      keyframes: {
        hide: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        slideIn: {
          from: {
            transform: 'translateX(calc(100% + var(--viewport-padding)))',
          },
          to: { transform: 'translateX(0)' },
        },
        swipeOut: {
          from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
          to: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
        },
        slideDownAndFade: {
          from: { opacity: '0', transform: 'translateY(-2px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          from: { opacity: '0', transform: 'translateX(2px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideUpAndFade: {
          from: { opacity: '0', transform: 'translateY(2px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          from: { opacity: '0', transform: 'translateX(-2px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        hide: 'hide 100ms ease-in',
        slideIn: 'slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        swipeOut: 'swipeOut 100ms ease-out',
        slideDownAndFade:
          'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade:
          'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade:
          'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
      fontFamily: {
        bangers: ['Bangers'],
        ['russo-one']: ['Russo One'],
        ['rubik-mono-one']: ['Rubik Mono One'],
        ['permanent-market']: ['Permanent Marker'],
      },
    },
    colors: {
      black: {
        '50': '#000000',
      },
      white: {
        '50': '#ffffff',
        '100': '#f6f6f6',
        '120': '#f4f4f4',
        '150': '#f8f8f8',
        '170': '#F8FAFC',
        '180': '#E2ECF6',
        '200': '#dcdcdc',
        '250': '#d9d9d9',
        '300': '#bdbdbd',
        '350': '#DDDDDD',
        '370': '#E6E6E6',
        '400': '#989898',
        '450': '#868686',
        '500': '#7c7c7c',
        '550': '#717171',
        '600': '#656565',
        '650': '#6A6A6A',
        '670': '#6B6B6B',
        '700': '#525252',
        '800': '#464646',
        '900': '#3d3d3d',
        '950': '#000000',
      },
      red: {
        '50': '#FDE5E8',
        '100': '#FBCCD1',
        '150': '#F9B2BB',
        '200': '#F799A4',
        '300': '#F36676',
        '400': '#EF3349',
        '500': '#EB001B',
        '600': '#BC0016',
        '700': '#8D0010',
        '800': '#5E000B',
        '850': '#470008',
        '900': '#2F0005',
        '950': '#180003',
      },
      orange: {
        '50': '#FEF6E8',
        '100': '#FEEDD1',
        '150': '#FDE4BA',
        '200': '#FDDBA3',
        '300': '#FCCA76',
        '400': '#FBB848',
        '500': '#FAA61A',
        '600': '#C88515',
        '700': '#966410',
        '800': '#64420A',
        '850': '#4B3208',
        '900': '#322105',
        '950': '#191103',
      },
      green: {
        '50': '#DEFFBF',
        '100': '#CFF4AC',
        '150': '#C0EA99',
        '200': '#B2DF86',
        '300': '#A3D573',
        '400': '#85BF4D',
        '500': '#68AA27',
        '600': '#4A9501',
        '700': '#3B7701',
        '800': '#2C5901',
        '850': '#1E3C00',
        '900': '#162D00',
        '950': '#0F1E00',
      },
      blue: {
        '50': '#edf9ff',
        '100': '#d7f0ff',
        '200': '#b9e6ff',
        '300': '#88d9ff',
        '400': '#50c1ff',
        '500': '#28a2ff',
        '550': '#146ECC',
        '600': '#1989ff',
        '650': '#47A1FF',
        '700': '#0a6ceb',
        '750': '#0D57FF',
        '800': '#0f56be',
        '900': '#134c95',
        '950': '#112f5a',
      },
      old_yellow: {
        '50': '#FFF9E5',
        '100': '#FFF4CC',
        '150': '#FFEEB3',
        '200': '#FFE999',
        '250': '#FFE200',
        '300': '#FFDE66',
        '400': '#FFD333',
        '500': '#FFC800',
        '600': '#CCA000',
        '700': '#997800',
        '800': '#665000',
        '850': '#4D3C00',
        '900': '#332800',
        '950': '#1A1400',
      },
      yellow: {
        '50': '#FFFCE6',
        '100': '#FFF9CC',
        '150': '#FFF6B3',
        '200': '#FFF399',
        '300': '#FFEE66',
        '400': '#FFE833',
        '500': '#FFE200',
        '600': '#CCB500',
        '700': '#998800',
        '800': '#665A00',
        '850': '#4D4400',
        '900': '#332D00',
        '950': '#1A1700',
      },
      acquaGreen: {
        '50': '#ECFBF4',
        '100': '#E2F9EE',
        '150': '#C3F2DB',
        '200': '#3DD68C',
        '300': '#37C17E',
        '400': '#31AB70',
        '500': '#2EA169',
        '600': '#258054',
        '700': '#1B603F',
        '800': '#154B31',
      },
      gray: {
        '300': '#BDBDBD',
        '500': '#656565',
        '800': '#282828',
      },
    },
  },
  plugins: [],
};

export default config;
