import fs from 'fs';
import crypto from 'crypto';
export default class AssetUploader {
    constructor($, path, type) {
        this.$ = $;
        this.path = path;
        this.type = type;
    }
    async hashFile() {
        return new Promise((resolve, reject) => {
            const hash = crypto.createHash('sha256');
            const stream = fs.createReadStream(this.path);
            stream.on('error', reject);
            stream.on('data', chunk => {
                hash.update(chunk);
            });
            stream.on('end', () => {
                resolve(hash.digest('hex'));
            });
        });
    }
    async uploadAsset() {
        // Calculate hash of the file
        const { size } = await fs.promises.stat(this.path);
        const hash = await this.hashFile();
        const fileName = this.path.split('/').pop();
        const extension = fileName?.split('.').pop();
        if (!fileName || !extension)
            throw new Error('Invalid file name or extension');
        const prepare = await this.$.apiCall('prepareAsset', {
            method: 'POST',
            body: JSON.stringify({
                fileName,
                hash,
                type: this.type,
                extension,
                size
            }),
        });
        if (prepare.success) {
            if (prepare.assetId) {
                return { assetId: prepare.assetId, url: prepare.url };
            }
            else if (prepare.presignedUrl) {
                const fileStream = fs.createReadStream(this.path);
                const res = await fetch(prepare.presignedUrl, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': prepare.contentType,
                    },
                    body: fileStream,
                });
                if (res.ok) {
                    const successUpload = await this.$.apiCall('completeAssetUpload', {
                        method: 'POST',
                        body: JSON.stringify({
                            assetId: prepare.assetId,
                            result: 'success',
                        }),
                    });
                    if (successUpload.success) {
                        return { assetId: successUpload.assetId, url: successUpload.url };
                    }
                    else {
                        throw new Error(`Could not complete upload: ${successUpload.error}`);
                    }
                }
                else {
                    await this.$.apiCall('completeAssetUpload', {
                        method: 'POST',
                        body: JSON.stringify({
                            assetId: prepare.assetId,
                            result: 'error',
                        }),
                    });
                    throw new Error(`Upload failed [${res.status}}\n> ${await res.text()}`);
                }
            }
            else {
                throw new Error('Invalid response from server');
            }
        }
        else {
            throw new Error(`Error uploading asset: ${prepare.error}`);
        }
    }
}
