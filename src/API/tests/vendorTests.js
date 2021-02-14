// Test Vendor class

async function vendorTests() {
    let TEST
    const v_API = new vendorAPI()

    try {
        $("#test-log").append("<li>Running Vendor tests</li>")

        TEST = "SUPPORTED_VENDOR_CHECK"
        {
            vendorAPI.checkSupported("doordash")
            vendorAPI.checkSupported("ubereats")
        }
        
        TEST = "UNSUPPORTED_VENDOR_CHECK"
        {
            await errUtils.assertErrorThrown(
                () => vendorAPI.checkSupported("randomvendor"),
                "UNSUPPORTED_VENDOR"
            )
        }

        TEST = "FETCH_SUPPORTED_VENDOR"
        {
            let req = {
                type: "VENDOR",
                body: {
                    v_id: "doordash"
                }
            }

            let res = await v_API.GET(req)

            if (!(res && res.title === "DoorDash"))
                throw "incorrect vendor details"
        }

        TEST = "FETCH_UNSUPPORTED_VENDOR"
        {
            await errUtils.assertErrorThrown(async () => {
                let req = {
                    type: "VENDOR",
                    body: {
                        v_id: "randomvendor"
                    }
                }

                await v_API.GET(req)
            }, "UNSUPPORTED_VENDOR")
        }

        TEST = "UNKNOWN_GET_TYPE"
        {
            await errUtils.assertErrorThrown(async () => {
                let req = {
                    type: "???",
                    body: {
                        v_id: "doordash"
                    }
                }

                await v_API.GET(req)
            }, "UNKNOWN_VENDOR_GET_TYPE")
        }
    } catch (e) {
        throw `${TEST}: ${e}`
    }
}
