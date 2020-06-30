import { Type } from '@angular/core';

export interface IRotationData {
  items: IRotationItem[][];
  clickableContent: Type<any>;
  clickableHeader: Type<any>;
}

export interface IRotationItem {
  type: string;
  title: string;
  subtitles: any[];
}

export interface IFeatureRotationItem extends  IRotationItem {
  agileType: string;
}
