define(() => {
    class Logo {
        constructor() {
            this.e = $("<div/>", {
                class: "row center-align",
                style: "margin-bottom: 0px",
                html:
                    "<img src='../../images/dash-track-logo.svg' style='height:40px'/>"
            })
        }

        get = () => this.e
    }

    return Logo
})
