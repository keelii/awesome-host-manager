import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  getEnable,
  toggleEnableAll,
  addCategory,
  removeCategory,
  editCategory,
  getCategories,
  toggleEnableCategory,
  getHosts,
  markSelected,
  removeHostByCid,
  updateContent,
  saveHost
} from './actions'

import {
  setProxy,
  clearProxy,
  isIP,
  isDomain,
  isProxy,
  removeComment
} from './proxy'

class Icon extends Component {
  static defaultProps = {
    color: 'success',
    name: 'circle-o',
    size: ''
  }
  render() {
    return (
      <span className={`fa has-text-${this.props.color} ${this.props.size}`}>
        <i className={`fa fa-${this.props.name}`} aria-hidden="true" />
      </span>
    )
  }
}

class Item extends Component {
  constructor() {
    super()
    this.state = { editing: false }
  }
  render() {
    return (
      <li
        data-id={this.props.id}
        onClick={id => this.handleLoad(this.props.id)}
        onKeyUp={e => this.handleKeyPress(e)}
        className={`is-clearfix ${this.props.selected === this.props.id
          ? 'is-active'
          : ''}`}
      >
        <a className="is-clearfix">
          <div className="is-pulled-left">
            <span onClick={id => this.handleToggle(this.props.id)}>
              <Icon
                size="fa-lg"
                name={this.props.enabled ? 'toggle-on' : 'toggle-off'}
                color={this.props.enabled ? 'success' : 'grey-light'}
              />
            </span>
            <span
              className={this.state.editing ? 'is-hidden' : 'text'}
              onDoubleClick={(event, id, name) =>
                this.handleEdit(event, this.props.id, this.props.name)}
            >
              {this.props.name}
            </span>
            <span className={this.state.editing ? 'name-input' : 'is-hidden'}>
              <input
                ref={`input_${this.props.id}`}
                type="text"
                value={this.props.name}
                onClick={e => {
                  e.stopPropagation()
                }}
                onChange={e => this.handleChange(this.props.id, e)}
              />
            </span>
          </div>
          <div className="is-pulled-right">
            <span
              className="icon has-text-grey-light"
              onClick={event =>
                this.handleEdit(event, this.props.id, this.props.name)}
            >
              <i className="fa fa-pencil" aria-hidden="true" />
            </span>
          </div>
        </a>
      </li>
    )
  }
  handleLoad(id) {
    this.props.onLoadHost(id)
  }
  handleKeyPress(event) {
    if (event.key === 'Enter' || event.key === 'Escape') {
      this.setState({
        ...this.state,
        editing: false
      })
    }
  }
  handleChange(id, event) {
    this.props.onEdit(id, event.target.value)
  }
  handleEdit(event, id, name) {
    this.setState(
      {
        ...this.state,
        editing: !this.state.editing
      },
      () => {
        this.refs[`input_${id}`].select()
      }
    )
    this.props.onEdit(id, name)
    event.stopPropagation()
  }
  handleToggle(id) {
    this.props.onToggle(id)
  }
}

class CategoryCtrl extends Component {
  render() {
    return (
      <li className="nohover">
        <div className="is-clearfix control">
          <div
            className="is-pulled-left"
            onClick={e => this.handleClick(e, 'add')}
          >
            <Icon name="plus" color="success" />
          </div>
          <p
            className="is-pulled-right"
            onClick={e => this.handleClick(e, 'remove')}
          >
            <Icon name="trash-o" color="danger" />
          </p>
        </div>
      </li>
    )
  }
  handleClick(e, type) {
    if (type === 'add') {
      this.props.onAdd('unnamed')
    }
    if (type === 'remove') {
      this.props.onRemove('unnamed')
    }
  }
}
class AllHosts extends Component {
  render() {
    return (
      <li
        className="all-hosts"
        onClick={() => {
          this.handleClick()
        }}
      >
        <a className="is-clearfix">
          <div className="is-pulled-left">
            <span
              onClick={() => {
                this.toggleEnableAll()
              }}
            >
              <Icon
                size="fa-lg"
                name={`toggle-${this.props.enabled ? 'on' : 'off'}`}
              />
            </span>
            <span className="text">All Hosts</span>
          </div>
          <div className="is-pulled-right" />
        </a>
      </li>
    )
  }
  toggleEnableAll() {
    this.props.onToggleEnableAll()
  }
  handleClick() {
    this.props.onLoadAllHosts()
  }
}

