const isolateExecution = (test) =>
    new Promise((resolve) => chrome.storage.sync.clear(() => resolve(test())))

const executeTests = async (...tests) => {
    $("body").append("<ul id='test-log'></ul>")

    try {
        for (const test of tests) await isolateExecution(test)
        $("body").append("<h1 style='color: #5cb85c'>Passed all tests</h1>")
    } catch (err) {
        $("body").append(`<h1 style='color: #d9534f'>${err}</h1>`)
    }
}

executeTests(storageTests, vendorTests, restaurantTests)