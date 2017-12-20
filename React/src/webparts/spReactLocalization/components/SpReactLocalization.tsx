import * as React from 'react';
import styles from './SpReactLocalization.module.scss';
import { ISpReactLocalizationProps } from './ISpReactLocalizationProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as strings from 'SpReactLocalizationWebPartStrings';

export default class SpReactLocalization extends React.Component<ISpReactLocalizationProps, {}> {
  public render(): JSX.Element {
    return (
      <div className={styles.spReactLocalization}>
        <div className={styles.container}>
          <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
            <div className="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <span className='ms-font-xl ms-fontColor-white'>
                Welcome to SharePoint!
              </span>
              <p className='ms-font-l ms-fontColor-white'>
                Customize SharePoint experiences using Web Parts.
              </p>
              <p className='ms-font-l ms-fontColor-white'>
                {escape(this.props.greeting)}
              </p>
              <a href="https://aka.ms/spfx" className={styles.button}>
                <span className={styles.label}>{strings.LearnMoreButtonLabel}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
