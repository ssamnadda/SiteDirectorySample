import * as React from 'react';
import styles from './SiteDirectory.module.scss';
import { ISiteDirectoryProps } from './ISiteDirectoryProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric'

import { Label } from 'office-ui-fabric-react/lib/Label';
import {
  Pivot,
  PivotItem,
  PivotLinkFormat
} from 'office-ui-fabric-react/lib/Pivot';
import { TeamSiteCollection } from '../../../utilities/TeamSiteCollection';
import { SearchService } from '../../../services/SearchService';
import { FollowService } from '../../../services/FollowService';
import { Constants } from '../../../utilities/Constants';
import { PivotLinkSize } from 'office-ui-fabric-react/lib/components/Pivot';
import { SiteList } from '../../../../lib/webparts/siteDirectory/components/SiteList';


export interface ISiteDirectoryState {
  sites: Array<TeamSiteCollection>
}
export default class SiteDirectory extends React.Component<ISiteDirectoryProps, ISiteDirectoryState> {
  private _columnCount: number;
  private _columnWidth: number;
  private _rowHeight: number;
  private _searchQueries: Array<string>;
  constructor(props: ISiteDirectoryProps, state: ISiteDirectoryState) {
    super(props);
    this.state = {
      sites: Array<TeamSiteCollection>()
    };  

    this._searchQueries = [];    
  }

  componentDidMount() {
    let searchTerm = Constants.searchQueries.filter(item => item.name == 'all')[0].searchQuery;
    let selectedProperties = [], sortList = [];
    let promises: any[] = new Array<any>();
    let labels = [];
    let rowlimit = 5;
    let recentRowLimit = 5;
    let followRowLimit = 5;

    let p1 = SearchService.getSearchResults(searchTerm, rowlimit, selectedProperties, sortList);
    let p2 = SearchService.getRecentSites(recentRowLimit);
    let p3 = FollowService.getFollowedSites();
    
    promises.push(p1);
    promises.push(p2);
    promises.push(p3);

    labels.push(Constants.siteLabels.team);
    labels.push(Constants.siteLabels.recent);
    labels.push(Constants.siteLabels.follow);
    
    Promise.all(promises).then((s: any[]) => {
      let items = Array<TeamSiteCollection>();
       
      s.map((item, index) => {
        let userSites = new TeamSiteCollection();
        userSites.Title = labels[index];
        userSites.Sites = item;
        items.push(userSites);
      });
      let followedSites = items.filter(x => x.Title == Constants.siteLabels.follow)[0].Sites;
      let recentSites = items.filter(x => x.Title == Constants.siteLabels.recent);
      let teamSites = items.filter(x => x.Title == Constants.siteLabels.team);
      
      items.map((item, index) => {
        if (item.Title == Constants.siteLabels.follow) {
          return;
        }

        item.Sites.map((it, index) => {
          it.IsFollowed = followedSites.filter(x => x.Path == it.Path).length > 0;
        });
      });
      console.log('sites', items);
      const newState = Object.assign({}, this.state, {
        sites: items
      });
      this.setState(newState);
    });
  }

  public render(): React.ReactElement<ISiteDirectoryProps> {
    return (
      <div  className="siteDirectory">
        <Pivot linkFormat={ PivotLinkFormat.tabs } linkSize={ PivotLinkSize.large }>
          <PivotItem linkText='All'>
            <SiteList siteColl={this.state.sites.filter((site) => site.Title == 'All')} context={this.props.context} ></SiteList>
          </PivotItem>
          <PivotItem linkText='Recent Sites'>
            <SiteList siteColl={this.state.sites.filter((site) => site.Title == 'Recent')} context={this.props.context}></SiteList>
          </PivotItem>
          <PivotItem linkText='Followed Sites'>
            <SiteList siteColl={this.state.sites.filter((site) => site.Title == 'Follow')} context={this.props.context}></SiteList>
          </PivotItem>
        </Pivot>
      </div>
    );
  }
}
