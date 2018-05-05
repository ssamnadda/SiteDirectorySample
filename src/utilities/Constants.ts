import { SearchQueryItem } from "./SearchQueryItem";

export class Constants {
    static readonly searchQueries: Array<SearchQueryItem> = [
        new SearchQueryItem('all', 'contentclass:STS_Site (WebTemplate:PROJECTSITE OR WebTemplate:STS OR WebTemplate:BLOG OR WebTemplate:COMMUNITY OR WebTemplate:GROUP OR WebTemplate:SITEPAGEPUBLISHING)'),
    ];
    static readonly followedSitesUri: string = "/_api/social.following/my/followed(types=4)";
    static readonly followSiteUri: string = "/_api/social.following/follow(ActorType=1,ContentUri=@v,Id=null)?@v=";
    static readonly siteLabels: any = {
        follow: "Follow",
        recent: "Recent",
        team: "All"
    };
    static readonly colors: string[] = [
        "#028074",
        "#3c3366",
        "#cb310f",
        "#e9eaec"
    ];
}