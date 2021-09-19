import { makeAutoObservable, runInAction } from "mobx";

class LanguageStore {
  language = "ar";

  constructor() {
    makeAutoObservable(this);
  }

  setLanguage = (language) => {
    this.language = language;
  };
}
const languageStore = new LanguageStore();
// languageStore.fetchInvoices();
export default languageStore;
