/**
 * 程序入口文件
 */
define([
  'jquery',
  'NzSider',
  'NzTabs',
  'NzModal'
], function ($, NzSider, NzTabs, NzModal) {

  var historyTabs = $.cookie('historyTabs');
  //延时渲染 防止easyui 未加载 就执行渲染
  setTimeout(function () {
   
    //初始化菜单 必须
    NzSider.render('/data/menu.json', '#nzui-side-menu');

    //初始化TABS 必须
    NzTabs.initTabs('#nzui-layout-tabs');

    //初始化默认页面 必须
    if (historyTabs === undefined) {
      NzTabs.initTabsDefault('/pages/dashborad.html', '默认页面');
    } else {
      // console.log($.cookie('historyTabs'));
      // NzModal.show({
      //   title: '打开提醒',
      //   content: '是否打开之前使用过的页面?',
      //   confirm: function (index) {
      //     $.each(JSON.parse(historyTabs), function (index, items) {
      //       NzTabs.reanderCookieTabs(items.url, items.title, items.close);
      //     })
      //     NzModal.close(index);
      //   }
      // })
    }
  }, 100);

});