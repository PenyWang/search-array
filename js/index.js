var initCourseTab = (function () {

  var tabs = document.getElementsByClassName("course-tab-filter-item"),
      tabsLen = tabs.length;

  return {
    searchCourse: function () {

    },
    tabClick: function (e) {
      var e = e || window.event,
          tar = e.target || e.srcElement,
          className = tar.className,
          item;
      if(className === 'course-tab-filter-item' || className === 'course-tab-filter-item current'){ 
        for(var i = 0; i < tabsLen; i++){
          item = tabs[i];
          item.className = 'course-tab-filter-item';
        }
        tar.className += ' current';
      }
    },
  }
})();

;(function (doc) {

  var oSearchInput = doc.getElementById('js-search-input'),
      oTabList = doc.getElementById('js-course-tab-filter');

  function init () {
    bindEvent();
  }

  function bindEvent () {
    oSearchInput.addEventListener('input', initCourseTab.searchCourse, false);
    oTabList.addEventListener('click', initCourseTab.tabClick, false);
  }

  init();

})(document);