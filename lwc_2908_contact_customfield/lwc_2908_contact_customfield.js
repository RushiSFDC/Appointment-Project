import { LightningElement, track, wire } from 'lwc';
import getCustomLookupContact from '@salesforce/apex/CL_2908_ApexController.getCustomLookupContact';
 
export default class LwcAccountCustomLookup extends LightningElement {
 
 @track contactName='';
 @track contactList=[];
 @track objectApiName='Account';
 @track contactId;
 @track isShow=false;
 @track messageResult=false;
 @track isShowResult = true;
 @track showSearchedValues = false;
 @wire(getCustomLookupContact,{conName:'$contactName'})
 function ({error,data}){
     this.messageResult=false;
     if(data){  
         if(data.length>0 && this.isShowResult){
            this.contactList =data;
            this.showSearchedValues=true;
            this.messageResult=false;
         }
         else if(data.length == 0){
            this.contactList=[];
            this.showSearchedValues=false;
            if(this.contactName != ''){
               this.messageResult=true;
            }
         }
         else if(error){
             this.contactId='';
             this.contactName='';
             this.contactList=[];
             this.showSearchedValues=false;
             this.messageResult=true;
         }
 
     }
 }

 searchHandleClick(event){
  this.isShowResult = true;
  this.messageResult = false;
}
 
 
searchHandleKeyChange(event){
  this.messageResult=false;
  this.contactName = event.target.value;
}
 
parentHandleAction(event){        
    this.showSearchedValues = false;
    this.isShowResult = false;
    this.messageResult=false;
    this.contactId =  event.target.dataset.value;
    this.contactName =  event.target.dataset.label;        
    const selectedEvent = new CustomEvent('selected', { detail: this.contactId });
    this.dispatchEvent(selectedEvent);    
}
 
}