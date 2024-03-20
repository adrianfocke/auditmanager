import type { IPatch } from 'docx';
import { FileQuery } from 'tina/__generated__/types';

export type Skeleton = `/uploads/skeletons/${string}.docx`;
export type Placeholders = `{{field_${string}}}`[];

/** Entity-bound placeholder to value relation */
export type PlaceholderRecord<T extends string | number | symbol> = Record<
  T,
  any
>;

export type FileLinkInfo = {
  link: string;
  name: string;
};

export type DocxStringConversionResult = {
  value: string;
  messages: {
    type: string;
    message: string;
  }[];
};
export type Patches = Record<string, IPatch>;
export type PatchParcel = {
  entity: FileQuery['file']['entity'];
  filename: string;
  placeholders: Placeholders;
  skeleton: Skeleton;
};

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
export type View = {
  placeholder: string;
  tinaField: string | undefined;
  value: string | string[] | undefined;
  viewType: ViewType | undefined;
};


export type Time = `${number}:${number}`;

export type PickerType = 'All Auditors';


export type GQLQueryType = 'All Auditors';
export type GQLQueryInfo = {
  query: string;
  filter: (data: any) => string[] | null;
};