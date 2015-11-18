jQuery(function($){
  $("#modal-delete").on("show.bs.modal",function(event){
    var $this = $(this);
    var $button = $(event.relatedTarget);
    $this.find(".project-name").text($button.data().title);
    $this.find(".remove-button").attr("href", "/projects/"+$button.data().id+"/delete")
  }).find(".remove-button").click(function(){
    var $this = $(this);
    $.ajax({
      method:"post",
      url:$this.attr("href")
    }).always(function(){
      window.location.reload();
    });
  });
  $(".delete").click(function(e){
    var $this = $(this);
    $($this.data().target).modal("show", $this);
    return false;
  });
});