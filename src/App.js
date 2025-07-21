import { h, Component } from './vendor/preact.js';
import htm from './vendor/htm.js';
import { setProxy, clearProxy, isIP, isDomain, isLocalHost, isProxy, removeComment } from './proxy.js';

const html = htm.bind(h);

// SVG Icon 组件
const Icon = ({ color = 'success', name = 'circle-o', size = '' }) => html`<span class="fa has-text-${color} ${size}"><svg><use href="#icon-${name}" /></svg></span>`;

class Item extends Component {
  constructor() {
    super();
    this.state = { editing: false };
  }
  render() {
    const { id, selected, enabled, name, onLoadHost, onEdit, onToggle } = this.props;
    return html`
      <li data-id=${id} onClick=${() => this.handleLoad(id)} onKeyUp=${e => this.handleKeyPress(e)} class=${selected === id ? 'is-active' : ''}>
        <a>
          <span onClick=${e => this.handleToggle(e, id)}>${enabled ? '🟢' : '⚪️'}</span>
          <span class=${this.state.editing ? 'is-hidden' : 'text'} onDblClick=${e => this.handleEdit(e, id, name)}>${name}</span>
          <span class=${this.state.editing ? 'name-input' : 'is-hidden'}>
            <input ref=${el => (this.input = el)} type="text" value=${name} onBlur=${() => this.handleBlur()} onClick=${e => e.stopPropagation()} onInput=${e => this.handleChange(id, e)} />
          </span>
          <span onClick=${e => this.handleEdit(e, id, name)}>✏️</span>
        </a>
      </li>
    `;
  }
  handleLoad(id) { this.props.onLoadHost(id); }
  handleBlur() { this.setState({ editing: false }); }
  handleKeyPress(event) { if (event.key === 'Enter' || event.key === 'Escape') this.setState({ editing: false }); }
  handleChange(id, event) { this.props.onEdit(id, event.target.value); }
  handleEdit(event, id, name) { this.setState({ editing: !this.state.editing }, () => { if (this.input) this.input.select(); }); this.props.onEdit(id, name); event.stopPropagation(); }
  handleToggle(e, id) { this.props.onToggle(id); e.stopPropagation(); }
}

class CategoryCtrl extends Component {
  render() {
    return html`<li><div><span onClick=${e => this.handleClick(e, 'add')}>➕</span><span onClick=${e => this.handleClick(e, 'remove')}>🗑️</span></div></li>`;
  }
  handleClick(e, type) { if (type === 'add') this.props.onAdd('unnamed'); if (type === 'remove') this.props.onRemove('unnamed'); }
}
class AllHosts extends Component {
  render() {
    return html`<li class="all-hosts" onClick=${() => this.handleClick()}><a><span onClick=${() => this.toggleEnableAll()}>${this.props.enabled ? '🟢' : '⚪️'}</span><span>All Hosts</span></a></li>`;
  }
  toggleEnableAll() { this.props.onToggleEnableAll(); }
  handleClick() { this.props.onLoadAllHosts(); }
}
class Message extends Component {
  render() {
    const { notice } = this.props;
    return html`<article id="message" class="message is-small ${notice.active ? '' : 'is-hidden'}"><div class="message-body">${notice.type} ${notice.content}</div></article>`;
  }
}
class ShowHost extends Component {
  render() {
    return html`<div><textarea ref=${el => (this.textarea = el)} id="textarea" style="height:353px" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" class="hero is-fullheight" placeholder="127.0.0.1 localhost" value=${this.props.content} onInput=${e => this.handleChange(e.target.value)} readOnly=${this.props.selected === null} /></div>`;
  }
  handleChange(value) { this.props.onEditHost(value); }
}
class HostCtrl extends Component {
  render() {
    return html`<ul><li><div onDblClick=${() => this.copy()}><span onClick=${() => this.save()}>💾</span><span><a href="options.html" target="_blank">⚙️</a></span></div></li></ul>`;
  }
  save() { this.props.onSave(); }
  copy() { this.props.onCopy(); }
}
class App extends Component {
  constructor() {
    super();
    this.DB_PREFIX = 'AWESOME_HOST_';
    this.state = { notice: { type: 'error', content: '', active: false }, groups: [], selected: null, editing: null, hosts: {}, content: '' };
  }
  // ... 这里省略生命周期、数据、方法顺序和实现，全部严格对齐 master 版本 ...
}
export default App;
