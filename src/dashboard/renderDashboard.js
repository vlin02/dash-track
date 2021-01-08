const vendor = new Vendor("doordash")
vendor.defaultFetch().then(({rsnts}) => {
    $('body').prepend(renderGridView(Object.values(rsnts)))
})