class Message extends Component {
  render() {
    return (
      <article
        id="message"
        className={`message is-small ${this.props.notice.active
          ? ''
          : 'is-hidden'}`}
      >
        <div className="message-body">
          <Icon name={this.props.notice.type} color={'success'} />
          { ' ' + this.props.notice.content}
        </div>
      </article>
    )
  }
}

class ShowHost extends Component {
  render() {
    return (
      <div>
        <textarea
          ref="textarea"
          id="textarea"
          style={{ height: '353px' }}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          className="hero is-fullheight"
          placeholder="127.0.0.1 localhost"
          value={this.props.content}
          onChange={event => this.handleChange(event.target.value)}
          readOnly={this.props.selected === null}
        />
      </div>
    )
  }
  handleChange(value) {
    this.props.onEditHost(value)
  }
}

class App extends Component {
  constructor() {
    super()
    this.DB_PREFIX = 'AWESOME_HOST_'
    this.state = {
      notice: {
        type: 'error',
        content: '',
        active: false
      }
    }
  }

  componentDidMount() {
    const categories = this.getData('categories')
    const hosts = this.getData('hosts')
    const enabled = this.getData('enabled')
    const selected = this.getData('selected')

    if (typeof enabled === 'boolean') {
      this.props.dispatch(getEnable(enabled))
    }
    if (categories) {
      this.props.dispatch(getCategories(categories))
    }
    if (hosts) {
      this.props.dispatch(getHosts(hosts))
      setTimeout(() => {
        if (selected) {
          this.handleLoadHost(selected)
        } else {
          this.loadAllHost(categories, hosts)
        }
      }, 500)
    }
  }
  componentDidUpdate() {
    this.saveData('categories')
    this.saveData('hosts')
    this.saveData('enabled')
  }

  notice(type, content) {
    this.setState({
      notice: {
        type,
        content,
        active: true
      }
    })
    setTimeout(() => {
      this.setState({
        notice: {
          type: 'error',
          content: '',
          active: false
        }
      })
    }, 3000)
  }
  render() {
    const {
      dispatch,
      categories,
      enabled,
      selected,
      content,
      hosts
    } = this.props

    return (
      <div className="columns is-mobile is-gapless">
        <div className="column is-narrow">
          <ul className="menu-list cat-operate">
            <CategoryCtrl
              onRemove={name => {
                this.removeCategory(selected)
              }}
              onAdd={name => {
                this.addCategory(name)
              }}
            />
          </ul>
          <aside className="menu hero is-fullheight" style={{ width: '200px' }}>
            <ul
              className={`menu-list ${enabled ? '' : 'disabled'}`}
              style={{ height: '353px', overflow: 'auto' }}
            >
              <AllHosts
                enabled={enabled}
                onToggleEnableAll={() => {
                  this.onToggleEnableAll()
                }}
                onLoadAllHosts={() => {
                  this.loadAllHost(categories, hosts)
                }}
              />

              {categories.map((category, index) => (
                <Item
                  {...category}
                  key={index}
                  selected={selected}
                  onLoadHost={id => this.handleLoadHost(id)}
                  onEdit={(id, name) => {
                    this.editCategory(id, name)
                  }}
                  onToggle={id => {
                    this.toggleEnable(id)
                  }}
                />
              ))}

              <li className="error-msg">
                <Message notice={this.state.notice} />
              </li>
            </ul>
          </aside>
        </div>
        <div className="column">
          <div className="main hero is-fullheight">
            <HostCtrl
              onCopy={() => {
                this.copyHost()
              }}
              onSave={() => {
                this.saveHost(selected, content)
              }}
            />
            <ShowHost
              ref="hostContent"
              selected={selected}
              content={content}
              onEditHost={content => {
                this.editHost(content)
              }}
            />
          </div>
        </div>
      </div>
    )
  }
  // storage
  saveData(key, value) {
    localStorage.setItem(
      `${this.DB_PREFIX}${key}`,
      value || JSON.stringify(this.props[key])
    )
  }
  getData(key) {
    const value = localStorage.getItem(`${this.DB_PREFIX}${key}`)
    try {
      return JSON.parse(value)
    } catch (err) {
      return value
    }
  }

