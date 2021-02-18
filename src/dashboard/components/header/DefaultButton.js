define(() => {
    class DefaultButton {
        constructor(onDefaultChange) {
            this.onDefaultChange = onDefaultChange

            this.e = $("<a/>", {
                class: "waves-effect hide-on-small-only",
                style: "border-radius: 5px; display: flex;",
                html: "DEFAULT"
            })
        }

        get = () => this.e

        set(selected_vendor, default_vendor) {
            if (selected_vendor.id == default_vendor.id)
                this.e
                    .removeClass("btn-no-shadow not-default-btn hoverable")
                    .addClass("btn is-default-btn")
            else
                this.e
                    .removeClass("btn is-default-btn")
                    .addClass("btn-no-shadow not-default-btn hoverable")

            this.e.off("click")
            this.e.click(() => this.onDefaultChange(selected_vendor))
        }
    }

    return DefaultButton
})
