var initCourseTab = (function () {

  var oTabs = document.getElementsByClassName("course-tab-filter-item"),
      oData = document.getElementById('js-course-data'),
      oCardUl = document.getElementById('js-course-card-list'),
      oInput = document.getElementById('js-search-input'),
      oCourseTip = document.getElementById('js-course-tip'),
      courseTpl = document.getElementById('js-course-tpl').innerHTML,

      jsonData = JSON.parse(oData.innerHTML),
      searchRes = jsonData,
      curTab = "all",
      keyWords = '';

  return {
    searchInput: function () {
      keyWords = oInput.value;
      this.changeCurTab(oTabs[0]);
      this.renderCard('search');
    },

    tabClick: function (e) {
      var e = e || window.event,
          tar = e.target || e.srcElement,
          className = tar.className;

      if(className === 'course-tab-filter-item' || className === 'course-tab-filter-item current'){ 
        curTab = tar.getAttribute("data-field");
      }
      
      this.changeCurTab(tar);
      this.renderCard('click');
    },

    changeCurTab: function (oDoc) {
      var tabsLen = oTabs.length;
      
      for(var i = 0; i < tabsLen; i++){
        oTabs[i].className = 'course-tab-filter-item';
      }
      oDoc.className += ' current';
    },

    renderCard: function (type){
      var resData = type === 'click' 
                    ? this.filterCourse(curTab, searchRes)
                    : this.searchCourse(keyWords, jsonData);
      var oCardList = this.makeOList(resData);

      if(!resData || resData.length === 0){
        oCardUl.innerHTML = oCourseTip.innerHTML;
      }else{
        oCardUl.innerHTML = oCardList;
      }
    },

    filterCourse: function (condition, data) {
      return data.filter( function (item) {
        switch(condition){
          case 'all':
            return true;
          case 'free':
            return item.is_free === '1';
          case 'vip': 
            return item.is_free === '0';
          default :
            return true;
        }
      })
    },

    searchCourse: function (condition, data) {
      if(condition && condition.trim().length === 0) {
        searchRes = data;
      }
      searchRes = data.filter(function (item){
        return item.course.indexOf(condition) !== -1;
      })
      return searchRes;
    },

    makeOList: function (data){
      return data.reduce(function (prev, item){
        prev += courseTpl.replace(/{{(.*?)}}/g, function(node, key){
          return item[key];
        })
        return prev;
      }, '');
    },

  }
})();

;(function () {

  var oSearchInput = document.getElementById('js-search-input'),
      oTabList = document.getElementById('js-course-tab-filter');
  
  function init () {
    initCourseTab.renderCard.call(initCourseTab);
    bindEvent();
  }

  function bindEvent () {
    oSearchInput.addEventListener('input', initCourseTab.searchInput.bind(initCourseTab), false);
    oTabList.addEventListener('click', initCourseTab.tabClick.bind(initCourseTab), false);
  }

  init();

})();