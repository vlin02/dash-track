class storageAPI {
    static default_vendors = {
        doordash: {
            id: "doordash",
            title: "DoorDash",
            color: "#EC4528",
            link: "https://doordash.com/",
            restaurants: []
        },
        ubereats: {
            id: "ubereats",
            title: "UberEats",
            color: "#529F08",
            link: "https://ubereats.com/",
            restaurants: []
        },
        grubhub: {
            id: "grubhub",
            title: "GrubHub",
            color: "#F74A55",
            link: "https://grubhub.com/",
            restaurants: []
        }
    }

    static defaults = {
        settings: {
            default_vendor: _.keys(storageAPI.default_vendors)[0]
        },
        vendors: storageAPI.default_vendors,
        restaurants: [],
        items: [],
        version: "1.0"
    }

    static checkSupported(key) {
        if (!(key in storageAPI.defaults)) throw "UNKNOWN_STORAGE_KEY"
    }

    #get(keys) {
        return new Promise((resolve) => chrome.storage.sync.get(keys, resolve))
    }

    #set(obj) {
        return new Promise((resolve) => chrome.storage.sync.set(obj, resolve))
    }

    async get(keys) {
        if (!Array.isArray(keys)) keys = [keys]

        for (const key of keys) storageAPI.checkSupported(key)

        const { version } = await this.#get("version")
        if (version !== "1.0") await this.#set(storageAPI.defaults)

        // const defaulted = _.pick(
        //     storageAPI.defaults,
        //     keys.filter((key) => !(key in res))
        // )

        // if (defaulted.length)
        //     await this.set(defaulted)

        return this.#get(keys)
    }

    async set(obj) {
        const keys = _.keys(obj)
        for (const key of keys) storageAPI.checkSupported(key)

        const { version } = await this.#get("version")
        if (version !== "1.0") await this.#set(storageAPI.defaults)

        return this.#set(obj)
    }
}
