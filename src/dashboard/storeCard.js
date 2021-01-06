$(document).ready(() => {
  const card = $.parseHTML(`
    <div class="card">
    <div class="card-image waves-effect waves-block waves-light">
      <img src="https://d1ralsognjng37.cloudfront.net/a6b4b1b6-efa0-4ae0-9803-d9e42959bb29.jpeg">
    </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">Card Title<i class="material-icons right">more_vert</i></span>
      <p><a href="#">This is a link</a></p>
    </div>
  `)

  $("body").append(card)
})
