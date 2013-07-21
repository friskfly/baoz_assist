(function() {
	var prefix = 'baoz_assist'
	baoz_assist_storage = localStorage.getItem(prefix)
	if (!baoz_assist_storage) baoz_assist_storage = "{}"
	baoz_assist_storage = JSON.parse(baoz_assist_storage)
	document.addEventListener('click', function(e) {
		setTimeout(function() {
			var srcElement = e.target || e.srcElement
			while (srcElement && srcElement.tagName.toLowerCase() != "a" && srcElement.tagName.toLowerCase() != "ul") srcElement = srcElement.parentElement
			if (srcElement && srcElement.tagName.toLowerCase() == "a") {
				var href = srcElement.getAttribute("href")
				var tid = /(\d+)/.exec(href)
				tid = tid && tid[0]
				tid && setTimeout(function() {
					var tidScroll = baoz_assist_storage[tid]
					tidScroll && _scrollTo(tidScroll)
				}, 100)
				tid && setTimeout(function() {
					var content = document.querySelectorAll(".content")
					scrollRole = content.item(content.length - 1).querySelector(".view_body div");
					scrollRole.addEventListener('mousewheel', _debounce(function(e) {
						baoz_assist_storage[tid] = this.scrollTop
						localStorage.setItem(prefix, JSON.stringify(baoz_assist_storage))
					}, 300), false)
				}, 1000)
			}
		}, 1000)
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
		var scroll = 0,
			i = 100,
			content = document.querySelectorAll(".content")
			scrollRole = content.item(content.length - 1).querySelector(".view_body div");
		//scrollRole = document.querySelector(".content[style='top: 0px;'] .view_body div"),  这种选择器能工作但不太靠谱

		function __scrollTo() {
			scrollRole.scrollTop = scroll
			scrollHeight = scrollRole.scrollHeight - scrollRole.clientHeight
			scroll += i
			i += 100
			if (scrollHeight >= x) {
				if (scroll < x) setTimeout(__scrollTo, 100)
				else scrollRole.scrollTop = x
			} else {
				if (scroll < scrollHeight) setTimeout(__scrollTo, 100)
				else {
					scrollRole.scrollTop = scrollHeight
					setTimeout(__scrollTo, 200)
				}
			}
		}
		__scrollTo()
	}
})()