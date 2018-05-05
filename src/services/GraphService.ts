import { MSGraphClient } from '@microsoft/sp-client-preview';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

export class GraphService {
    private _context: any;
    constructor(context: any) {
        this._context = context;
    }
    public getGroups(): Promise<string> {
        const client: MSGraphClient = this._context.serviceScope.consume(MSGraphClient.serviceKey);
        return new Promise((resolve, reject) => {
            client
            .api('/groups')
            .get((error, response: MicrosoftGraph.Group, rawResponse: any) => {            
                resolve(rawResponse);
            });
        });
    }
    public getMe(): Promise<string> {
        const client: MSGraphClient = this._context.serviceScope.consume(MSGraphClient.serviceKey);
        return new Promise((resolve, reject) => {
            client
            .api('/me')
            .get((error, response: any, rawResponse: any) => {            
                resolve(rawResponse);
            });
        });
    }
}