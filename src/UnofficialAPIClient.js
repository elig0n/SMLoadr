const got = require('got');
const {CookieJar} = require('tough-cookie');
const map = new Map();

const defaultAPIParameters = {
    api_version: '1.0',
    api_token:   '',
    input:       3
};

const unofficialApiUrl = 'https://www.deezer.com/ajax/gw-light.php';

module.exports = class RequestFactory {

    /**
     * @param {RequestFactory} requestFactory
     */
    constructor(requestFactory) {
        this.baseParameters = defaultAPIParameters;
        this.requestFactory = requestFactory;

        // this.cacheManagerCache = cacheManager.caching({
        //     store: 'memory',
        //     max:   1000
        // });
    }

    /**
     * Get a cid for a unofficial api request.
     *
     * @return {Number}
     */
    static getApiCid() {
        return Math.floor(1e9 * Math.random());
    }

    setCookie(name, value) {
        this.requestFactory.setCookie(name, value, unofficialApiUrl);
    }

    setParameter(name, value) {
        this.baseParameters[name] = value;
    }

    getQueryParameters(parameters) {
        return Object.assign(this.baseParameters, parameters)
    }

    getTrackInfo(songID) {
        return this.requestFactory.post(unofficialApiUrl, this.getQueryParameters({
            method: 'deezer.pageTrack',
            cid:    RequestFactory.getApiCid()
        }), {
            sng_id: songID
        }, true, true, true);
    }

    getTrackInfos(...songIDs) {
        return this.requestFactory.post(unofficialApiUrl, this.getQueryParameters({
            method: 'song.getListAllData',
            cid:    RequestFactory.getApiCid()
        }), {
            SNG_IDS: songIDs.map(value => [value, 0])
        }, true, true, true);
    }

    getUserData() {
        return this.requestFactory.get(unofficialApiUrl, this.getQueryParameters({
            method: 'deezer.getUserData',
            cid:    RequestFactory.getApiCid()
        }), true, false, true);
    }

    getPlaylistTracks(playlistID) {
        return this.requestFactory.post(unofficialApiUrl, this.getQueryParameters({
            method: 'deezer.pagePlaylist',
            cid:    RequestFactory.getApiCid()
        }), {
            playlist_id: playlistID,
            lang:        'en',
            nb:          -1,
            start:       0,
            tab:         0,
            tags:        true,
            header:      true
        }, true, true, true);
    }

    getArtistTracks(artistID) {
        return this.requestFactory.post(unofficialApiUrl, this.getQueryParameters({
            method: 'artist.getData',
            cid:    RequestFactory.getApiCid()
        }), {
            art_id:         artistID,
            filter_role_id: [0],
            lang:           'us',
            tab:            0,
            nb:             -1,
            start:          0
        }, true, true, true);
    }

    getDiscography(artistID) {
        return this.requestFactory.post(unofficialApiUrl, this.getQueryParameters({
            method: 'album.getDiscography',
            cid:    RequestFactory.getApiCid()
        }), {
            art_id:         artistID,
            filter_role_id: [0],
            lang:           'us',
            nb:             500,
            nb_songs:       -1,
            start:          0
        }, true, true, true);
    }

    getProfileTracks(profileID) {
        return this.requestFactory.post(unofficialApiUrl, this.getQueryParameters({
            method: 'deezer.pageProfile',
            cid:    RequestFactory.getApiCid()
        }), {
            user_id: profileID,
            tab:     'loved',
            nb:      -1
        }, true, true, true);
    }

    getAlbumTracks(albumID) {
        return this.requestFactory.post(unofficialApiUrl, this.getQueryParameters({
            method: 'deezer.pageAlbum',
            cid:    RequestFactory.getApiCid()
        }), {
            alb_id: albumID,
            lang:   'us',
            tab:    0
        }, true, true, true);
    }

    getAlbumTrackInfo(albumID) {
        return this.requestFactory.post(unofficialApiUrl, this.getQueryParameters({
            method: 'song.getListByAlbum',
            cid:    RequestFactory.getApiCid()
        }), {
            alb_id: albumID,
            start:  '0',
            nb:     '500'
        }, true, true, true);
    }

    searchAlternative(trackInfos) {
        return this.requestFactory.post(unofficialApiUrl, this.getQueryParameters({
            method: 'search.music',
            cid:    RequestFactory.getApiCid()
        }), {
            QUERY:  'artist:\'' + trackInfos.ART_NAME + '\' track:\'' + trackInfos.SNG_TITLE + '\'',
            OUTPUT: 'TRACK',
            NB:     50,
            FILTER: 0
        }, true, true, true);
    }

    getLyrics(songID) {
        return this.requestFactory.post(unofficialApiUrl, this.getQueryParameters({
            method: 'song.getLyrics',
            cid:    RequestFactory.getApiCid()
        }), {
            sng_id: songID
        }, true, true, true);
    }
};

