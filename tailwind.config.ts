
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				mono: ['JetBrains Mono', 'monospace'],
				sans: ['Inter', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				hacker: {
					DEFAULT: '#0F0',     // Bright terminal green
					dark: '#050',        // Darker green for contrast
					light: '#AFA',       // Lighter green for highlights
					text: '#0F0',        // Text green 
					neon: '#00FF41',     // Neon green for special effects
					toxic: '#39FF14',    // Toxic bright green
					lime: '#32CD32',     // Lime green
					matrix: '#003B00',   // Matrix dark green
					glow: '#00FF00',     // Glowing terminal green
				},
				cyber: {
					blue: '#0EA5E9',      // Bright cyber blue
					purple: '#8B5CF6',    // Vivid purple
					magenta: '#D946EF',   // Magenta pink
					orange: '#F97316',    // Bright orange
					yellow: '#FACC15',    // Electric yellow
					red: '#EF4444',       // Danger red
					teal: '#14B8A6',      // Teal
					pink: '#EC4899',      // Neon pink
					indigo: '#6366F1',    // Futuristic indigo
				},
				glitch: {
					dark: '#0D0221',      // Deep space purple
					primary: '#8864B3',   // Electric purple
					secondary: '#5A189A', // Deep purple
					accent: '#3F0071',    // Dark purple
					highlight: '#BC00DD', // Bright purple
					blue: '#190BF5',      // Glitch blue
					pink: '#FB2576',      // Hot pink
					teal: '#21E6C1',      // Electric teal
					yellow: '#FFCC00',    // Warning yellow
				},
				retro: {
					black: '#0A0A0A',      // Deep black
					darkBlue: '#0000AA',   // Dark blue (DOS)
					blue: '#0000FF',       // Classic blue
					green: '#00AA00',      // Terminal green
					cyan: '#00AAAA',       // Aqua cyan
					red: '#AA0000',        // Dark red
					magenta: '#AA00AA',    // Magenta
					brown: '#AA5500',      // Brown
					gray: '#AAAAAA',       // Light gray
					darkGray: '#555555',   // Dark gray
					brightBlue: '#5555FF', // Bright blue
					brightGreen: '#55FF55', // Bright green
					brightCyan: '#55FFFF', // Bright cyan
					brightRed: '#FF5555',  // Bright red
					brightMagenta: '#FF55FF', // Bright magenta
					yellow: '#FFFF55',     // Yellow
					white: '#FFFFFF',      // White
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'fade-in': {
					from: { opacity: '0' },
					to: { opacity: '1' },
				},
				'fade-up': {
					from: { opacity: '0', transform: 'translateY(10px)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},
				'fade-down': {
					from: { opacity: '0', transform: 'translateY(-10px)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},
				'fade-left': {
					from: { opacity: '0', transform: 'translateX(10px)' },
					to: { opacity: '1', transform: 'translateX(0)' },
				},
				'fade-right': {
					from: { opacity: '0', transform: 'translateX(-10px)' },
					to: { opacity: '1', transform: 'translateX(0)' },
				},
				'scan-line': {
					from: { transform: 'translateY(0)' },
					to: { transform: 'translateY(100%)' },
				},
				typing: {
					from: { width: '0' },
					to: { width: '100%' },
				},
				blink: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0' },
				},
				'matrix-rain': {
					'0%': { transform: 'translateY(-100%)', opacity: '0' },
					'30%': { opacity: '1' },
					'100%': { transform: 'translateY(100%)', opacity: '0.3' },
				},
				'glitch': {
					'0%, 100%': { transform: 'translateX(0)' },
					'20%': { transform: 'translateX(-5px)' },
					'40%': { transform: 'translateX(5px)' },
					'60%': { transform: 'translateX(-2px)' },
					'80%': { transform: 'translateX(2px)' },
				},
				'crt-flicker': {
					'0%': { opacity: '0.9' },
					'50%': { opacity: '1' },
					'100%': { opacity: '0.9' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out forwards',
				'fade-up': 'fade-up 0.5s ease-out forwards',
				'fade-down': 'fade-down 0.5s ease-out forwards',
				'fade-left': 'fade-left 0.5s ease-out forwards',
				'fade-right': 'fade-right 0.5s ease-out forwards',
				'scan-line': 'scan-line 2s linear infinite',
				'typing': 'typing 3.5s steps(40, end), blink .75s step-end infinite',
				'blink': 'blink 1s step-end infinite',
				'matrix-rain': 'matrix-rain 3s linear infinite',
				'glitch': 'glitch 0.3s ease-in-out infinite',
				'crt-flicker': 'crt-flicker 0.15s infinite',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
