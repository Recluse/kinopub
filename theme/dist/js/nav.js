function goUp() {
  if (!$('.arrow-nav.focus').length) {
    $('.sidenav .arrow-nav[tabcolumn=0][tabindex=0]').addClass("focus")
    $('body').removeClass('sidebar-collapse')
  } else {
    parentClass = $('.arrow-nav.focus').parents().hasClass('sidenav') ? 'sidenav' : 'content'

    tabcolumn = $('.'+parentClass + ' .arrow-nav.focus').attr('tabcolumn')
    tabindex = $('.'+parentClass + ' .arrow-nav.focus').attr('tabindex')

    if ($('.'+parentClass + ' .arrow-nav.focus').attr('tabindex') != 0) {
      $('.'+parentClass + ' .arrow-nav.focus').removeClass("focus")
      $('.'+parentClass + ' .arrow-nav[tabcolumn='+tabcolumn+'][tabindex='+(parseInt(tabindex)-1)+']').addClass("focus")
    }

    if (parentClass == 'content') {
      if (window.pageYOffset > $('.arrow-nav.focus').offset().top) {
        window.scrollTo(0, $('.arrow-nav.focus').offset().top - $('.arrow-nav.focus').parent().height() / 2)
      }
    }
  }
}

function goDown() {
  if (!$('.arrow-nav.focus').length) {
    $('.sidenav .arrow-nav[tabcolumn=0][tabindex=0]').addClass("focus")
    $('body').removeClass('sidebar-collapse')
  } else {
    parentClass = $('.arrow-nav.focus').parents().hasClass('sidenav') ? 'sidenav' : 'content'

    tabcolumn = $('.'+parentClass + ' .arrow-nav.focus').attr('tabcolumn')
    tabindex = $('.'+parentClass + ' .arrow-nav.focus').attr('tabindex')

    if (tabindex != $('.'+parentClass + ' .arrow-nav[tabcolumn='+tabcolumn+']').last().attr('tabindex')) {
      $('.'+parentClass + ' .arrow-nav.focus').removeClass("focus")
      $('.'+parentClass + ' .arrow-nav[tabcolumn='+tabcolumn+'][tabindex='+(parseInt(tabindex)+1)+']').addClass("focus")
    } else if (parentClass == 'sidenav') {
      $('.'+parentClass + ' .arrow-nav[tabcolumn='+tabcolumn+'][tabindex=0]').addClass("focus")
    }

    if (parentClass == 'content') {
      if (window.innerHeight / 1.5 < $('.arrow-nav.focus').offset().top) {
        window.scrollTo(0, $('.arrow-nav.focus').offset().top - $('.arrow-nav.focus').parent().height() / 2)
      }
    }
  }
}

function goRight() {
  if (!$('.arrow-nav.focus').length) {
    $('.content .arrow-nav[tabcolumn=0][tabindex=0]').addClass("focus")
    $('body').addClass('sidebar-collapse')
  } else {
    parentClass = $('.arrow-nav.focus').parents().hasClass('sidenav') ? 'sidenav' : 'content'

    tabcolumn = $('.'+parentClass + ' .arrow-nav.focus').attr('tabcolumn')
    tabindex = $('.'+parentClass + ' .arrow-nav.focus').attr('tabindex')

    if (tabcolumn != $('.'+parentClass + ' .arrow-nav[tabindex='+tabindex+']').last().attr('tabcolumn')) {
      $('.'+parentClass + ' .arrow-nav.focus').removeClass("focus")
      $('.'+parentClass + ' .arrow-nav[tabcolumn='+(parseInt(tabcolumn)+1)+'][tabindex='+tabindex+']').addClass("focus")
    } else if (parentClass == 'sidenav') {
      $('.'+parentClass + ' .arrow-nav.focus').removeClass("focus")
      $('.content .arrow-nav[tabcolumn=0][tabindex=0]').addClass("focus")
      $('body').addClass('sidebar-collapse')
    }
  }
}

function goLeft() {
  if (!$('.arrow-nav.focus').length) {
    $('.sidenav .arrow-nav[tabcolumn=0][tabindex=0]').addClass("focus")
    $('body').removeClass('sidebar-collapse')
  } else {
    parentClass = $('.arrow-nav.focus').parents().hasClass('sidenav') ? 'sidenav' : 'content'

    tabcolumn = $('.arrow-nav.focus').attr('tabcolumn')
    tabindex = $('.arrow-nav.focus').attr('tabindex')

    if (tabcolumn != 0) {
      $('.'+parentClass + ' .arrow-nav.focus').removeClass("focus")
      $('.'+parentClass + ' .arrow-nav[tabcolumn='+(parseInt(tabcolumn)-1)+'][tabindex='+tabindex+']').addClass("focus")
    } else if (parentClass == 'content') {
      $('.'+parentClass + ' .arrow-nav.focus').removeClass("focus")
      $('.sidenav .arrow-nav[tabcolumn=0][tabindex=0]').addClass("focus")
      $('body').removeClass('sidebar-collapse')
    }
  }
}

function doOk() {
//todo
}

document.addEventListener("keydown", function(inEvent){
	  var keycode;	  
	  if(window.event) { 
	      keycode = inEvent.keyCode;
	  } else if(e.which) { 
	      keycode = inEvent.which;
    } 
	  switch(keycode) {
	      //case 13: doOk(); break;
	      case 37: goLeft(); break;
	      case 38: goUp(); break;
	      case 39: goRight(); break;
	      case 40: goDown(); break; 
	  }
});


// History
document.addEventListener('click', function (event) {
  var title;
   
  clearPoppedData();
  event.preventDefault();
   
  if (event.target.nodeName == 'A') {
      stackElement = event.target.innerHTML;
      history.pushState(stackElement, '', event.target.href);
      pushData(stackElement);
  }
}, false);

window.addEventListener('popstate', function (event) {
  var data = event.state;
  if (data) {
      popData(data);
  } else {
      initResult();
  }
       
}, false);
