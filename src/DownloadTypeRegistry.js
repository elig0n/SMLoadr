module.exports = class DownloadTypeRegistry {

    /**
     * @param {UnofficialAPIClient} unofficialAPIClient The API Client
     */
    constructor(unofficialAPIClient) {
        this.types = [];
        this.unofficialAPIClient = unofficialAPIClient;
    }

    /**
     * Gets an DownloadType Class (not an Object)
     * @param {Class} downloadType
     */
    register(downloadType) {
        this.types.push(downloadType);
    }

    /**
     * Returns the DownloadType Class Object for the given URL
     * @param {string} url
     * @return {?DownloadType} The DownloadType or null
     */
    getDownloader(url) {
        let index = this.types.findIndex(downloadType => downloadType.supports(url));

        if (index === -1) {
            return null
        }

        let downloadType = this.types[index];

        return new Promise((resolve, reject) => {
            let downloadTypeInstance = new downloadType(url, this.unofficialAPIClient);

            downloadTypeInstance.request().then(value => {
                resolve(downloadTypeInstance);
            }).catch(reason => {
                reject(reason);
            })
        });
    }

    /**
     * Returns if the given URL is supported by any DownloadType
     * @param {string} url
     * @return {boolean}
     */
    isSupported(url) {
        return this.types.findIndex(downloadType => downloadType.supports(url)) !== -1;
    }
};