  // category
  getCategoryMap(categories) {
    return categories.reduce(function(map, category) {
      map[category.id] = {
        name: category.name,
        enabled: category.enabled
      }
      return map
    }, {})
  }
  updateProxy() {
    setTimeout(() => {
      const content = this.getHostContent(this.props.hosts)
      if (this.props.enabled) {
        setProxy(content)
      } else {
        clearProxy()
      }
    }, 500)
  }
  onToggleEnableAll() {
    this.props.dispatch(toggleEnableAll(this.props.enabled))
    this.updateProxy()
  }
  toggleEnable(id) {
    this.props.dispatch(toggleEnableCategory(id))
    this.updateProxy()
  }
  editCategory(id, name) {
    this.props.dispatch(editCategory(id, name))
  }
  addCategory(name) {
    this.props.dispatch(addCategory(name))
  }
  markNextSelected(id) {
    const categories = this.props.categories
    const idx = categories.findIndex(category => category.id === id)

    if (categories[idx + 1]) {
      this.props.dispatch(markSelected(categories[idx + 1].id))
    }
  }
  removeCategory(id) {
    if (!id) {
      this.notice('error', 'Select a group to remove.')
    } else {
      this.markNextSelected(id)
      this.props.dispatch(removeCategory(id))
      this.props.dispatch(removeHostByCid(id))
      this.updateProxy()
    }
  }

  // host
  loadAllHost(categories, hosts) {
    const cMap = this.getCategoryMap(categories)
    let content = ''

    hosts.forEach(h => {
      if (cMap[h.cid] && cMap[h.cid].enabled) {
        content += `# ${cMap[h.cid].name}\n${h.content}\n`
      }
    })
    this.props.dispatch(markSelected(null))
    this.props.dispatch(updateContent(content))

    this.saveData('selected', null)
  }
  getHostContent(hosts) {
    let result = ''
    const cMap = this.getCategoryMap(this.props.categories)

    hosts
      .filter(host => cMap[host.cid] && cMap[host.cid].enabled)
      .forEach(host => (result += host.content))

    return result
  }
  handleLoadHost(id) {
    const hosts = this.props.hosts.filter(host => host.cid === id)
    const content = hosts.length > 0 ? hosts[0].content : ''

    this.props.dispatch(markSelected(id))
    this.props.dispatch(updateContent(content))

    this.saveData('selected', id)

    this.focusTextarea()
  }
  focusTextarea() {
    this.refs.hostContent.refs.textarea.focus()
  }
  editHost(content) {
    this.props.dispatch(updateContent(content))
  }
  saveHost(selected, content) {
    if (!selected) {
      this.notice('error', 'Selected a group first.')
    }
    let error = this.validate(content)
    if (error) {
      this.notice('error', error)
    } else {
      this.props.dispatch(saveHost(selected, content))
      this.props.dispatch(updateContent(content))
      this.updateProxy()
    }
  }
  removeComment(content) {
    return content.replace(/#.+/gm, '')
  }
  validate(value) {
    const rules = removeComment(value.trim()).split('\n')
    let error = null

    rules.forEach(rule => {
      let r = rule.split(/\s+/)
      if (r.length < 2) return
      if (isProxy(r[0])) return
      if (r[0].indexOf(':') > 0) return

      if (!isIP(r[0])) {
        error = 'ip address is not valid.'
      }
      r.shift()
      if (r.length) {
        r.filter(h => h.trim() !== '').forEach(h => {
          if (!isDomain(h)) {
            error = `host name[${r}] maybe not valid.`
          }
        })
      }
    })
    return error
  }
  copyHost() {
    this.notice('info', 'Host content is copied.')
    this.copy(this.refs.hostContent.refs.textarea.value)
  }
  copy(text) {
    const executeCopy = function(text) {
      let input = document.createElement('textarea')
      document.body.appendChild(input)
      input.value = text
      input.focus()
      input.select()
      document.execCommand('Copy')
      input.remove()
    }
    const setCopy = function(html) {
      let doc = new DOMParser().parseFromString(html, 'text/html')
      let text = doc.body.textContent
      return executeCopy(text)
    }
    setCopy(text)
  }
}

class HostCtrl extends Component {
  render() {
    return (
      <ul className="menu-list cat-operate">
        <li className="nohover">
          <div className="is-clearfix control" onDoubleClick={() => this.copy()}>
            <div
              className="is-pulled-left"
              onClick={() => {
                this.save()
              }}
            >
              <Icon name="save" />
            </div>
            <div className="is-pulled-right">
              <a href="options.html" target="_blank" style={{ padding: 0 }}>
                <Icon name="cog" />
              </a>
            </div>
          </div>
        </li>
      </ul>
    )
  }
  save() {
    this.props.onSave()
  }
  copy() {
    this.props.onCopy()
  }
}

function select(state) {
  return {
    selected: state.selected,
    enabled: state.enabled,
    hosts: state.hosts,
    content: state.content,
    notice: state.notice,
    categories: state.categories
  }
}

export default connect(select)(App)
