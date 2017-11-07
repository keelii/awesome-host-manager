import { combineReducers } from 'redux'

function generateId(len) {
  var arr = new Uint8Array((len || 40) / 2)

  function byteToHex(byte) {
    return ('0' + byte.toString(16)).slice(-2)
  }

  window.crypto.getRandomValues(arr)
  return [].map.call(arr, byteToHex).join('')
}

function enabled(state = true, action) {
  switch (action.type) {
    case 'GET_ENABLE':
      return action.enabled
    case 'TOGGLE_ENABLE_ALL':
      return !action.enabled
    default:
      return state
  }
}
function selected(state = null, action) {
  switch (action.type) {
    case 'MARK_SELECTED':
      return action.id
    default:
      return state
  }
}
function content(state = '', action) {
  switch (action.type) {
    case 'LOAD_HOST':
      return action.content
    case 'UPDATE_CONTENT':
      return action.content
    default:
      return ''
  }
}
function hosts(state = [], action) {
  switch (action.type) {
    case 'REMOVE_HOST_BY_CID':
      return state.filter(h => h.cid !== action.id)
    case 'SAVE_HOST':
      if (!state.find(s => s.cid === action.cid)) {
        return [
          ...state,
          {
            cid: action.cid,
            content: action.content
          }
        ]
      } else {
        return state.map(s => {
          let host = Object.assign({}, s)
          if (host.cid === action.cid) {
            host.content = action.content
          }
          return host
        })
      }
    case 'GET_HOSTS':
      return action.hosts.slice()
    case 'TOGGLE_ENABLE_HOST':
      return []
    default:
      return state
  }
}
function categories(state = [], action) {
  switch (action.type) {
    case 'GET_CATEGORIES':
      return action.categories.slice()
    case 'REMOVE_CATEGORY':
      return state.filter(s => s.id !== action.id)
    case 'ADD_CATEGORY':
      return [
        ...state,
        {
          name: action.name,
          id: generateId(10),
          enabled: false
        }
      ]
    case 'TOGGLE_ENABLE_CATEGORY':
      return state.map(s => {
        let category = Object.assign({}, s)
        if (category.id === action.id) {
          category.enabled = !category.enabled
        }
        return category
      })
    case 'EDIT_CATEGORY':
      return state.map(s => {
        let category = Object.assign({}, s)
        if (category.id === action.id) {
          category.name = action.name
        }
        return category
      })
    default:
      return state
  }
}

const hostApp = combineReducers({
  enabled,
  selected,
  hosts,
  content,
  categories
})

export default hostApp
