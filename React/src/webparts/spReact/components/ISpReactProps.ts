import { ISpReactWebPartProps } from '../SpReactWebPart';

export interface ISpReactProps extends ISpReactWebPartProps {
  welcome: string;
  introduction: string;
  learnMore: string;
  learnMoreLink: string;
  renderContainer: any;
}
