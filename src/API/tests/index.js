require([
    "jquery",
    "API/tests/storageTests",
    "API/tests/vendorTests",
    "API/tests/restaurantTests",
    "APIerrors"
], (
    $,
    storageTests,
    vendorTests,
    restaurantTests,
    { DashTrackError, TestError }
) => {
    const isolateExecution = (test) =>
        new Promise((resolve) =>
            chrome.storage.sync.clear(() => resolve(test()))
        )

    const formatErrorStack = (stack) => {
        return stack
            .replaceAll(
                "chrome-extension://phbenecacggpjenppnjmpjogkpbikbpd",
                ""
            )
            .replaceAll("at", "</br>&emsp;at")
    }

    const executeTests = async (...tests) => {
        $("body").append("<ul id='test-log'></ul>")

        try {
            for (const test of tests) await isolateExecution(test)
            $("body").append("<h1 style='color: #5cb85c'>Passed all tests</h1>")
        } catch (err) {
            const { error, test } = err
            console.log(error)

            let err_msg = `(${test})`
            if (
                !(error instanceof TestError || error instanceof DashTrackError)
            ) {
                err_msg += " Error unrelated to testing thrown"
            }

            $("body").append(`<h1 style='color: #d9534f'>${err_msg}</h1>`)
            $("body").append(
                `<h2 style='color: #5bc0de'>${formatErrorStack(
                    error.stack
                )}</h1>`
            )
        }
    }

    executeTests(storageTests, vendorTests, restaurantTests)
})
