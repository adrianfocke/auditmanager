import { createEnv } from '@t3-oss/env-nextjs';
import type { ZodError } from 'zod';
import { z } from 'zod';

export const env = createEnv({
  server: {
    TINA_TOKEN: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_TINA_CLIENT_ID: z.string().min(1),
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_KEY: z.string().min(1),
  },
  runtimeEnv: {
    TINA_TOKEN: process.env.TINA_TOKEN,
    NEXT_PUBLIC_TINA_CLIENT_ID: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_KEY,
  },
  skipValidation: process.env.NODE_ENV === 'development',
  onValidationError: (error: ZodError) => {
    console.info(
      'To use this application in production and handle environment variables, check out https://tina.io/docs/tina-cloud/overview/ and https://supabase.com/docs/guides/storage/quickstart for more info!'
    );

    console.error(
      'Invalid environment variables:',
      error.flatten().fieldErrors
    );
    throw new Error('Invalid environment variables');
  },
});
