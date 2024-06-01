import type client from '@/tina/__generated__/client';
import { FileQuery } from '@/tina/__generated__/types';
import type { IPatch } from 'docx';

export type Skeleton = `/uploads/skeletons/${string}.docx`;
export type Placeholders = `{{field_${string}}}`[];

export type DocxStringConversionResult = {
  value: string;
  messages: {
    type: string;
    message: string;
  }[];
};
export type Patches = Record<string, IPatch>;

export interface PatchableEntity {
  placeholderTinaField: (
    data: FileQuery,
    placeholder: string
  ) => string | undefined;
  placeholderValue: (
    data: FileQuery,
    placeholder: string
  ) => string[] | string | undefined;
  placeholderValueType: (placeholder: string) => ViewType | undefined;
  patches: (
    entity: FileQuery['file']['entity'],
    placeholders: string[]
  ) => Patches;
}

export type ViewType = 'LIST' | 'NONE' | 'TABLE' | 'TEXT';

export type Time = `${number}:${number}`;

export type TinaBackendParcel = {
  query: keyof typeof client.queries;
  variables?: Record<string, any>;
};

export type PickerType =
  | 'All Auditors'
  | 'All Partners'
  | 'Audit Context'
  | 'Audit Type'
  | 'Audit Type Relation'
  | 'Standard Section';
export interface PickerTypeSettings {
  display: (data: any) => any;
  query: TinaBackendParcel['query'];
  variables: (
    data?: string
  ) => { relativePath: string } | Record<string, never>;
  variant: 'SingleValue' | 'MultiValue';
}

export type PatchBackendParcel = {
  file: FileQuery;
  placeholders: Placeholders;
};