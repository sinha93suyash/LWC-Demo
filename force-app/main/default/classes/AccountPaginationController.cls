public with sharing class AccountPaginationController {
    @AuraEnabled
    public static list<Account> AccountPaginationControllerMthod() {
        return [select Id , Name from Account];
    }
}