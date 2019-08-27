/**
 * 模态对话框
 */
define([
  'jquery',
  'layer',
  'NzHttp',
], function ($, layer, NzHttp) {

  var NzModal = {
    /**
     * 显示
     * @param {*} options 配置属性
     */
    show: function (options) {

      var footerButton = [];
      if (!$.isEmptyObject(options.buttons)) {
        var buttons = options.buttons;
        var buttonHtml = [];
        $.each(buttons, function (items, index) {
          var buttonClass = buttons[items].btnClass || 'primary';
          var buttonContent = !$.isEmptyObject(buttons[items].iconClass) ? '<i class="' + buttons[items].iconClass + '"></i>' + '<span>' + items + '</span>' : items;
          buttonHtml.push(
            '<button  class="nzui-btn nzui-btn-' + buttonClass + '">' + buttonContent + '</button>'
          );
        })
        footerButton.push(buttonHtml.join(''));
      } else {
        //如果没有配置按钮 则添加默认按钮
        var defaultButtonText = {
          cancelText: options.cancelText || '取消',
          confirmText: options.confirmText || '确定'
        }
        var defaultButton = [
          '<button  class="nzui-btn nzui-btn-text nzui-modal-cancel">' + defaultButtonText.cancelText + '</button>',
          '<button class="nzui-btn nzui-btn-primary nzui-modal-confirm">' + defaultButtonText.confirmText + '</button>',
        ];
        footerButton.push(defaultButton.join(''));
      }

      var that = this;
      var modalContent = '';
      options.type = options.type || 1;

      //内容
      if (options.type === 1) {
        modalContent = options.content || '你没有提供模态框内容，我只能简单的显示了～～～'
      } else {
        NzHttp.get(options.url, {} ,{ dataType: 'html', async: false}).then(function (res) {
          modalContent = res;
        });
      }
      //标题
      options.title = options.title || '消息提示';

      var modalContentClass = '';
      var modalFooterClass = '';
      //宽度处理
      if ($.isEmptyObject(options.area)) {
        options.area = ['520px']
      } else {
        modalContentClass = 'nzui-modal-content-p';
        modalFooterClass = 'nzui-modal-footer-p'
      }
      var html = [
        '<div class="nzui-modal-header">',
        '<div class="nzui-modal-title">' + options.title + '</div>',
        '<div class="nzui-modal-close"><i class="fa fa-close"></i></div>',
        '</div>',
        '<div class="nzui-modal-content ' + modalContentClass + '">',
        modalContent,
        '</div>',
        '<div class="nzui-modal-footer ' + modalFooterClass + '">',
        footerButton.join(''),
        '</div>'
      ];

      layer.open({
        type: 1,
        title: '',
        skin: 'nzui-modal', //样式类名
        area: options.area,
        closeBtn: 0, //不显示关闭按钮
        content: html.join(''),
        success: function (layero, index) {
          that.bindEvent(layero, index, options)
        }
      });
      return this;
    },
    //关闭事件
    close(index) {
      layer.close(index);
    },
    //关闭所有
    closeAll() {
      layer.closeAll();
    },
    //绑定事件
    bindEvent: function (el, index, options) {
      var $close = $(el).find('.nzui-modal-close');

      if (!$.isEmptyObject(options.buttons)) {
        //自定义多个按钮事件
        var $modalFooterButton = $(el).find('.nzui-modal-footer button');
        $.each(options.buttons, function (key, items) {
          $.each($modalFooterButton, function (buttonIndex, button) {
            $(button).on('click', function () {
              if ($(button).find('span').text() === key) {
                options.buttons[key].callback(index)
              }
            });
          });
        });
      } else {
        //取消事件
        $(el).find('.nzui-modal-cancel').on('click', function () {
          layer.close(index);
          if (typeof options.cancel === 'function') {
            options.cancel();
          }
        })
        //确认事件
        $(el).find('.nzui-modal-confirm').on('click', function () {
          if (typeof options.confirm === 'function') {
            options.confirm(index);
          }
        })
      }
      $close.on('click', function () {
        layer.close(index);
      });
    }
  }

  return NzModal;
});