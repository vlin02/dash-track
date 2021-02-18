define(["lodash", "./vendorAPI", "APIerrors"], (
    _,
    vendorAPI,
    {
        RequiredFieldError,
        RestaurantNotFoundError,
        RestaurantAlreadyExistsError
    }
) => {
    class restaurantAPI {
        vendor = new vendorAPI()

        async GET({ v_id, r_id }) {
            if (!v_id) throw new RequiredFieldError("v_id")

            const { restaurants } = await this.vendor.GET({ v_id })

            if (r_id) {
                if (!(r_id in restaurants))
                    throw new RestaurantNotFoundError(v_id, r_id)

                return restaurants[r_id]
            }

            return restaurants
        }

        async POST({ v_id, restaurant }) {
            const requiredFields = ["name", "url", "src"]
            if (!restaurant) throw new RequiredFieldError("restaurant")

            for (const field of requiredFields)
                if (!(field in restaurant)) throw new RequiredFieldError(field)

            const { restaurants } = await this.vendor.GET({ v_id })

            if (restaurant.url in restaurants)
                throw new RestaurantAlreadyExistsError(restaurant.url)

            await this.vendor.PATCH({
                v_id: v_id,
                restaurants: {
                    ...restaurants,
                    [restaurant.url]: {
                        ...restaurant,
                        items: [],
                        date_added: new Date().toJSON()
                    }
                }
            })
        }

        async DELETE({ v_id, r_id }) {
            const { restaurants } = await this.vendor.GET({ v_id })

            if (!(r_id in restaurants))
                throw new RestaurantNotFoundError(v_id, r_id)

            await this.vendor.PATCH({
                v_id: v_id,
                restaurants: _.omit(restaurants, r_id)
            })
        }
    }

    return restaurantAPI
})
