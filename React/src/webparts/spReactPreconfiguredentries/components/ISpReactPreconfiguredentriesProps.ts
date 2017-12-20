import { ISpReactPreconfiguredentriesWebPartProps } from '../SpReactPreconfiguredentriesWebPart';

export interface ISpReactPreconfiguredentriesProps extends ISpReactPreconfiguredentriesWebPartProps {
  listName: string;
  order: string;
  numberOfItems: number;
  style: string;
}
