enum LocalAndSession {
  local,
  session,
}
class MyStorage {
  storage: Storage;
  constructor(type: LocalAndSession) {
    this.storage = type === LocalAndSession.local ? localStorage : sessionStorage;
  }
  get(key: string) {
    const value = this.storage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }
  set(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value));
  }
  remove(key: string) {
    this.storage.removeItem(key);
  }
  clear() {
    this.storage.clear();
  }
}

const myLocalStorage = new MyStorage(LocalAndSession.local);
const mySessionStorage = new MyStorage(LocalAndSession.session);

export { myLocalStorage, mySessionStorage };
