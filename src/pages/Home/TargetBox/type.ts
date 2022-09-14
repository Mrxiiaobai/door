import { ReactNode } from "react";

export type stringAndnull = string | null
export type numAndstring = number | string

export interface base {
  children: ReactNode;
  id:  number;
  formId:numAndstring;
  name: string;
  componentName: string;
  schema: Object;
  data: any;
}

export interface cardBase extends base {
  overIndex?:number;
}

export interface element {
  top: numAndstring;
  bottom: numAndstring;
  left: numAndstring;
  tight: numAndstring;
}