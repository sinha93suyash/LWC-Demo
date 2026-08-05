public with sharing class accountController {
    @AuraEnabled(cacheable=true )
    public static List<Account> getAccountList(String type){
        return [select Id,Type,Name,Industry from Account where Type =: type];
    }

    /*  @AuraEnabled(cacheable=true )
    public static List<Account> getAccountListByName(String Name){
        return [select Id,Type,Name,Industry from Account where Name =: Name];
    } */

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountListByName(String name){

        System.debug('Search Name: ' + name);

        if(String.isBlank(name)){
            return new List<Account>();
        }

        return [
            SELECT Id, Name, Industry
            FROM Account
            WHERE Name LIKE :('%' + name + '%')
            LIMIT 10
        ];
    }
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountByIndustry(String indKey){
        String key = '%' + indKey + '%';
        return [select Id, Type, Name, Industry from Account where Industry like : key];
    }

    @AuraEnabled(cacheable = true)
    public static Id createQuote(Id accid){
        try {

            Quote q = new Quote();
            q.Name = 'Test suyash Project LWC';

            insert q;
            return q.id;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}