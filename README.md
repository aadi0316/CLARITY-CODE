# ClarityCode

A powerful Next.js application that uses AI to deobfuscate code, analyze security vulnerabilities, and explain code functionality. Built with Google Gemini AI via Genkit.

## Features

- **Code Deobfuscation**: Submit obfuscated code and receive a clean, readable version
- **Security Analysis**: Analyze code for security vulnerabilities, obfuscation types, and complexity
- **Code Explanation**: Get AI-powered explanations of code functionality
- **Modern UI**: Beautiful, responsive interface built with Tailwind CSS and shadcn/ui components

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google GenAI API Key ([Get one here](https://aistudio.google.com/apikey))

## Installation

1. Clone the repository:
```bash
git clone <https://github.com/aadi0316/Clarity-code.git>
cd Clarity-code
```

2. Install dependencies:
```bash
npm install
```

## Environment Setup

1. Create a `.env.local` file in the project root:
```bash
# Windows PowerShell
New-Item -Path .env.local -ItemType File

# Linux/Mac
touch .env.local
```

2. Add your Google GenAI API key to `.env.local`:
```env
GOOGLE_GENAI_API_KEY=your_api_key_here
```

Get your API key from: https://aistudio.google.com/apikey

## Running the Application

This project requires **two servers** to run simultaneously:

### Option 1: Run in Separate Terminals (Recommended)

**Terminal 1 - Genkit AI Server:**
```bash
npm run genkit:watch
```
This starts the Genkit server with watch mode for hot-reloading AI flows.

**Terminal 2 - Next.js Development Server:**
```bash
npm run dev
```
This starts the Next.js app on port 9002 with Turbopack.

### Option 2: Run Genkit Once (Without Watch)

If you prefer not to use watch mode for Genkit:

**Terminal 1:**
```bash
npm run genkit:dev
```

**Terminal 2:**
```bash
npm run dev
```

## Access the Application

- **Main Application**: http://localhost:9002
- **Genkit UI**: http://localhost:4000 (if available)

## Available Scripts

- `npm run dev` - Start Next.js dev server with Turbopack on port 9002
- `npm run genkit:dev` - Start Genkit server (single run)
- `npm run genkit:watch` - Start Genkit server with watch mode (recommended)
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Project Structure

```
Clarity-code/
├── src/
│   ├── ai/                    # AI configuration and flows
│   │   ├── ai-instance.ts     # Genkit AI instance setup
│   │   ├── dev.ts             # Genkit dev entry point
│   │   └── flows/             # AI flow definitions
│   │       ├── deobfuscate-code.ts
│   │       ├── analyze-code-security.ts
│   │       └── explain-code-functionality.ts
│   ├── app/                   # Next.js app directory
│   │   ├── page.tsx           # Main application page
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   └── ui/                # shadcn/ui components
│   ├── hooks/                 # Custom React hooks
│   └── lib/                   # Utility functions
├── docs/                      # Documentation
│   └── blueprint.md           # Project blueprint
└── package.json
```

## Technology Stack

- **Framework**: Next.js 15.2.3 with Turbopack
- **AI**: Genkit 1.0.4 with Google Gemini 2.0 Flash
- **UI**: React 18, Tailwind CSS, shadcn/ui components
- **Language**: TypeScript
- **State Management**: React Hooks, TanStack Query

## Troubleshooting

### Port Already in Use
If port 9002 is already in use, you can change it in `package.json`:
```json
"dev": "next dev --turbopack -p <your-port>"
```

### API Key Issues
- Ensure `.env.local` is in the project root
- Verify the API key is correct and has proper permissions
- Restart both servers after adding/changing the API key

### Genkit Server Not Starting
- Check that all dependencies are installed: `npm install`
- Verify Node.js version is 18 or higher: `node --version`
- Check the terminal output for specific error messages

## License

Private project
