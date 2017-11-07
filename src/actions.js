export function getEnable(enabled) {
  return { type: 'GET_ENABLE', enabled }
}

export function toggleEnableAll(enabled) {
  return { type: 'TOGGLE_ENABLE_ALL', enabled }
}

export function addCategory(name) {
  return { type: 'ADD_CATEGORY', name }
}
export function removeCategory(id) {
  return { type: 'REMOVE_CATEGORY', id }
}

export function toggleEnableCategory(id) {
  return { type: 'TOGGLE_ENABLE_CATEGORY', id }
}

export function editCategory(id, name) {
  return { type: 'EDIT_CATEGORY', id, name }
}

export function saveHost(cid, content) {
  return { type: 'SAVE_HOST', cid, content }
}
export function removeHostByCid(id) {
  return { type: 'REMOVE_HOST_BY_CID', id }
}

export function updateContent(content) {
  return { type: 'UPDATE_CONTENT', content }
}

export function markSelected(id) {
  return { type: 'MARK_SELECTED', id }
}

export function getCategories(categories) {
  return { type: 'GET_CATEGORIES', categories }
}
export function getHosts(hosts) {
  return { type: 'GET_HOSTS', hosts }
}
