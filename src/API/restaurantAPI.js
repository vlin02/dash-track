class restaurantAPI {
    storage = new storageAPI()
    vendor = new vendorAPI()

    GET({ type, body }) {
        switch (type) {
            case "RESTAURANT":
                return this.getRestaurant(body)
            case "BY_VENDOR":
                return this.getByVendor(body)
            default:
                throw "UNKNOWN_RESTAURANT_GET_TYPE"
        }
    }

    POST({ type, body }) {
        switch (type) {
            case "RESTAURANT":
                return this.addRestaurant(body)
            default:
                throw "UNKNOWN_RESTAURANT_POST_TYPE"
        }
    }

    async getRestaurant({ id }) {
        const {restaurants} = await this.storage.get("restaurants")
        if (!(id in restaurants)) throw "RESTAURANT_NOT_FOUND"

        return restaurants[id]
    }

    async getByVendor({ id }) {
        const [vendor, {restaurants}] = await Promise.all([
            this.vendor.getVendor({id}),
            this.storage.get("restaurants")
        ])

        return vendor.restaurants.map(id => restaurants[id])
    }

    async addRestaurant({ id, restaurant }) {
        vendorAPI.checkSupported(id)

        const requiredFields = ["name", "url", "src"]
        if (!restaurant || !errUtils.keysExist(restaurant, requiredFields))
            throw "RESTAURANT_MISSING_FIELDS"

        const { vendors, restaurants } = await this.storage.get([
            "vendors",
            "restaurants"
        ])

        if (restaurant.url in restaurants) throw "RESTAURANT_ALREADY_EXISTS"

        const updated_vendors = {
            ...vendors,
            [id]: {
                ...vendors[id],
                restaurants: _.concat(restaurants, restaurant.url)
            }
        }

        const updated_restaurants = {
            ...restaurants,
            [restaurant.url]: {
                ...restaurant,
                items: [],
                vendor: id,
                date_added: new Date().toJSON()
            }
        }

        this.storage.set({
            vendors: updated_vendors,
            restaurants: updated_restaurants
        })
    }
}
