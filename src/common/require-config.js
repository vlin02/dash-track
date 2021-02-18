requirejs.config({
    baseUrl: chrome.extension.getURL("/src"),
    paths: {
        jquery: "third-party/jquery-3.5.1.min",
        lodash: "third-party/lodash.min",
        materialize: "third-party/materialize.min",
        APIerrors: "API/APIerrors",
        hooks: "common/hooks"
    }
})