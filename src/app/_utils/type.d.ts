export interface IService {
  _id: string;
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
  cost?: string;
  image?: string;
}
export interface ILocation {
  _id: string;
  name: string;
  address: string;
  hours: string;
  phoneNumber: string;
  access: string;
  description?: string;
}

export interface IParagraph {
  id?: number;
  header?: string;
  body?: string;
  image?: string;
  imageDesc?: string;
}
export interface IBlog {
  _id: string;
  title: string;
  description: string;
  author: string;
  thumbnail: string;
  keyword: string[];
  content: IParagraph[];
  publishedDate: Date;
  lastModified: Date;
  status: string;
}

export interface IUser {
  _id: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  lastLoggedIn: Date;
  updatedAt: Date;
}
