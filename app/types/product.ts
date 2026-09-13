export type ColorOption = {
  name: string;
  swatch: string;
};

export type InterestedEntry = {
  name: string;
  color?: string;
};

export type ProductProps = {
  id: number;
  name: string;
  tag: string;
  tagBg: string;
  totalPrice: number;
  images: string[];
  features: string[];
  color: ColorOption[];
  interested: InterestedEntry[];
  manual: string;
  // ref:string;
};
