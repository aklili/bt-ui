/**
 * TABS
 */
define([
  'jquery',
  'NzHttp',
  'layer'
], function ($, NzHttp, layer) {
  var $el = '';
  var NzTabs = {
    initTabs: function (el) {
      $el = el;
      //初始化选项卡的高度  
      $(el).tabs({
        height: $("#nzui-layout-main").height(),
        onSelect: function (title, index) {
        }
      })
    },
    //初始化默认页面
    initTabsDefault: function (url, title, close) {
      this.addTabs(url, title, close)
    },
    //从cookie里面渲染
    reanderCookieTabs: function (url, title, close) {
      NzHttp.get(url, {}, { dataType: 'html' }).then(function (res) {
        $($el).tabs('add', {
          title: title,
          content: res,
          closable: close === undefined ? true : close
        })
      }).fail(function (error) {
        if (error.status === 404) {
          layer.msg("你的请求地址，不在服务区，请你好好检查<br/>ε=怒ε=怒ε=怒ε=( o｀ω′)ノ<br/>404")
        }
        if (error.status === 405) {
          layer.msg("你发送的请求地址，暂未支持GET方式<br/>（⊙ｏ⊙）")
        }
      })
    },
    //添加选项卡
    addTabs: function (url, title, close) {
      if ($($el).tabs('exists', title)) {
        $($el).tabs('select', title); //防止重复添加
      } else {
        NzHttp.get(url, {}, { dataType: 'html' }).then(function (res) {
          $($el).tabs('add', {
            title: title,
            content: res,
            closable: close === undefined ? true : close
          })
          // if (!$.cookie('historyTabs')) {
          //   var historyTabs = [];
          //   historyTabs.push({ url: url, title: title, close: close });
          //   $.cookie('historyTabs', historyTabs, { expires: 7, path: '/' });
          // } else {
          //   var historyTabs = $.cookie('historyTabs');
          //   var flag = false;
          //   $.each(historyTabs, function (index, items) {
          //     if (items.title !== title && items.url !== url) {
          //       flag = true;
          //     } else {
          //       flag = false;
          //     }
          //   })
          //   if (flag) {
          //     historyTabs.push({ url: url, title: title, close: close });
          //   }
          //   $.cookie('historyTabs', historyTabs, { expires: 7, path: '/' });
          // }

        }).fail(function (error) {
          if (error.status === 404) {
            layer.msg("你的请求地址，不在服务区，请你好好检查<br/>ε=怒ε=怒ε=怒ε=( o｀ω′)ノ<br/>404")
          }
          if (error.status === 405) {
            layer.msg("你发送的请求地址，暂未支持GET方式<br/>（⊙ｏ⊙）")
          }
        })
      }
    },
    //关闭TABS 通过标题关闭
    closeTabs: function (title) {
      $($el).tabs('close', title)
    },
    //选中TABS 通过标题选中title
    selectedTabs: function (title) {
      $($el).tabs('select', title)
    }
  }
  return NzTabs;
});