/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Space Grotesk', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            colors: {
                brand: {
                    navy: '#020617',
                    cyan: '#22D3EE',
                    violet: '#8B5CF6',
                    dark: '#0B1121',
                }
            },
            backgroundImage: {
                'gradient-cyber': 'linear-gradient(135deg, #22D3EE 0%, #8B5CF6 100%)',
                'gradient-void': 'linear-gradient(to bottom, #020617, #0B1121)',
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'marquee': 'marquee 25s linear infinite',
                'shimmer': 'shimmer 2s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '200% 0' },
                    '100%': { backgroundPosition: '-200% 0' }
                }
            }
        }
    },
    plugins: [],
}
