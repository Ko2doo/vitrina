// Скрипт для поиска элементов в списке.

(function ($) {
  jQuery.expr[':'].Contains = function(a,i,m){
      return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
  };


  // Сам фильтр
  function filterList(header, list) {
    // записываем переменные form и input с помощью append генерим форму на страницу
    var form = $("<form>").attr({"class":"filterform","action":"#"}),
        input = $("<input>").attr({"class":"filterinput","type":"text", "placeholder":"Поиск по содержанию"});
    $(form).append(input).appendTo(header);

    // настройка для инпута
    $(input)
      .change( function () {
        var filter = $(this).val();
          if(filter) {

            $matches = $(list).find('a:Contains(' + filter + ')').parents();
            $matches.closest('.harmonica-subcontent').slideDown();
            $('li', list).not($matches).slideUp();
            $matches.slideDown();

          } else if ( $matches.closest('.harmonica-subcontent').slideDown() ){
              $matches = $(list).find('a:Contains(' + filter + ')').parents();
              $matches.closest('.harmonica-subcontent').slideUp();
              $matches.slideDown();
          } else {
            $(list).find('li').slideDown();
          }
            return false;
      })
    .keyup( function () {
        $(this).change();
    });
  }

  $(function () {
    filterList($("#form"), $("#list, #mobile__mod"));
  });
}(jQuery));
