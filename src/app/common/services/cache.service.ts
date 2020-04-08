import { HttpRequest, HttpResponse } from "@angular/common/http";

// import { Cache } from "../interface/cache";
// import { CacheEntry } from "../interface/cacheEntry";
import { LoggerService } from "./logger.service";
import { ConstParams } from "../ConstParams"

export class CacheService {
// export class CacheService implements Cache {

    // cacheMap = new Map<string, CacheEntry>();

    constructor(private logger: LoggerService, private constParams: ConstParams) { }

    // get(req: HttpRequest<any>): HttpResponse<any> | null {
    //     const entry = this.cacheMap.get(req.urlWithParams);
    //     if (!entry) return null;
    //     const isExpired = Date.now() - entry.entryTime > this.constParams.MaxCacheTime;
    //     this.logger.log(`req.urlWithParams is Expired:${isExpired}`);
    //     return isExpired ? null : entry.response;
    // }

    // put(req: HttpRequest<any>, res: HttpResponse<any>): void {
    //     const entry: CacheEntry = {
    //         url: req.urlWithParams,
    //         response: res,
    //         entryTime: Date.now()
    //     };
    //     this.logger.log("Save entry.url response into cache");
    //     this.cacheMap.set(req.urlWithParams, entry);
    //     this.deleteExpiredCache();
    // }

    // private deleteExpiredCache() {
    //     this.cacheMap.forEach(entry => {
    //         if (Date.now() - entry.entryTime > this.constParams.MaxCacheTime) {
    //             this.cacheMap.delete(entry.url);
    //         }
    //     });
    // }
}
