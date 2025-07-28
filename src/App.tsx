import { h, Component } from 'preact'
import { isIP, isDomain, isLocalHost, isProxy, removeComment, setProxy, clearProxy } from './proxy'
import {SvgIcon} from "./Svg";
import {shortUuid} from "./uuid";

// 类型定义
interface Category { id: string; name: string; enabled: boolean }
interface Host { cid: string; content: string }
interface Notice { type: string; content: string; active: boolean }

interface AppState {
  categories: Category[]
  hosts: Host[]
  enabled: boolean
  selected: string | null
  content: string
  editing: string
  notice: Notice
}

export default class App extends Component<{}, AppState> {
  DB_PREFIX = 'AWESOME_HOST_'

  inputRefs: Record<string, HTMLInputElement> = {};
  textarea: HTMLTextAreaElement | null = null;

  constructor() {
    super()
    this.state = {
      categories: [],
      hosts: [],
      enabled: true,
      selected: null,
      content: '',
      editing: '',
      notice: { type: 'error', content: '', active: false }
    }
  }

  componentDidMount() {
    const categories = this.getData('categories') || []
    const hosts = this.getData('hosts') || []
    const enabled = this.getData('enabled')
    const selected = this.getData('selected')

    this.setState({ categories, hosts, enabled: enabled ?? true }, () => {
      if (hosts.length) {
        setTimeout(() => {
          if (selected) {
            this.handleLoadHost(selected)
          } else {
            this.loadAllHost(categories, hosts)
          }
        }, 300)
      }
    })
  }
  componentDidUpdate() {
    this.saveData('categories')
    this.saveData('hosts')
    this.saveData('enabled')
  }

  // storage
  saveData(key: string, value?: any) {
    localStorage.setItem(
      `${this.DB_PREFIX}${key}`,
      value !== undefined ? JSON.stringify(value) : JSON.stringify(this.state[key as keyof AppState])
    )
  }
  getData(key: string) {
    const value = localStorage.getItem(`${this.DB_PREFIX}${key}`)
    try {
      return value ? JSON.parse(value) : null
    } catch {
      return value
    }
  }

  // category
  getCategoryMap(categories: Category[]) {
    return categories.reduce((map, c) => {
      map[c.id] = { name: c.name, enabled: c.enabled }
      return map
    }, {} as Record<string, { name: string; enabled: boolean }>)
  }
  updateProxy() {
    setTimeout(() => {
      const content = this.getHostContent(this.state.hosts)
      if (this.state.enabled) setProxy(content)
      else clearProxy()
    }, 300)
  }
  onToggleEnableAll = () => {
    this.setState(
      s => ({ enabled: !s.enabled }),
      () => this.updateProxy()
    )
  }
  toggleEnable = (id: string) => {
    this.setState(
      s => ({
        categories: s.categories.map(c =>
          c.id === id ? { ...c, enabled: !c.enabled } : c
        )
      }),
      () => {
        this.setCurrentContent(this.state.selected)
        this.updateProxy()
      }
    )
  }
  editCategory = (id: string, name: string) => {
    this.setState(s => ({
      categories: s.categories.map(c => (c.id === id ? { ...c, name } : c))
    }))
  }
  addCategory = (name: string) => {
    const id = shortUuid()
    this.setState(s => ({
      categories: [...s.categories, { id, name, enabled: true }]
    }))
  }
  removeCategory = (id: string | null) => {
    if (!id) return this.notice('error', '请选择分组')

    const idx = this.state.categories.findIndex(c => c.id === id)
    const targetIdx = idx + 1 === this.state.categories.length
      ? idx - 1
      : Math.min(this.state.categories.length - 1, idx + 1)
    const selected = this.state.categories[targetIdx]?.id

    this.setState(
      s => ({
        categories: s.categories.filter(c => c.id !== id),
        hosts: s.hosts.filter(h => h.cid !== id),
        selected
      }), () => {
        this.updateProxy()
      }
    )
  }

