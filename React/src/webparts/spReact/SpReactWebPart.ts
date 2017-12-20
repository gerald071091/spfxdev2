import { 
  Environment,
  EnvironmentType 
} from '@microsoft/sp-core-library';

import styles from './components/SpReact.module.scss';

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneLink,
  PropertyPaneLabel,
  PropertyPaneButton
} from '@microsoft/sp-webpart-base';

import * as strings from 'SpReactWebPartStrings';
import SpReact from './components/SpReact';
import { ISpReactProps } from './components/ISpReactProps';
import { PropertyPaneButtonType } from '@microsoft/sp-webpart-base/lib/propertyPane/propertyPaneFields/propertyPaneButton/IPropertyPaneButton';

export interface ISpReactWebPartProps {
  // If you want to use the properties object values in manifest...
}

export default class SpReactWebPart extends BaseClientSideWebPart<ISpReactWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISpReactProps > = React.createElement(
      SpReact,
      {
        welcome: strings.WelcomeMessage,
        introduction: strings.IntroductionMessage,
        learnMore: strings.LearnLocaleName,
        learnMoreLink: strings.LearnMoreLinkAddress,
        renderContainer: this.checkEnvironment()
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.DisplayGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneLink('link', {
                  disabled: false,
                  href: strings.LinkAddress,
                  text: strings.LinkTextDisplay
                }),
                PropertyPaneLabel('label', {
                  required: false,
                  text: strings.LabelLocaleText
                }),
                PropertyPaneButton('click', {
                  disabled: false,
                  text: strings.ButtonLocaleName,
                  ariaDescription: 'description',
                  ariaLabel: 'label',
                  buttonType: PropertyPaneButtonType.Normal,
                  onClick: () => alert(strings.AlertMessage)
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private checkEnvironment(): void {
    let html: string = '';
    // Local environment
    if (Environment.type === EnvironmentType.Local) {
      html = `<p class="${styles.description}">${strings.LocalMessage}</p>`;
    }
    else if (Environment.type === EnvironmentType.SharePoint ||
              Environment.type == EnvironmentType.ClassicSharePoint) {
      html = `<p class="${styles.description}">${strings.OnlineMessage}</p>`;
    }

    setTimeout(() => {
      const container: Element = this.domElement.querySelector('#spContainer');
      container.innerHTML = html;
    }, 1000);
  }

}
