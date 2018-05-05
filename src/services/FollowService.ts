import { Constants } from "../utilities/Constants";
import pnp from "sp-pnp-js";
import { _Site } from "../utilities/TeamSiteCollection";
import * as $ from "jquery";
import { IDigestCache, DigestCache } from "@microsoft/sp-http";

export class FollowService {
    static getFollowedSites(): Promise<any> {
        return this.getFollowedSitesForCurrentUser();
    }
    protected static getFollowedSitesForCurrentUser(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var url = Constants.followedSitesUri;
            var request = new Request(url, {
                method: 'GET',
                headers: { "Accept": "application/json; odata=verbose" },
                credentials: 'same-origin'    // or credentials: 'include'  
            });
            fetch(request).then(sites => {
                sites.json().then(r => {
                    let items = new Array<_Site>();
                    r.d.Followed.results.map(f => {
                        let item: _Site = new _Site();
                        item.Title = f.Name;
                        item.Path = f.Uri;
                        item.SiteLogoUrl = f.ImageUri;
                        items.push(item);
                    });
                    console.log('followed', items);
                    resolve(items);
                });
                
            }).catch(err => {
                reject(err);
            });
        });
    }
    static followSite(siteUrl, context): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const digestCache: IDigestCache = context.serviceScope.consume(DigestCache.serviceKey);
            digestCache.fetchDigest(context.pageContext.web.serverRelativeUrl).then((siteDigest: string): void => { 
                var url = Constants.followSiteUri + "'" + siteUrl + "'";
                var request = new Request(url, {
                    method: 'POST',
                    headers: { 
                        "Accept": "application/json; odata=verbose",
                        "X-RequestDigest": siteDigest
                    },
                    credentials: 'same-origin'    // or credentials: 'include'  
                });                
                fetch(request).then(sites => {
                    sites.json().then(r => {                    
                        console.log('follow this', r);
                        resolve(r);
                    });
                    
                }).catch(err => {
                    reject(err);
                });                
            });
        });     
    }
    static unFollowSite(siteUrl, context): Promise<any> {
        return new Promise<any>((resolve, reject) => {
                const digestCache: IDigestCache = context.serviceScope.consume(DigestCache.serviceKey);
                digestCache.fetchDigest(context.pageContext.web.serverRelativeUrl).then((siteDigest: string): void => { 
                    var url = Constants.followSiteUri + "'" + siteUrl + "'";
                    var request = new Request(url, {
                        method: 'POST',
                        headers: { 
                            "Accept": "application/json; odata=verbose",
                            "X-RequestDigest": siteDigest
                        },
                        credentials: 'same-origin'    // or credentials: 'include'  
                    });
                    fetch(request).then(sites => {
                        sites.json().then(r => {                    
                            console.log('follow this', r);
                            resolve(r);
                        });                    
                    }).catch(err => {
                        reject(err);
                    });
            });
        });        
    }
    protected static getFollowedSitesPageForCurrentUser(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            var pageUrl = pnp.sp.social.getFollowedSitesUri().then(uri => {
                resolve(pageUrl);
            });            
        });
    }
}