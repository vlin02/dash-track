define(["jquery", "API/restaurantAPI", "APIerrors"], (
    $,
    restaurantAPI,
    {
        TestError,
        errUtils,
        RequiredFieldError,
        RestaurantAlreadyExistsError,
        RestaurantNotFoundError
    }
) => {
    async function restaurantTests() {
        let TEST
        const r_API = new restaurantAPI()

        const new_restaurant = {
            name: "bob's burgers",
            url: "doordash/bobs-burgers.com",
            src: "some-url.png"
        }

        try {
            $("#test-log").append("<li>Running Restaurant tests</li>")

            TEST = "ADD_RESTAURANT_MISSING_FIELDS"
            {
                await errUtils.assertErrorThrown(
                    () =>
                        r_API.POST({
                            v_id: "doordash",
                            restaurant: {
                                name: "bob's burgers"
                            }
                        }),
                    RequiredFieldError
                )
            }

            TEST = "ADD_VALID_RESTAURANT"
            {
                await r_API.POST({
                    v_id: "doordash",
                    restaurant: new_restaurant
                })

                const rsnts = await r_API.GET({
                    v_id: "doordash"
                })

                const rsnt = rsnts[new_restaurant.url]

                assert =
                    rsnt && rsnt.name === new_restaurant.name && rsnt.date_added

                if (!assert)
                    throw new TestError(
                        `Incorrect restaurant response ${JSON.stringify(rsnt)}`
                    )
            }

            TEST = "ADD_REPEAT_RESTAURANT"
            {
                await errUtils.assertErrorThrown(
                    () =>
                        r_API.POST({
                            v_id: "doordash",
                            restaurant: new_restaurant
                        }),
                    RestaurantAlreadyExistsError
                )
            }

            TEST = "FETCH_RESTAURANT_EXISTS"
            {
                const rsnt = await r_API.GET({
                    v_id: "doordash",
                    r_id: "doordash/bobs-burgers.com"
                })

                assert = rsnt && rsnt.name === "bob's burgers"
                if (!assert)
                    throw new TestError(
                        `Incorrect restaurant response ${JSON.stringify(rsnt)}`
                    )
            }

            TEST = "FETCH_UNKNOWN_RESTAURANT"
            {
                await errUtils.assertErrorThrown(
                    () =>
                        r_API.GET({
                            v_id: "doordash",
                            r_id: "fake restaurant"
                        }),
                    RestaurantNotFoundError
                )
            }

            TEST = "DELETE_UNKNOWN_RESTAURANT"
            {
                await errUtils.assertErrorThrown(
                    () =>
                        r_API.DELETE({
                            v_id: "doordash",
                            r_id: "fake restaurant"
                        }),
                    RestaurantNotFoundError
                )
            }

            TEST = "DELETE_RESTAURANT_EXISTS"
            {
                await r_API.DELETE({
                    v_id: "doordash",
                    r_id: "doordash/bobs-burgers.com"
                })

                const rsnts = await r_API.GET({
                    v_id: "doordash"
                })

                if (_.keys(rsnts).length > 0)
                    throw new TestError("Known restaurant was not deleted")
            }
        } catch (e) {
            throw { error: e, test: TEST }
        }
    }

    return restaurantTests
})
