import { ISearchQueryItem } from "./ISearchQueryItem";

export class SearchQueryItem implements ISearchQueryItem {
    name: string;
    searchQuery: string;
    constructor(n: string, sQ: string) {
        this.name = n;
        this.searchQuery = sQ;
    }
}