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
                    darker: '#050914',
                }
            },
            backgroundImage: {
                'gradient-cyber': 'linear-gradient(135deg, #22D3EE 0%, #8B5CF6 100%)',
                'gradient-void': 'linear-gradient(to bottom, #020617, #0B1121)',
                'gradient-premium': 'radial-gradient(circle at 50% -20%, rgba(139, 92, 246, 0.15) 0%, rgba(34, 211, 238, 0.05) 40%, #020617 80%)',
                'gradient-architecture': 'radial-gradient(circle at 50% 0%, #0B1121 0%, #020617 100%)',
                'gradient-agent': 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.12) 0%, rgba(236, 72, 153, 0.08) 40%, #020617 80%)', // Subtle Google AI pink/purple
                'gradient-orchestrator': 'radial-gradient(circle at 50% 0%, rgba(34, 211, 238, 0.08) 0%, #020617 70%)',
                'gradient-ecosystem': 'linear-gradient(to bottom, #020617, #0B1121)',
                'gradient-visuals': 'radial-gradient(circle at 50% 100%, #1a2035 0%, #020617 70%)',
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'marquee': 'marquee 25s linear infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'aurora': 'aurora 60s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '200% 0' },
                    '100%': { backgroundPosition: '-200% 0' }
                },
                aurora: {
                    '0%': { backgroundPosition: '50% 50%, 50% 50%' },
                    '100%': { backgroundPosition: '350% 50%, 350% 50%' },
                }
            }
        }
    },
    plugins: [],
}
