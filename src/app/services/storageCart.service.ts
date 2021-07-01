import {
  Injectable
} from '@angular/core';
import {
  Storage
} from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root'
})
export class StorageCartService {

  constructor(private storage: Storage) {
  
  this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this.storage = storage;
  }
  
 async getCart(){
    return await this.storage.get('cart');
  }

  setItem(itemName, itemValue) {
    this.storage.set("itemName", "itemValue");
  }
  removeItem(itemname) {
    this.storage.remove(itemname);
  }

  updateLocalStorage(itemName,itemValue){
    console.log(itemName,itemValue);
    this.removeItem(itemName);
    this.setItem(itemName,itemValue);
  }
}
