/**
 * 程序左侧菜单
 */
define([
  'jquery',
  'NzHttp',
  'NzTabs',
  'layer'
], function ($, NzHttp, NzTabs,layer) {

  var NzSider = {
    /**
     * 渲染左侧菜单
     * @param {*} url 菜单数据地址
     * @param  {*} el 指定容器
     */
    render: function (url, el) {
      /*请求数据*/
      NzHttp.get(url).then(function (res) {
        $(el).sidemenu({
          data: res,
          multiple: false,
          border: false,
          width: 256,
          onSelect: function (item) {
            if (item.url) {
              NzTabs.addTabs(item.url, item.text);
            } else {
              layer.msg("地址未指定，请你指定地址再操作，谢谢～_～<br/>┻━┻︵╰(‵□′)╯︵┻━┻")
            }
          }
        });
      })
    }
  }
  return NzSider;
});