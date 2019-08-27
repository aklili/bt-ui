require.config({
  shim: {
    'easyui': ['jquery'],
    'layer': ['jquery'],
    'zhCN': ['easyui'],
  },
  paths: {
    'jquery': 'bt-ui/js/lib/jquery/jquery-1.8.3',
    'easyui': 'bt-ui/js/lib/easyui/jquery.easyui.min',
    'zhCN': 'bt-ui/js/lib/easyui/locale/easyui-lang-zh_CN',
    'layer': 'bt-ui/js/lib/layer/layer',
    'jquery.validate': 'bt-ui/js/lib/jquery.validate/jquery.validate',
    'messages_zh': 'bt-ui/js/lib/jquery.validate/localization/messages_zh',
    'jquery.cookie': 'bt-ui/js/lib/jquery.cookie/jquery.cookie',
    //自定义模块
    'NzApp': '/bt-ui/js/modules/NzApp',
    'NzSider': '/bt-ui/js/modules/NzSider',
    'NzHttp': '/bt-ui/js/modules/NzHttp',
    'NzTabs': '/bt-ui/js/modules/NzTabs',
    'NzTools': '/bt-ui/js/modules/NzTools',
    'NzForm': '/bt-ui/js/modules/NzForm',
    'NzModal': '/bt-ui/js/modules/NzModal'
  }
});

require(['jquery', 'easyui', 'zhCN', 'jquery.validate','jquery.cookie', 'NzApp'], function ($) {

  //设置cookie 可以保存json
  $.cookie.json = true;
 
  $.validator.setDefaults({
    ignore: [],
    errorClass: 'nzui-form-item-erro-tip',
    highlight: function (element) {

      if ($(element).attr('type') === 'radio' || $(element).attr('type') === 'checkbox') {
        return;
      }
      $(element).parent("span").addClass("nzui-invalid");
    },
    success: function (label) {
      $(label).prev().removeClass('nzui-invalid');
    },
    errorPlacement: function (error, element) {
      var form = $(element).closest('form')[0];
      if ($(element).attr('type') === 'radio' || $(element).attr('type') === 'checkbox') {
        var parentW = $(element).closest(".nzui-control-input")
        parentW.append(error);
        parentW.on('click', function () {
          //校验
          $(form).valid();
        })
      } else {
        $(element).parent().parent().append(error);
        var input = $(element).prev();
        input.on('blur', function (val) {
          //失去焦点时触发校验
          $(form).valid();
        })
      }
    }
  });

  //需要手动去渲染easyui 
  var _9203 = setInterval(parse, 10);
  //手动渲染easyui
  function parse() {
    if ($.parser && $.fn.slider && !window.renderedFlag) {
      clearInterval(_9203);
      $.parser.parse();
      window.renderedFlag = true;
    }
  }
  
  //判断是否支持JSON对象
  if (!window.JSON) {
    window.JSON = {
      parse: function (jsonStr) {
        return eval('(' + jsonStr + ')');
      },
      stringify: function (jsonObj) {
        var result = '',
          curVal;
        if (jsonObj === null) {
          return String(jsonObj);
        }
        switch (typeof jsonObj) {
          case 'number':
          case 'boolean':
            return String(jsonObj);
          case 'string':
            return '"' + jsonObj + '"';
          case 'undefined':
          case 'function':
            return undefined;
        }

        switch (Object.prototype.toString.call(jsonObj)) {
          case '[object Array]':
            result += '[';
            for (var i = 0, len = jsonObj.length; i < len; i++) {
              curVal = JSON.stringify(jsonObj[i]);
              result += (curVal === undefined ? null : curVal) + ",";
            }
            if (result !== '[') {
              result = result.slice(0, -1);
            }
            result += ']';
            return result;
          case '[object Date]':
            return '"' + (jsonObj.toJSON ? jsonObj.toJSON() : jsonObj.toString()) + '"';
          case '[object RegExp]':
            return "{}";
          case '[object Object]':
            result += '{';
            for (i in jsonObj) {
              if (jsonObj.hasOwnProperty(i)) {
                curVal = JSON.stringify(jsonObj[i]);
                if (curVal !== undefined) {
                  result += '"' + i + '":' + curVal + ',';
                }
              }
            }
            if (result !== '{') {
              result = result.slice(0, -1);
            }
            result += '}';
            return result;
          case '[object String]':
            return '"' + jsonObj.toString() + '"';
          case '[object Number]':
          case '[object Boolean]':
            return jsonObj.toString();
        }
      }
    };
  }
});


