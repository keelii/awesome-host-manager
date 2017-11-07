(function(win, doc) {
    var saveBtn = document.querySelector('#save')
    var deleteBtn = document.querySelector('#delete')
    var content = document.querySelector('#o-proxy')
    var proxy = localStorage.getItem('AWESOME_HOST_otherProxies')

    if (proxy) content.value = proxy

    saveBtn.onclick = function () {
        var proxy = content.value || 'SYSTEM'
        localStorage.setItem('AWESOME_HOST_otherProxies', proxy)
    }
    deleteBtn.onclick = function () {
        localStorage.clear()
    }
})(window, document)