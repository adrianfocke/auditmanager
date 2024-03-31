import { SUPABASE_CLIENT } from './constants';

// TODO do on server

export const supabaseDownload = async (filename: string) => {
  if (!SUPABASE_CLIENT) {
    return null
  }

  try {
    const { data, error } = await SUPABASE_CLIENT.storage
      .from('Documents')
      .download(`${filename}`);

    if (!data) {
      console.error(error);
      throw new Error(`${error}`);
    }

    return data;
  } catch (error) {
    console.error(error);
  }

  return null;
};

export const supabaseUpsert = async (filename: string, file: any) => {
  if (!SUPABASE_CLIENT) {
    return null;
  }

  try {
    const { data, error } = await SUPABASE_CLIENT.storage
      .from('Documents')
      .upload(`${filename}.docx`, file, {
        contentType:
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        upsert: true,
      });

    if (!data) {
      console.error(error);
      throw new Error(`${error}`);
    }

    return data;
  } catch (error) {
    console.error(error);
  }

  return null;
};
