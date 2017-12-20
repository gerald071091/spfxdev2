import * as React from 'react';
import styles from './SpReact.module.scss';
import { ISpReactProps } from './ISpReactProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class SpReact extends React.Component<ISpReactProps, {}> {
  public render(): React.ReactElement<ISpReactProps> {
    return (
      <div className={ styles.spReact }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>{escape(this.props.welcome)}</span>
              <p className={ styles.subTitle }>{escape(this.props.introduction)}</p>
              <a href={ this.props.learnMoreLink } className={ styles.button }>
                <span className={ styles.label }>{escape(this.props.learnMore)}</span>
              </a>
              <div id="spContainer" />
              {this.props.renderContainer}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
