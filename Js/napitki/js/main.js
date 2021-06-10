function getUniqueArrayByTag (tag) {
	let arr = Array.from(document.getElementById(tag).children).map(a => a.textContent)
	return Array.from(new Set(arr));
}

// console.log (getUniqueArrayByTag("drinks-list"));