import * as React from 'react';
import {
  FocusZone,
  FocusZoneDirection
} from 'office-ui-fabric-react/lib/FocusZone';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import styles from './SiteDirectory.module.scss'
import { List } from 'office-ui-fabric-react/lib/List';

import { TeamSiteCollection } from '../../../utilities/TeamSiteCollection';
import { _Site } from '../../../../lib/utilities/TeamSiteCollection';
import { SiteFollow } from './SiteFollow';

export interface ISiteListProps {
    siteColl: Array<TeamSiteCollection>;
    context: any;
}
export interface ISiteListState {
    
}

export class SiteList extends React.Component<ISiteListProps, ISiteListState> {
  constructor(props: ISiteListProps, state: ISiteListState) {
    super(props);
    
    this.state = {
        sites: Array<_Site>()
    }
  }

  public render(): React.ReactElement<ISiteListProps> {
    return (
      <FocusZone direction={ FocusZoneDirection.vertical }>
        <div className='example-class' data-is-scrollable={ true }>
          <List
            className={styles["siteDirectory"]}
            items={ this.props.siteColl }
            onRenderCell={ this._onRenderCell }
          />
        </div>
      </FocusZone>
    );
  }

  @autobind
  private _onRenderCell(item: any, index: number, isScrolling: boolean): JSX.Element {
    return (
        <div>            
            {item.Sites.map(i => {
            return <div className={styles.tile}
                data-is-focusable={ true }
                style={ {
                    width: '100%'
                } }
                >
                    <div className={styles.sizer}>
                        <div className={styles.padder}> 
                            <a href={i.Path}>
                                { i.SiteLogoUrl ? <img src={ i.SiteLogoUrl } className={styles.bannerImage} /> : null }
                            </a>      
                            <span className={styles.label} >
                                {(() => {
                                    if (i.SiteLogoUrl == null) {
                                        return <a href={i.Path}>
                                            { i.Title }
                                        </a>
                                    } else {
                                        return <a href={i.Path} style={{ marginLeft: '50px'}}>
                                            { i.Title }
                                        </a>
                                    }
                                })()}
                                
                                <SiteFollow isFollowed={i.IsFollowed} pageUrl={i.Path} context={this.props.context} ></SiteFollow>
                            </span> 
                            <span className={styles.owner}>{i.Description}</span>
                        </div>     
                    </div>
            </div>;
            })}  
        </div>
        );
  }
}