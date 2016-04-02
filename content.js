(function() {
	var profile = document.getElementById('profile')
	var titles = []

	// Run only on pages with profile
	if (profile) {
		var title = profile.getElementsByTagName('h1')
		if (title) {
			titles.push(title[0])
		}
		var subtitles = profile.querySelectorAll('.names h3')
		for (var i = 0; i < subtitles.length; i++) {
			titles.push(subtitles[i])
		}
		getTemplate()
	}

	function getTemplate() {
		chrome.storage.sync.get('urlTemplate', function(data) {
			var urlTemplate = data.urlTemplate
			if (urlTemplate) {
				createLinks(titles, urlTemplate)
			} else {
				chrome.storage.sync.set({
					'urlTemplate': 'http://ulozto.cz/hledej?q={searchTerms}' // Default search website
				}, function() {
					getTemplate()
				})
			}
		})
	}

	function createLinks(titles, urlTemplate) {
		titles.forEach(function(title) {
			createLink(title, urlTemplate)
		})
	}

	function createLink(title, urlTemplate) {
		var link = document.createElement('a')
		link.appendChild(title.childNodes[0])
		link.href = urlTemplate.replace('{searchTerms}', encodeURIComponent(link.innerHTML.trim()))
		link.target = '_blank'
		link.style.color = 'inherit'
		title.insertBefore(link, title.firstChild)
	}

})()
