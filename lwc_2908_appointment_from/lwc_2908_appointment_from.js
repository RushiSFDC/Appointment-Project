import { LightningElement,track } from 'lwc';
import getContact from '@salesforce/apex/CL_2508_DisplayContact.getContact'
import { createRecord } from 'lightning/uiRecordApi'; //step-1 Import CreateRecord
import checkDateAvailability from '@salesforce/apex/CL_2908_ApexController.checkDateAvailability';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';


export default class Lwc_2908_appointment_from extends NavigationMixin(LightningElement) {

@track selectedContactId;
@track availableDates = [];
@track isDateAvailable;
       subject;
       description;

checkAvailability(event) {
    checkDateAvailability({ selectedDate:this.handleDate})
        .then(result => {
            if(result==true)
            {
                this.isDateAvailable = result;
                this.isDateAvailable='Selected Date is Available';
            }
            else
            {
                this.isDateAvailable='Selected Date is not Available';
            }
        })
        .catch(error => {
            console.error('Error checking date availability', error);
        });
}

BookAppointment(event)
{
    // step-2 Create The Field Mapping 
    const fields={'Appointment_Date__c':this.handleDate, 'Contact__c':this.selectedContactId, 
    'Subject__c':this.subject, 'Description__c':this.description
                 }

    //Step-3 Create Api Record 

    const recordData={apiName:'Appointment_Detail__c',fields};

                 createRecord(recordData).then(response=>{
                this.ConId = response.id;
                const evt = new ShowToastEvent({
                title: 'Success - Appointment',
                message: 'Appointment Record Created Sucessfully'+ this.ConId,
                variant: 'success',
         });
             this.dispatchEvent(evt);

        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.ConId ,
                objectApiName: 'Appointment_Detail__c',
                actionName: 'view'
            },
        });
                 }).catch(error=>{
                    alert('Not Created Successfully');
                 });
}

handleDateTimeChange(event)
{
    this.handleDate=event.target.value;
    //this.formattedDate =  this.handleDate.split('T')[0]
}

handleSubjectChange(event)
{
    this.subject=event.target.value;
}

handleDescriptionChange(event)
{
    this.description=event.target.value;
}

myLookupHandle(event){
    console.log(event.detail);
    this.selectedContactId = event.detail;
}
}
