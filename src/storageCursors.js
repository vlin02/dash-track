
class Settings {}

class Restaurant {
    POST({ type, body }) {
        switch (type) {
            case "RESTAURANT":
                return setRestaurant(body)
            default:
                throw "UNKNOWN_POST_TYPE"
        }
    }
}

class Item {}

class dtAPI {
    endpointsMapped = {
        settings: new Settings(),
        vendor: new Vendor(),
        restaurant: new Restaurant(),
        item: new Item()
    }

    prepareStorage() {
        const vendors = new Vendor().default_vendors
        const defaults = {
            settings: {
                default_vendor: Object.keys(vendors)[0]
            },
            vendors,
            restaurants: [],
            items: []
        }

        console.log(defaults)

        return new Promise((resolve) =>
            chrome.storage.sync.get(defaults, resolve)
        )
    }

    async get(endpoint, data) {
        await this.prepareStorage()
        const endpointClass = this.endpointsMapped[endpoint]

        return endpointClass.GET(data)
    }

    async post(endpoint, data) {
        await this.prepareStorage()
        const endpointClass = this.endpointsMapped[endpoint]

        return endpointClass.POST(data)
    }

    async delete(endpoint, data) {
        await this.prepareStorage()
        const endpointClass = this.endpointsMapped[endpoint]

        return endpointClass.DELETE(data)
    }

    async patch(endpoint, data) {
        await this.prepareStorage()
        const endpointClass = this.endpointsMapped[endpoint]

        return endpointClass.PATCH(data)
    }
}
