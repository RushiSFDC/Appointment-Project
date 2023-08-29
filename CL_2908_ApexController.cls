public with sharing class CL_2908_ApexController {

@AuraEnabled(cacheable=TRUE)
public static List<Contact> getCustomLookupContact (String conName){
List<Contact> conLookupList =  NEW List<Contact>();
 
 IF(conName != ''){
    String contactName = '%' + conName + '%';
    conLookupList = [SELECT Id, LastName FROM Contact WHERE LastName LIKE:contactName];
    RETURN conLookupList;
 }
   RETURN conLookupList;
 }   

@AuraEnabled(cacheable=true)
 public static  Boolean checkDateAvailability( date selectedDate) {

    List<Appointment_Slot__c> existingdate = [SELECT isActive__c,Appointment_Date__c FROM Appointment_Slot__c WHERE Appointment_Date__c = :selectedDate AND isActive__c=true LIMIT 1];
    
        
    if (!existingdate.isEmpty())
    {
        return true; // Date is available
    } 
    else 
    {
        return false; // Date is not available
    }
    }


}

