import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'SiteDirectoryWebPartStrings';
import SiteDirectory from './components/SiteDirectory';
import { ISiteDirectoryProps } from './components/ISiteDirectoryProps';

export interface ISiteDirectoryWebPartProps {
  description: string;
}

export default class SiteDirectoryWebPart extends BaseClientSideWebPart<ISiteDirectoryWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISiteDirectoryProps > = React.createElement(
      SiteDirectory,
      {
        description: this.properties.description,
        context: this.context
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
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
