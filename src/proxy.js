/*global chrome*/
export const isIP = address =>
  /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/.test(address)
export const isDomain = name =>
  /localhost/.test(name) ||
  /^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/.test(
    name
  )
export const isProxy = proxy => /^SOCKS/.test(proxy)
export const removeComment = str => str.replace(/#.+/gm, '')
export const getPort = address => address.slice(address.indexOf(':') + 1)

export const parseRules = content => {
  const lines = removeComment(content)
    .split('\n')
    .filter(line => line.trim() !== '')
    .map(line => line.trim().split(/\s/))

  const hosts = lines.filter(host =>
    isIP(
      host[0].indexOf(':') > 0
        ? host[0].substr(0, host[0].indexOf(':'))
        : host[0]
    )
  )
  const proxies = lines.filter(proxy => isProxy(proxy[0]))

  const getHost = arr => {
    let hosts = arr.slice()
    let address = hosts.shift()
    let port = address.indexOf(':') > 0 ? getPort(address) : 80
    let result = ''

    hosts.forEach(host => {
      result += `}else if(host == "${host}"){return "PROXY ${address}:${port}; SYSTEM";\n`
    })
    return result
  }
  const getProxy = arr => {
    let method = arr.slice()
    let address = method.shift()
    let result = ''

    method.forEach(add => {
      result += `${address} ${add}; `
    })
    return result
  }

  let hostContent = hosts.reduce((sum, value) => (sum += getHost(value)), '')
  let proxyContent = proxies.reduce(
    (sum, value) => (sum += getProxy(value)),
    ''
  )

  return { hostContent, proxyContent }
}

export function setProxy(content) {
  let code = '\n'
  const result = parseRules(content)
  const defaultMethod =
    localStorage.getItem('AWESOME_HOST_otherProxies') || 'SYSTEM'

  let pacContent = `function FindProxyForURL(url, host) {
        if (shExpMatch(url, "http:*") || shExpMatch(url, "https:*")) {
            if (isPlainHostName(host)) {
                return "DIRECT";
            ${result.hostContent}
            } else {
                return "${result.proxyContent} ${defaultMethod}";
            }
        } else {
            return "SYSTEM";
        }
    }`

  console.log('proxy to:\n' + pacContent)
  if (typeof chrome.proxy === 'undefined') return false
  if (result.hostContent !== '' || result.proxyContent !== '') {

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
  } else {
    clearProxy()
  }
}
export function clearProxy() {
  console.log('clean.')
  if (typeof chrome.proxy === 'undefined') return false
  chrome.proxy.settings.set({
    value: { mode: 'system' },
    scope: 'regular'
  })
}
