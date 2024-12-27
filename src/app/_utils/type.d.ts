export interface IService {
  _id: any;
  title: string;
  description: string;
  thumbnail: string;
  images?: string[];
  steps: IDetail[];
  costs: IDetail[];
  campaign?: string[];
  benefits?: IDetail[];
  reviews?: IDetail[];
  publishedDate: Date;
  lastModified: Date;
  status: string;
}

export interface IDetail {
  id: number;
  title?: string;
  description?: string;
}
export interface ILocation {
  name: string;
  address: string;
  hours: string;
  phoneNumber: string;
  access: string;
}

export interface IParagraph {
  id?: number;
  header?: string;
  body?: string;
  image?: string;
  imageDesc?: string;
}
export interface IBlog {
  _id: any;
  title: string;
  description: string;
  thumbnail: string;
  keyword: string[];
  content: IParagraph[];
  publishedDate: Date;
  lastModified: Date;
  status: string;
}

export interface IUser {
  _id: any;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  lastLoggedIn: Date;
  updatedAt: Date;
}
