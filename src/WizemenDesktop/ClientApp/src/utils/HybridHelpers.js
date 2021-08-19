export const openExternalLink = (url) => {
	if (window.electron) {
		window.electron.ipcRenderer.send('open-link', url)
	}
	else {
		window.open(url, "_blank")
	}
}