import { createClient } from '@supabase/supabase-js';

/** Regex for placeholder {{field_STRING-OR-NUMBER_STRING-OR-NUMBER_...}} */
export const PLACEHOLDER_REGEX = /{{field_[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*}}/g;
export const LETTERS_NUMBERS_HYPEN_BLANK_REGEX = /^[a-zA-Z0-9-\s]+$/;

export const IS_RUNNING_LOCALLY =
  !!process && process.env.NODE_ENV === 'development';

export const SUPABASE_CLIENT = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_KEY ? createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
) : undefined;

export const TINA_URL =
  !!process &&
  process.env.NEXT_PUBLIC_TINA_URL &&
  process.env.NEXT_PUBLIC_TINA_URL.includes('localhost')
    ? process.env.NEXT_PUBLIC_TINA_URL
    : `${process.env.NEXT_PUBLIC_TINA_URL}${
        process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'main'
      }`;