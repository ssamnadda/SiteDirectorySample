export class _Site {
    Title: string;
    Id: string;
    Path: string;
    Owner: string;
    SiteLogoUrl: string;
    Description: string;
    IsFollowed: boolean;
}

export class TeamSiteCollection {
    Title: string;
    Sites: Array<_Site>;

    constructor(title: string = '', sites: Array<_Site> = []) {
        this.Title = title;
        this.Sites = sites;
      }
}