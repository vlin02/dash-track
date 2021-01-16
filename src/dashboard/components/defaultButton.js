class defaultButton {
  constructor(isDefault) {
    this.e = $("<a/>", {
      class: "waves-effect",
      style: "border-radius: 5px; display: flex;",
      html: "DEFAULT"
    })

    isDefault ? this.setDefault(this.e) : this.setNotDefault(this.e)
  }

  get() {
    return this.e
  }

  setDefault = () => {
    this.e
      .removeClass("btn-no-shadow not-default-btn hoverable")
      .addClass("btn is-default-btn")
  }

  setNotDefault = () => {
    this.e
      .removeClass("btn is-default-btn")
      .addClass("btn-no-shadow not-default-btn hoverable")
  }
}
