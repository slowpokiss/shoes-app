export interface cardInterface {
  price: number;
  images: Array<string>;
  title: string;
  id?: number | undefined;
}

export interface categoryInterface {
  title: string;
  id: number;
}

export interface singleCardInterface {
  id: number;
  category: number;
  title: string;
  images: Array<string>;
  sku: string;
  manufacturer: string;
  color: string;
  material: string;
  reason: string;
  season: string;
  heelSize: string;
  price: number;
  sizes: {
    size: string;
    available: boolean;
  }[];
}
