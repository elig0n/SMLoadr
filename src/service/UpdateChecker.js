module.exports = class ConfigService {

    /**
     * @param {RequestFactory} requestFactory
     * @param {string} currentVersion
     */
    constructor(requestFactory, currentVersion) {
        this.requestFactory = requestFactory;
        this.currentVersion = currentVersion;
    }

    checkPastebin() {
        return new Promise((resolve, reject) => {
            this.requestFactory.get('https://pastebin.com/raw/1FE65caB').then((response) => {
                if (response.body !== this.currentVersion) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }).catch(() => {
                reject('Could not check for update!');
            })
        });
    }

    checkGit() {
        return new Promise((resolve, reject) => {
            this.requestFactory.get('https://git.fuwafuwa.moe/SMLoadrDev/SMLoadr/raw/branch/master/VERSION.md?' + Date.now()).then((response) => {
                if (response.body !== this.currentVersion) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }).catch((err) => {
                console.log(err);
                reject('Could not check for update!');
            })
        });
    }

    /**
     * Check if a new update of the app is available.
     *
     *
     * @returns {Boolean}
     */
    checkUpdate() {
        return this.checkGit()
    }
};

