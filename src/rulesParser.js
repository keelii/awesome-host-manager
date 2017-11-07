const isIP = address =>
  /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/.test(address)
const isProxy = proxy => /^SOCKS/.test(proxy)
const removeComment = str => str.replace(/#.+/gm, '')
const getPort = address => address.slice(address.indexOf(':') + 1)

export function parseRules(content) {
  const lines = removeComment(content)
    .split('\n')
    .filter(line => line.trim() !== '')
    .map(line => line.trim().split(/\s/))

  const hosts = lines.filter(host => isIP(host[0]))
  const proxies = lines.filter(proxy => isProxy(proxy[0]))

  const getHost = arr => {
    let hosts = arr.slice()
    let address = hosts.shift()
    let port = ':'.indexOf(address) > 0 ? getPort(address) : 80
    let result = ''

    hosts.forEach(host => {
      result += `}else if(host == "${host}"){return "PROXY ${address}:${port}; DIRECT";\n`
    })
    return result
  }
  const getProxy = arr => {
    let method = arr.slice()
    let address = method.shift()
    let port = ':'.indexOf(address) > 0 ? getPort(address) : 1080
    let result = ''

    method.forEach(add => {
      result += `${address} ${add}:${port}; `
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
