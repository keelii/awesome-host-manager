import {
  isIP,
  isDomain,
  isLocalHost,
  getAddress,
  removeComment,
  splitLines,
  parseRules,
  getHosts,
  getProxies
} from '../proxy'

// utils
it('should remove comment form string', () => {
  expect(removeComment('test # comment content')).toEqual('test ')
  expect(removeComment('test # comment content \nanother line')).toEqual(
    'test \nanother line'
  )
})
it('should a IP address', () => {
  expect(isIP('192.168.1.1')).toEqual(true)
  expect(isIP('256.168.1.1')).toEqual(false)
})
it('should a domain name', () => {
  expect(isDomain('localhost')).toEqual(true)
  expect(isDomain('jd.ru')).toEqual(true)
  expect(isDomain('jd.local')).toEqual(true)
  expect(isDomain('jd-dj.local')).toEqual(true)
  expect(isDomain('jd.dj.im')).toEqual(true)
  expect(isDomain('jd.12.dj.im')).toEqual(true)
})
it('should a local host name', () => {
  expect(isLocalHost('test')).toEqual(true)
  expect(isLocalHost('test123')).toEqual(true)
  expect(isLocalHost('local')).toEqual(true)
})
it('should a IP/Port address', () => {
  expect(getAddress('192.168.1.1:8088')).toEqual('192.168.1.1:8088')
  expect(getAddress('256.168.1.1')).toEqual('256.168.1.1:80')
})

// parse Rules
const content = `
  127.0.0.1:8080   test.domain.com
  192.168.100.200  test.sub.domain.com
  192.168.200.200  a.b.domain.local

  SOCKS5  127.0.0.1:1080
  SOCKS  127.0.0.1:1080
`
/*
[ [ '127.0.0.1', 'test.domain.com' ],
  [ '192.168.100.200', 'test.sub.domain.com' ],
  [ '192.168.200.200', 'a.b.domain.local' ] ]
*/
const lines = splitLines(content)
it('should split content to lines', () => {
  expect(lines.length).toEqual(5)
})
it('should get all host rules', () => {
  const rules = getHosts(lines)
  expect(rules.length).toEqual(3)
  expect(rules[0][0]).toEqual('127.0.0.1:8080')
  expect(rules[2][1]).toEqual('a.b.domain.local')
})
it('should get all proxies rules', () => {
  const rules = getProxies(lines)
  expect(rules.length).toEqual(2)
  expect(rules[0][0]).toEqual('SOCKS5')
  expect(rules[1][1]).toEqual('127.0.0.1:1080')
})
