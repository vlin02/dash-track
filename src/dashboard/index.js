require(["jquery", "dashboard/components/Dashboard"], ($, Dashboard) => {
    (async () => {
        const dashboard = await new Dashboard()
        $("body").prepend(dashboard.get())
    })()
})
