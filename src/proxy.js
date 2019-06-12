/*global chrome*/
export const isIP = address =>
  /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/.test(address)
export const isDomain = name =>
  /localhost/.test(name) ||
  /^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/.test(
    name
  )
export const isLocalHost = name => /\w+/.test(name)  
export const isProxy = proxy => /^SOCKS/.test(proxy)
export const removeComment = str => str.replace(/#.+/gm, '')

export const splitLines = (content) => {
  return removeComment(content).split('\n')
    .filter(line => line.trim() !== '')
    .map(line => line.trim().split(/\s/))
    .map(hosts => {
      return hosts.filter(host => {
        return host.trim() !== ''
      })
    })
}
export const getHosts = (lines) => {
  return lines.filter(host =>
    isIP(
      host[0].indexOf(':') > 0
        ? host[0].substr(0, host[0].indexOf(':'))
        : host[0]
    )
  )
}
export const getAddress = (add) => {
  return add.indexOf(':') > -1 ? add : add + ':80'
}
export const getProxies = (lines) => {
  return lines.filter(proxy => isProxy(proxy[0]))
}

export const parseRules = content => {
  const lines = splitLines(content)

  const hosts = getHosts(lines)
  const proxies = getProxies(lines)

  const getHostContent = arr => {
    let hosts = arr.slice()
    let address = getAddress(hosts.shift())
    let result = ''

    hosts.forEach(host => {
      result += `\nif(host == "${host}"){\nreturn "PROXY ${address}; SYSTEM";}\n`
    })
    return result
  }
  const getProxyContent = arr => {
    let method = arr.slice()
    let address = method.shift()
    let result = ''

    method.forEach(add => {
      result += `${address} ${add}; `
    })
    return result
  }

  let hostContent = hosts.reduce((sum, value) => (sum += getHostContent(value)), '')
  let proxyContent = proxies.reduce(
    (sum, value) => (sum += getProxyContent(value)),
    ''
  )

  return { hostContent, proxyContent }
}

export function setProxy(content) {
  let code = '\n'
  console.log(content)
  const result = parseRules(content)
  const defaultMethod =
    localStorage.getItem('AWESOME_HOST_otherProxies') || 'SYSTEM'

  let pacContent = `
  function FindProxyForURL(url, host) {
    if (shExpMatch(url, "http:*") || shExpMatch(url, "https:*")) {
        if (isPlainHostName(host)) {
            if (host == 'localhost') {
                return "DIRECT";
            } else {
                ${result.hostContent}
                else { return "${result.proxyContent} ${defaultMethod}"; }
            }
        } else {
            ${result.hostContent}
            else { return "${result.proxyContent} ${defaultMethod}"; }
        }
    } else {
        return "SYSTEM";
    }
  }`
  // let pacContent = `function FindProxyForURL(url, host) {
  //       if (shExpMatch(url, "http:*") || shExpMatch(url, "https:*")) {
  //           if (isPlainHostName(host) && host == 'localhost') {
  //               return "DIRECT";
  //           ${result.hostContent}
  //           } else {
  //               return "${result.proxyContent} ${defaultMethod}";
  //           }
  //       } else {
  //           return "SYSTEM";
  //       }
  //   }`


  console.log('proxy to:\n' + pacContent)
  if (typeof chrome.proxy === 'undefined') return false
  if (result.hostContent !== '' || result.proxyContent !== '') {
    clearProxy(function() {
      chrome.proxy.settings.set(
        {
          value: {
            mode: 'pac_script',
            pacScript: {
              data: pacContent
            }
          },
          scope: 'regular'
        },
        function() {}
      )
    })
  } else {
    clearProxy()
  }
}
export function clearProxy(cb) {
  cb = cb || function () {}
  console.log('clear.')
  if (typeof chrome.proxy === 'undefined') return false
  chrome.proxy.settings.set({
      value: { mode: 'system' },
      scope: 'regular'
    },
    cb
  )
}
