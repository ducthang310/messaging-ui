export interface NameValue {
  name: string;
  value: string | number;
}

export enum DeviceMode {
  mobile = 0,
  tablet = 1,
  desktop = 2
}

export interface Country {
  name: string;
  code: string;
}

export interface Language {
  name: string;
  code: string;
  nativeName: string;
}
