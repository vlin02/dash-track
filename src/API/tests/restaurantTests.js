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
            await errUtils.assertErrorThrown(async () => {
                await r_API.POST({
                    type: "RESTAURANT",
                    body: {
                        v_id: "doordash",
                        restaurant: {
                            name: "bob's burgers"
                        }
                    }
                })
            }, "RESTAURANT_MISSING_FIELDS")
        }
        
        TEST = "ADD_VALID_RESTAURANT"
        {
            await r_API.POST({
                type: "RESTAURANT",
                body: {
                    v_id: "doordash",
                    restaurant: new_restaurant
                }
            })

            let rsnts = await r_API.GET({
                type: "BY_VENDOR",
                body: {
                    v_id: "doordash"
                }
            })

            assert =
                rsnts.length === 1 &&
                rsnts[0].name === new_restaurant.name &&
                rsnts[0].date_added

            if (!assert) throw "restaurant not stored or stored incorrectly"
        }

        TEST = "ADD_REPEAT_RESTAURANT"
        {
            await errUtils.assertErrorThrown(
                async () =>
                    await r_API.POST({
                        type: "RESTAURANT",
                        body: {
                            v_id: "doordash",
                            restaurant: new_restaurant
                        }
                    }),
                "RESTAURANT_ALREADY_EXISTS"
            )
        }

        TEST = "FETCH_RESTAURANT_EXISTS"
        {
            const rsnt = await r_API.GET({
                type: "RESTAURANT",
                body: {
                    r_id: "doordash/bobs-burgers.com"
                }
            })

            assert = rsnt && rsnt.name === "bob's burgers"
            if (!assert) throw "improper fetch response"
        }

        TEST = "FETCH_RESTAURANT_NOT_FOUND"
        {
            await errUtils.assertErrorThrown(
                async () =>
                    await r_API.GET({
                        type: "RESTAURANT",
                        body: {
                            r_id: "fake restaurant"
                        }
                    }),
                "RESTAURANT_NOT_FOUND"
            )
        }
    } catch (e) {
        console.log(e)
        throw `${TEST}: ${e}`
    }
}
