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
        /** @var {Promise} artistInfo */
        let artistInfo = this.unofficialAPIClient.getArtistInfo(this.parts.id);
        /** @var {Promise} discography */
        let discography = this.unofficialAPIClient.getDiscography(this.parts.id);

        return new Promise((resolve, reject) => {
            artistInfo.then(response => {
                this.artistInfoResponse = response.body;

                discography.then(response => {
                    this.artistDiscographyResponse = response.body;

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
        return this.artistInfoResponse.results.ART_NAME;
    }

    /**
     * @inheritDoc
     */
    getTrackInfos() {
        let tracks = this.artistDiscographyResponse.results.data.map(album => {
            return album.SONGS.data;
        });

        tracks = [].concat(...tracks);

        return tracks;
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

        return parts.type === 'artist';
    }
};