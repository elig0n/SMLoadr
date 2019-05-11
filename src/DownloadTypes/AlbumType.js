'use strict';
const DownloadType = require('./DownloadType');

module.exports = class AlbumType extends DownloadType {

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
        /** @var {Promise} trackInfos */
        let trackInfos = this.unofficialAPIClient.getAlbumTrackInfo(this.parts.id);
        /** @var {Promise} albumInfo */
        let albumInfo = this.unofficialAPIClient.getAlbumTracks(this.parts.id);

        return new Promise((resolve, reject) => {
            trackInfos.then(response => {
                this.trackInfoResponse = response.body;

                albumInfo.then(response => {
                    this.albumInfoResponse = response.body;

                    resolve();
                }).catch(reason => {
                    reject(reason);
                });
            }).catch(reason => {
                reject(reason);
            })
        });
    }

    /**
     * @inheritDoc
     */
    static getProviderName() {
        return 'Album';
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
        return this.albumInfoResponse.results.DATA.ALB_TITLE;
    }

    /**
     * @inheritDoc
     */
    getTrackInfos() {
        return this.trackInfoResponse.results.data;
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

        return parts.type === 'album';
    }
};