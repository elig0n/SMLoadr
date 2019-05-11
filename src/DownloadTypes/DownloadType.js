'use strict';
module.exports = class DownloadType {

    /**
     * @param {UnofficialAPIClient} unofficialAPIClient The API Client
     * @param {string} url
     */
    constructor(url, unofficialAPIClient) {
        this.url = url;
        this.unofficialAPIClient = unofficialAPIClient;
    }

    /**
     * Gets called to request the needed Data for this DownloadType. Returns a Promise
     * @return {Promise}
     */
    request() {
        throw 'Not implemented';
    }

    /**
     * Get the url type (album/artist/playlist/profile/track) and the id from the deezer url.
     *
     * @param {String} url
     *
     * @return {Object}
     */
    static getDeezerUrlParts(url) {
        const urlParts = url.split(/\/(\w+)\/(\d+)/);

        return {
            type: urlParts[1],
            id:   urlParts[2]
        };
    }

    /**
     * @return {string} The name of this Type
     */
    static getProviderName() {
        throw 'Not implemented';
    }

    /**
     * @return {string} The ID of the Downloading type
     */
    getID() {
        throw 'Not implemented';
    }

    /**
     * @return {Promise} The Name of the requested Type (like the Album Title)
     */
    getName() {
        throw 'Not implemented';
    }

    /**
     * @return {Object[]} One or multiple TrackInfos in an Array
     */
    getTrackInfos() {
        throw 'Not implemented';
    }

    /**
     * @return {boolean} Should there be a Playlist file generated for this DownloadType
     */
    static shouldGeneratePlaylist() {
        throw 'Not implemented';
    }

    /**
     * Gets an URL and returns true when this Type supports handling it.
     * @param {string} url
     * @return {boolean} If this Type supports handling the given URL
     */
    static supports(url) {
        throw 'Not implemented';
    }

};