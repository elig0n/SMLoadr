'use strict';
const DownloadType = require('./DownloadType');

module.exports = class PlaylistType extends DownloadType {

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
        /** @var {Promise} playlist */
        let playlist = this.unofficialAPIClient.getPlaylistTracks(this.parts.id);

        return new Promise((resolve, reject) => {
            playlist.then(response => {
                this.playlistResponse = response.body;

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
        return 'Playlist';
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
        return this.playlistResponse.results.DATA.TITLE;
    }

    /**
     * @inheritDoc
     */
    getTrackInfos() {
        return this.playlistResponse.results.SONGS.data;
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

        return parts.type === 'playlist';
    }
};