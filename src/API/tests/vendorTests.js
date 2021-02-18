// Test Vendor class

define(["jquery", "API/vendorAPI", "APIerrors"], (
    $,
    vendorAPI,
    { TestError, errUtils, UnsupportedVendorError, IllegalFieldError }
) => {
    async function vendorTests() {
        let TEST
        const v_API = new vendorAPI()

        try {
            $("#test-log").append("<li>Running Vendor tests</li>")

            TEST = "SUPPORTED_VENDOR_CHECK"
            {
                v_API.checkSupported("doordash")
                v_API.checkSupported("ubereats")
            }

            TEST = "UNSUPPORTED_VENDOR_CHECK"
            {
                await errUtils.assertErrorThrown(
                    () => v_API.checkSupported("randomvendor"),
                    UnsupportedVendorError
                )
            }

            TEST = "FETCH_SUPPORTED_VENDOR"
            {
                const res = await v_API.GET({
                    v_id: "doordash"
                })

                if (!(res && res.title === "DoorDash"))
                    throw new TestError("incorrect vendor details")
            }

            TEST = "FETCH_UNSUPPORTED_VENDOR"
            {
                await errUtils.assertErrorThrown(
                    () =>
                        v_API.GET({
                            v_id: "randomvendor"
                        }),
                    UnsupportedVendorError
                )
            }

            TEST = "PATCH_VENDOR_INVALID_FIELD"
            {
                await errUtils.assertErrorThrown(
                    () =>
                        v_API.PATCH({
                            v_id: "doordash",
                            title: "not DoorDash"
                        }),
                    IllegalFieldError
                )
            }

            TEST = "PATCH_VENDOR_RESTAURANTS_FIELD"
            {
                await v_API.PATCH({
                    v_id: "doordash",
                    restaurants: "should be an object"
                })

                const { restaurants } = await v_API.GET({
                    v_id: "doordash"
                })

                if (!(restaurants === "should be an object"))
                    throw new TestError("vendor patch incorrectly set field")
            }
        } catch (e) {
            throw { error: e, test: TEST }
        }
    }

    return vendorTests
})
