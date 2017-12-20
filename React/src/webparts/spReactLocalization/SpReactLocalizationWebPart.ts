import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  IPropertyPaneField
} from '@microsoft/sp-webpart-base';

import * as strings from 'SpReactLocalizationWebPartStrings';
import SpReactLocalization from './components/SpReactLocalization';
import { ISpReactLocalizationProps } from './components/ISpReactLocalizationProps';

import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http';

export interface ISpReactLocalizationWebPartProps {
}

export default class SpReactLocalizationWebPart extends BaseClientSideWebPart<ISpReactLocalizationWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISpReactLocalizationProps > = React.createElement(
      SpReactLocalization,
      {
        greeting: this.getGreeting()
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
              groupName: strings.GreetingGroupName,
              groupFields: this.greetingFields
            }
          ]
        }
      ]
    };
  }

  protected onPropertyPaneConfigurationStart(): void {
    this.context.statusRenderer.displayLoadingIndicator(this.domElement, 'languages');

    this.getSupportedLanguageIds()
      .then((supportedLanguagesIds: number[]): void => {
        this.greetingFields = [];
        supportedLanguagesIds.forEach(localeId => {
          this.greetingFields.push(PropertyPaneTextField(`greeting_${localeId}`, {
            label: this.getLocaleName(localeId)
          }));
        });

        this.context.propertyPane.refresh();
        this.context.statusRenderer.clearLoadingIndicator(this.domElement);
        this.render();
      });
  }

  private greetingFields: IPropertyPaneField<any>[] = [];

  private supportedLanguageIds: number[];

  private locales = {
    1025: 'ar-SA',1026: 'bg-BG',1027: 'ca-ES',1028: 'zh-TW',1029: 'cs-CZ',1030: 'da-DK',1031: 'de-DE',1032: 'el-GR',
    1033: 'en-US',1035: 'fi-FI',1036: 'fr-FR',1037: 'he-IL',1038: 'hu-HU',1040: 'it-IT',1041: 'ja-JP',1042: 'ko-KR',
    1043: 'nl-NL',1044: 'nb-NO',1045: 'pl-PL',1046: 'pt-BR',1048: 'ro-RO',1049: 'ru-RU',1050: 'hr-HR',1051: 'sk-SK',
    1053: 'sv-SE',1054: 'th-TH',1055: 'tr-TR',1057: 'id-ID',1058: 'uk-UA',1060: 'sl-SI',1061: 'et-EE',1062: 'lv-LV',
    1063: 'lt-LT',1066: 'vi-VN',1068: 'az-Latn-AZ',1069: 'eu-ES',1071: 'mk-MK',1081: 'hi-IN',1086: 'ms-MY',1087: 'kk-KZ',
    1106: 'cy-GB',1110: 'gl-ES',1164: 'prs-AF',2052: 'zh-CN',2070: 'pt-PT',2074: 'sr-Latn-CS',2108: 'ga-IE',3082: 'es-ES',
    5146: 'bs-Latn-BA',9242: 'sr-Latn-RS',10266: 'sr-Cyrl-RS',
  };

  private getGreeting(): string {
    let localeId: number = this.getLocaleId(this.context.pageContext.cultureInfo.currentUICultureName);
    if(localeId === 0) {
      localeId = 1033;
    }

    return this.properties[`greeting_${localeId}`];
  }

  private getSupportedLanguageIds(): Promise<number[]> { 
    return new Promise<number[]>((resolve: (suppertedLanguageIds: number[]) => void, reject: (error: any) => void): void => {
      if(this.getSupportedLanguageIds) {
        resolve(this.supportedLanguageIds);
        return;
      }

      this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + '/_api/web?$select=SupportedUILanguageIds', SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse): Promise<{ SupportedUILanguageIds: number[] }> => {
          return response.json();
        }).then((siteInfo:  { SupportedUILanguageIds: number[] }): void => {
          this.supportedLanguageIds = siteInfo.SupportedUILanguageIds;
          resolve(siteInfo.SupportedUILanguageIds);
        }, (error: any): void => {
          reject(error);
        });
    });
  }

  private getLocaleId(localeName: string): number {
    const pos: number = (Object as any).values(this.locales).indexOf(localeName);
    if (pos > -1) {
      return parseInt(Object.keys(this.locales)[pos]);
    }
    else {
      return 0;
    }
  }

  private getLocaleName(localeId: number): string {
    const pos: number = Object.keys(this.locales).indexOf(localeId.toString());
    if (pos > -1) {
      return (Object as any).values(this.locales)[pos];
    }
    else {
      return '';
    }
  }
}
