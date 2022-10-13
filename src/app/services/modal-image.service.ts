import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  private _hideModal: boolean = true;
  public type!: 'users' | 'doctors' | 'hospitals'; 
  public id!: string; 
  public img!: string | undefined; 

  public newImage: EventEmitter<string> = new EventEmitter<string>();
  
  get hideModal(){
    return this._hideModal;
  }

  openModal( type: 'users' | 'doctors' | 'hospitals', id: string, img?: string  ){
    this.type = type;
    this.id = id;
    this._hideModal = false;


    if(img?.includes('https')){
      this.img = img;
    }else if( this.img){
      this.img = `${base_url}/upload/${type}/${img}`
    } else {
      this.img = `${base_url}/upload/${type}/no-image`
    }
  }

  closeModal(){
    this._hideModal = true;
  }

  constructor() { }
}
