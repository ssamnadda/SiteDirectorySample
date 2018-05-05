import pnp, {
  SearchQuery,
  SearchResults,
  Sort,
  SortDirection
} from 'sp-pnp-js';
import { _Site } from '../utilities/TeamSiteCollection';

export class SearchService {
  static getSearchResults(searchQueryText: string, rowLimit: number, selecteProperties: string[], sortList: Sort[]) {
    return this._search(searchQueryText, rowLimit, selecteProperties, sortList);
  }
  static getRecentSites(rowLimit) {
      return this._getRecentSites(rowLimit);
  }
  protected static _search(
    searchQueryText: string,
    rowLimit: number,
    selectedProperties: string[],
    sortList: Sort[]): Promise <Array<_Site>> {

    let searchQuery = {
      Querytext: searchQueryText,
      RowLimit: rowLimit,
      SelectProperties: selectedProperties,
      SortList: sortList
    } as SearchQuery;

    return new Promise<Array<_Site>>((resolve, reject) => {
        this._searchSharePoint(searchQuery).then(r => {
            let results = [];
            debugger;
            r.PrimarySearchResults.map(item => {
                let s = new _Site();
                s.Title = item.Title;
                s.Owner = item.Author;
                s.Path = item.Path;
                s.SiteLogoUrl = item.SiteLogo;  
                s.Description = item.Description;              

                results.push(s);
            });

            resolve(results);
        });
    });
  }
  protected static _searchSharePoint(searchQuery: SearchQuery): Promise < SearchResults > {
    return pnp.sp.search(searchQuery);
  }  
  protected static _getRecentSites(rowLimit): Promise<any> {
    var url = "/_api/search/query?querytext=%27*%27&rowlimit=" + rowLimit + "'&querytemplate='modifiedby:{User}'&selectproperties='sitetitle,spsiteurl,author,description'&sortlist='lastmodifiedtime:descending'&collapsespecification='spsiteurl'";
    var request = new Request(url, {
        method: 'GET',
        headers: { "Accept": "application/json; odata=verbose" },
        credentials: 'same-origin'    // or credentials: 'include'  
    });
    return new Promise<any>((resolve, reject) => {
        fetch(request).then(response => {
            let items = new Array<_Site>();
            response.json().then(data => {
                data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results.map(i => {
                    let item: _Site = new _Site();
                    item.Title = i.Cells.results.filter(r => r.Key == "sitetitle")[0].Value;
                    item.Path = i.Cells.results.filter(r => r.Key == "spsiteurl")[0].Value;
                    item.Owner = i.Cells.results.filter(r => r.Key == "author")[0].Value;
                    item.Description = i.Cells.results.filter(r => r.Key == "description")[0].Value;
                    items.push(item);
                });
                console.log('recent sites', items);
                resolve(items);
            });
        });
    });
  }
}