  // host
  loadAllHost = (categories: Category[], hosts: Host[]) => {
    const cMap = this.getCategoryMap(categories)
    let content = ''
    hosts.forEach(h => {
      if (cMap[h.cid] && cMap[h.cid].enabled) {
        content += `# ${cMap[h.cid].name}\n${h.content}\n`
      }
    })
    this.setState({ selected: null, content })
    this.saveData('selected', null)
  }
  getHostContent(hosts: Host[]) {
    let result = ''
    const cMap = this.getCategoryMap(this.state.categories)
    hosts
      .filter(h => cMap[h.cid] && cMap[h.cid].enabled)
      .forEach(h => (result += h.content + '\n'))
    return result
  }
  setCurrentContent(id: string | null) {
    this.setState({ content: this.getHostContentById(id) })
  }
  getHostContentById(id: string | null) {
    if (!id) return ''
    const host = this.state.hosts.find(h => h.cid === id)
    return host ? host.content : ''
  }
  handleLoadHost = (id: string) => {
    this.setState({ selected: id, content: this.getHostContentById(id) })
    this.saveData('selected', id)
    setTimeout(() => {
      (document.getElementById('textarea') as HTMLTextAreaElement)?.focus()
    }, 100)
  }
  editHost = (content?: string) => {
    if (content) {
      this.setState({ content })
    } else {
      console.warn("content is missing")
    }
  }
  handleSave = (e: any) => {
    if (e.altKey) {
      this.copyHost()
    } else {
      this.saveHost()
    }
  }
  saveHost = () => {
    const { selected, content, hosts } = this.state
    if (!selected) return this.notice('请先选择分组')
    const error = this.validate(content)
    if (error) return this.notice(error)
    let found = false
    const newHosts = hosts.map(h => {
      if (h.cid === selected) {
        found = true
        return { ...h, content }
      }
      return h
    })
    if (!found) newHosts.push({ cid: selected, content })
    this.setState({ hosts: newHosts }, () => this.updateProxy())
  }
  removeComment(content: string) {
    return content.replace(/#.+/gm, '')
  }
  validate(value: string) {
    const rules = removeComment(value.trim()).split('\n')
    let ipRE = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?::(6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]|[1-5]?\d{1,4}))?$/
    let error: string | null = null
    rules.forEach((rule: string) => {
      let r = rule.split(/\s+/)
      if (isProxy(r[0])) {
        if (!ipRE.test(r[1])) {
          return this.notice("IP 地址不正确")
        }
        return
      }
      if (!ipRE.test(r[0])) {
        return this.notice("IP 地址不正确")
      }
      if (!r[1] || r[1].trim() === "") {
        return this.notice("Host 地址不能为空")
      }
      r.shift()
      if (r.length) {
        r.filter(h => h.trim() !== '').forEach(h => {
          let isValidHost = isDomain(h) || isLocalHost(h)
          if (!isValidHost) error = `host name[${r}] maybe not valid.`
        })
      }
    })
    return error
  }
  notice(content: string) {
    toastMessage(content)
  }
  copyHost = () => {
    this.notice('Host content is copied.')
    this.copy(this.state.content)
  }
  copy(text: string) {
    const input = document.createElement('textarea')
    document.body.appendChild(input)
    input.value = text
    input.focus()
    input.select()
    document.execCommand('Copy')
    input.remove()
  }

  render() {
    const { categories, enabled, selected, content, hosts, notice, editing } = this.state

    return (
      <div className="app flex">
        <div className="left">
          <div class="op salign valign">
            <SvgIcon name="add" onClick={() => this.addCategory('unnamed')}/>
            <SvgIcon name="trash" onClick={() => this.removeCategory(selected)}/>
          </div>
          <div class="cnt">
            <ul className={`menu-list${enabled ? '' : ' disabled'}`} >
              <li className="flex valign gap-10 all-hosts is-active" onClick={() => this.loadAllHost(categories, hosts)}>
                {enabled
                  ? <SvgIcon name="on" onClick={this.onToggleEnableAll}/>
                  : <SvgIcon name="off" onClick={this.onToggleEnableAll}/>
                }
                <span className="text">All Hosts</span>
              </li>
              {categories.map((category, index) => (
                <li
                  key={category.id}
                  data-id={category.id}
                  className={`flex gap-10 valign salign ${category.enabled ? "":"disabled"} ${selected === category.id ? ' is-active' : ''}`}
                  onDblClick={() => this.handleEdit(category.id)}
                  onClick={() => this.handleLoadHost(category.id)}
                >
                  <div className="flex grow-1 gap-10 valign">
                    {category.enabled
                      ? <SvgIcon name="on" onClick={() => this.toggleEnable(category.id) }/>
                      : <SvgIcon name="off" onClick={() => this.toggleEnable(category.id) }/>
                    }
                    <span className={category.id === editing ? 'is-hidden' : 'text'}>{category.name}</span>
                    <span className={category.id === editing ? 'text name-input' : 'is-hidden'}>
                      <input class="update-input"
                        ref={(el) => {
                          if (el) this.inputRefs[category.id] = el
                        }}
                        type="text"
                        value={category.name}
                        onBlur={() => {this.handleBlur(category.id)}}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            this.handleBlur(category.id)
                            this.focusTextarea()
                            this.handleChange(category.id, e)
                            e.preventDefault()
                          }
                        }}
                        onClick={e => {
                          e.stopPropagation()
                        }}
                        onChange={e => this.handleChange(category.id, e)}
                      />
                    </span>
                  </div>
                  {/*<SvgIcon name="edit" onClick={() => this.handleEdit(category.id)}/>*/}
                </li>
              ))}
              <li className="error-msg">
                {notice.active && <div>{notice.content}</div>}
              </li>
            </ul>
          </div>
        </div>
        <div className="right">
          <div className="op salign valign">
            <SvgIcon name="save" onClick={this.handleSave}/>
            <a href="options.html" target="_blank">
              <SvgIcon name="setting" />
            </a>
          </div>
          <div className="cnt">
            <textarea ref={el => this.textarea = el} autoComplete="off" autoCorrect="off" autoCapitalize="off"
                      name="host"
                      value={content}
                      className="hero is-fullheight"
                      onChange={(e: any) => this.editHost(e.target?.value)}
                      readOnly={!selected}
                      placeholder="127.0.0.1 localhost">

            </textarea>
          </div>
        </div>
      </div>
    )
  }

  handleChange(id: string, e: any) {
    this.editCategory(id, e.target.value)
  }
  handleBlur(id: string) {
    this.setState({ ...this.state, editing: "" })
  }

  handleEdit(id: string) {
    this.setState({ ...this.state, editing: id }, () => {
      this.inputRefs[id]?.select()
    })
  }
  focusTextarea() {
    if (this.textarea) {
      this.textarea.focus()
    }
  }
}

function toastMessage(text: string) {
  console.error(text);
  if ((window as any).Toastify) {
    var toast = (window as any).Toastify({
      text,
      duration: 3000,
      position: 'center',
      onClick: function () {
        toast.hideToast();
      }
    }).showToast();
  }
}
