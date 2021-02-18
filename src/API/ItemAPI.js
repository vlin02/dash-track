define(["./storageAPI", "./vendorAPI", "./restaurantAPI"], () => {
    class itemAPI {
        s_API = new storageAPI()
        v_API = new vendorAPI()
        r_API = new restaurantAPI()

        GET({ type, body }) {
            switch (type) {
                case "ITEM":
                    return this.getItem(body)
                case "BY_RESTAURANT":
                    return this.getByRestaurant(body)
                default:
                    throw "UNKNOWN_RESTAURANT_GET_TYPE"
            }
        }

        async getItem({ i_id }) {
            const { items } = await this.storage.get("items")
            if (!(i_id in items)) throw "ITEM_NOT_FOUND"

            return items[i_id]
        }

        async getByRestaurant({ r_id }) {
            const [restaurant, { items }] = await Promise.all([
                this.restaurant.getRestaurant({ r_id }),
                this.storage.get("items")
            ])

            return restaurant.items.map((id) => items[id])
        }
    }
    
    return itemAPI
})
