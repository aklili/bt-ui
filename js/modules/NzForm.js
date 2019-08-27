/**
 * 提供表单的一些操作
 */
define([
  'jquery',
], function($) {
    var NzForm = {
      JSON: function (ele) {
        var o = {}, field = {};
        var arr = $(ele).serializeArray();
        $.each(arr, function () {
          if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
              o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
          } else {
            o[this.name] = this.value || '';
          }
        });
        $.each(o, function (key) {
          if (key.indexOf('.') > 0) {
            var col = key.split('.');
            var len = col.length, temp = field;
            for (var i = 0; i < len; i++) {
              if (i != len - 1) {
                // if (typeof temp[col[i]] != 'object') {
                temp[col[i]] = {};
                // }
                temp = temp[col[i]];

              } else {
                /* 最后一层进行赋值 */
                temp[col[i]] = o[key];
              }
            }

          } else {
            field[key] = o[key];
          }

        });
        return field;
      }
    }

    return NzForm;
});