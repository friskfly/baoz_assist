(function() {
	var prefix = 'baoz_assist'
	baoz_assist_storage = localStorage.getItem(prefix)
	if (!baoz_assist_storage) baoz_assist_storage = "{}"
	baoz_assist_storage = JSON.parse(baoz_assist_storage)

	document.addEventListener('click', function(e) {
		var srcElement = e.target || e.srcElement
		while (srcElement && srcElement.tagName.toLowerCase() != "a") srcElement = srcElement.parentElement
		if (srcElement) {
			var href = srcElement.getAttribute("href")
			var tid = /(\d+)/.exec(href)
			tid = tid && tid[0]
			tid && setTimeout(function() {
				var tidScroll = baoz_assist_storage[tid]
				tidScroll && _scrollTo(tidScroll)
			}, 1000)
			tid && setTimeout(function() {
				document.querySelector(".content .view_body div").addEventListener('mousewheel', _debounce(function(e) {
					baoz_assist_storage[tid] = this.scrollTop
					localStorage.setItem(prefix, JSON.stringify(baoz_assist_storage))
				}, 300), false)
			}, 1500)
		}
	}, false)

	function _debounce(func, wait, immediate) {
		var timeout, result;
		return function() {
			var context = this,
				args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) result = func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) result = func.apply(context, args);
			return result;
		};
	};

	function _scrollTo(x) {
		var scroll = 0
		var i = 100;
		function __scrollTo() {
			document.querySelector(".content .view_body div").scrollTop = scroll
			scroll += i
			i += 100
			if (scroll < x) setTimeout(__scrollTo, 100)
			else document.querySelector(".content .view_body div").scrollTop = x
		}
		__scrollTo()
	}
})()