define(["lodash", "APIerrors"], (_, { StorageAccessError }) => {
    
    class storageAPI {
        default_vendors = {
            doordash: {
                id: "doordash",
                title: "DoorDash",
                color: "#EC4528",
                link: "https://doordash.com/",
                restaurants: {}
            },
            ubereats: {
                id: "ubereats",
                title: "UberEats",
                color: "#529F08",
                link: "https://ubereats.com/",
                restaurants: {}
            },
            grubhub: {
                id: "grubhub",
                title: "GrubHub",
                color: "#F74A55",
                link: "https://grubhub.com/",
                restaurants: {}
            }
        }

        constructor() {
            this.defaults = {
                settings: {
                    default_vendor: _.keys(this.default_vendors)[0]
                },
                vendors: this.default_vendors,
                version: "1.0"
            }
        }

        checkSupported(s_id) {
            if (!(s_id in this.defaults)) throw new StorageAccessError(s_id)
        }

        #get(s_id) {
            return new Promise((resolve) =>
                chrome.storage.sync.get(s_id, (res) => resolve(res[s_id]))
            )
        }

        #set(obj) {
            return new Promise((resolve) =>
                chrome.storage.sync.set(obj, resolve)
            )
        }

        async checkFirstAccess() {
            const version = await this.#get("version")
            if (version !== "1.0") await this.#set(this.defaults)
        }

        async get(s_id) {
            this.checkSupported(s_id)
            await this.checkFirstAccess()

            return this.#get(s_id)
        }

        async set(s_id, value) {
            this.checkSupported(s_id)
            await this.checkFirstAccess()

            return this.#set({ [s_id]: value })
        }
    }

    return storageAPI
})
