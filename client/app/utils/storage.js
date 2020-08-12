export function getKeyFromStorage(key) {
  if (!key) {
    return null;
  }
  try {
    const valueStr = localStorage.getItem(key);
    if (valueStr) {
      return JSON.parse(valueStr);
    }
    return null;
  } catch (error) {
    return null;
  }
}

export function setKeyToStorage(key, obj) {
  if (!key) {
    console.log("Key is Missing");
  }

  try {
    localStorage.setItem(key, JSON.stringify(obj));
  } catch (error) {
    console.log(error);
  }
}

export function clearStorage() {
  localStorage.clear();
}
