import * as React from 'react';


import styles from './SiteDirectory.module.scss'
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { FollowService } from '../../../services/FollowService';

export interface ISiteFollowState {
    isFollowed: boolean;
}
export interface ISiteFollow {
    isFollowed: boolean;
    pageUrl: string;
    context: any;
  }
  

export class SiteFollow extends React.Component<ISiteFollow, ISiteFollowState> {
    constructor(props) {
        super(props);
        this.state = {
            isFollowed: props.isFollowed
        }
        this.follow = this.follow.bind(this);
        this.unFollow = this.unFollow.bind(this);
    }
    private _getUnfollowComponent():JSX.Element {
        return (
            <a onClick={this.unFollow} data-url={this.props.pageUrl}>
                <Icon iconName='FavoriteStarFill' />
            </a>
        );
    }
    private _getFollowComponent():JSX.Element {
        return (
            <a onClick={this.follow} data-url={this.props.pageUrl}>
                <Icon iconName='FavoriteStar' />
            </a>
        );
    }
    unFollow(event: any): void {
        var url = event.currentTarget.dataset.url;
        FollowService.unFollowSite(url, this.props.context);
        const newState = Object.assign({}, this.state, {
            isFollowed: false
        });
        this.setState(newState);
    }
    follow(event: any): void {
        var url = event.currentTarget.dataset.url;
        FollowService.followSite(url, this.props.context);
        const newState = Object.assign({}, this.state, {
            isFollowed: true
        });
        this.setState(newState);
    }
    public render(): React.ReactElement<ISiteFollow>   {
        if (this.state.isFollowed == null ) {
            return (<span></span>);
        }
        if (this.state.isFollowed) {
            return this._getUnfollowComponent();
        } 

        return this._getFollowComponent();
    }  
}