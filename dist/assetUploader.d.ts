import type Scrptly from './index.js';
export default class AssetUploader {
    $: Scrptly;
    path: string;
    type: string;
    constructor($: Scrptly, path: string, type: string);
    hashFile(): Promise<string>;
    uploadAsset(): Promise<{
        assetId: any;
        url: any;
    }>;
}
