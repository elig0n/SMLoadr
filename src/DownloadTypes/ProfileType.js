'use strict';
const DownloadType = require('./DownloadType');

module.exports = class ProfileType extends DownloadType {

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
        /** @var {Promise} profile */
        let profile = this.unofficialAPIClient.getProfile(this.parts.id);

        return new Promise((resolve, reject) => {
            profile.then(response => {
                this.profileResponse = response.body;

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
        return 'Profile';
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
        return this.profileResponse.results.DATA.USER.BLOG_NAME;
    }

    /**
     * @inheritDoc
     */
    getTrackInfos() {
        return this.profileResponse.results.TAB.loved.data;
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

        return parts.type === 'profile';
    }
};