// Load environment variables from .env.local
import {config} from 'dotenv';
import {resolve} from 'path';

config({path: resolve(process.cwd(), '.env.local')});

import '@/ai/flows/explain-code-functionality.ts';
import '@/ai/flows/deobfuscate-code.ts';
import '@/ai/flows/analyze-code-security.ts';
