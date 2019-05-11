'use strict';
const DownloadType = require('./DownloadType');

module.exports = class TrackType extends DownloadType {

    /**
     * @inheritDoc
     */
    constructor(url, unofficialAPIClient) {
        super(url, unofficialAPIClient);

        this.parts = this.constructor.getDeezerUrlParts(url);
    }

    /**
     * @inheritDoc
     */
    request() {
        /** @var {Promise} trackInfo */
        let trackInfo = this.unofficialAPIClient.getTrackInfo(this.parts.id);

        return new Promise((resolve, reject) => {
            trackInfo.then(response => {
                this.trackInfoResponse = response.body;

                resolve();
            }).catch(reason => {
                reject(reason);
            })
        });
    }

    /**
     * @inheritDoc
     */
    static getProviderName() {
        return 'Track';
    }

    /**
     * @inheritDoc
     */
    getID() {
        return this.parts.id;
    }

    /**
     * @inheritDoc
     */
    getName() {
        return this.trackInfoResponse.results.DATA.SNG_TITLE;
    }

    /**
     * @inheritDoc
     */
    getTrackInfos() {
        return [this.trackInfoResponse.results.DATA];
    }

    /**
     * @inheritDoc
     */
    static shouldGeneratePlaylist() {
        return false;
    }

    /**
     * @inheritDoc
     */
    static supports(url) {
        let parts = this.getDeezerUrlParts(url);

        return parts.type === 'track';
    }
};