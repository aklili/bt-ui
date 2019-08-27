define([
  'jquery',
], function ($) {
  $(".nzui-header-user").hover(function (e) {
    $('#nzui-user-menu').menu('show', {
      top: 68,
      left: e.pageX,
      onClick: function (item) {
        switch (item.name) {
          case 'info':

            break;
          case 'out':
            location.reload()
            break;
          default:

            break;
        }
      }
    });
  }, function () {

  });

  // $('#nzui-user-menu').menu('onClick', function (item) {
  //   console.log(item)
  // })

});