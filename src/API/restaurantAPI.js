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

    async getRestaurant({ r_id }) {
        const {restaurants} = await this.storage.get("restaurants")
        if (!(r_id in restaurants)) throw "RESTAURANT_NOT_FOUND"

        return restaurants[r_id]
    }

    async getByVendor({ v_id }) {
        const [vendor, {restaurants}] = await Promise.all([
            this.vendor.getVendor({v_id}),
            this.storage.get("restaurants")
        ])

        return vendor.restaurants.map(r_id => restaurants[r_id])
    }

    async addRestaurant({ v_id, restaurant }) {
        vendorAPI.checkSupported(v_id)

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
            [v_id]: {
                ...vendors[v_id],
                restaurants: _.concat(restaurants, restaurant.url)
            }
        }

        const updated_restaurants = {
            ...restaurants,
            [restaurant.url]: {
                ...restaurant,
                items: [],
                date_added: new Date().toJSON()
            }
        }

        this.storage.set({
            vendors: updated_vendors,
            restaurants: updated_restaurants
        })
    }

    // async deleteRestaurant({ id, })
}
