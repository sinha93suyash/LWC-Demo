public with sharing class AccountCtrl {
    @AuraEnabled
    public static Id AccountCtrl(Account  acc) {
        insert acc;
        return acc.Id;
    }
    @AuraEnabled(cacheable = true)
    public static List<Account> returnAccount(String accName){
        try {
            return [SELECT Id, Name, Industry, Phone, Rating FROM Account WHERE Name LIKE :('%' + accName + '%')];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled(cacheable = true)
    public static List<pricebookEntry> getProduct(String searchKey){
        try {
            return [
        SELECT Id,
               UnitPrice,
               Product2.Id,
               Product2.Name,
               Product2.ProductCode,
               Product2.Family
        FROM PricebookEntry
        WHERE Pricebook2.IsStandard = true
        AND IsActive = true
        AND Product2.IsActive = true
        AND Product2.Name LIKE :('%' + searchKey + '%')
        LIMIT 20
    ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

     public class QuoteLineWrapper {
        @AuraEnabled public Id pricebookEntryId;
        @AuraEnabled public Integer quantity;
        @AuraEnabled public Decimal unitPrice;
    }

    @AuraEnabled
public static Id saveQuote(List<QuoteLineItem> products) {

    try {
        Quote q = new Quote();
        q.Name = 'Test Quote';
        insert q;
        

        List<QuoteLineItem> quoteLines = new List<QuoteLineItem>();

        for (QuoteLineItem product : products) {

            QuoteLineItem qli = new QuoteLineItem();

            qli.QuoteId = q.Id;
            System.debug('PricebookEntryId: ' + qli.PricebookEntryId);
            qli.PricebookEntryId = product.PricebookEntryId;
            
            qli.Quantity = product.Quantity;
            qli.UnitPrice = product.UnitPrice;

            quoteLines.add(qli);
        }

        insert quoteLines;

        return q.Id;

    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
}
}
            




    
