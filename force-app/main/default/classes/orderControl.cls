public with sharing class orderControl {
    public orderControl() {}

    @AuraEnabled(cacheable=true)
    public static void addOrder(Integer quan,String prod,Integer price){
        OrderItem ob=new OrderItem(Quantity=quan,Product2Id=prod,UnitPrice=price);
        insert ob;
    }

    @AuraEnabled(cacheable=true)
    public static List<Order> getalldata(){
        System.debug('hiii');
        List<Order> l=[SELECT Id,Order_Status__c,Name,TotalAmount,Status,AccountId,EffectiveDate,Description,(SELECT Id,TotalPrice,PricebookEntryId,Product_Code__c,Stock_Quantity__c,UnitPrice, Quantity, OrderId,Product_Name__c FROM OrderItems) FROM Order];
      
        return l;
    

    }
    @AuraEnabled(cacheable=true)
    public static List<Order> getonedata(String x){
        System.debug('hiii');
        List<Order> l=[SELECT Id,ContractId,Order_Status__c,Name,TotalAmount,Status,AccountId,EffectiveDate,Description,(SELECT Id,Quantity,TotalPrice,PricebookEntryId,Product_Code__c,Stock_Quantity__c,UnitPrice, Quantity__c, OrderId,Product_Name__c FROM OrderItems ) FROM Order where Id=:x];
      
        return l;
    

    }
    @AuraEnabled(cacheable=true)
    public static List<OrderItem> getallodata(){
        List<OrderItem> k=[SELECT 	 Id,OrderId,Product_Code__c,Product_Name__c,Quantity__c,Quantity,Stock_Quantity__c,UnitPrice,TotalPrice,PricebookEntryId,Amount__c FROM OrderItem];
        return k;
    

    }
    @AuraEnabled(cacheable=true)
    public static void del(Integer a){
        
        List<OrderItem> x=[SELECT 	Id FROM OrderItem];
        delete x[a];
    

    }
    @AuraEnabled
    public static List<Order> submitForApproval(Id o)
    {
        // Create an approval request for the Opportunity
       
        System.debug('opp'+o);
        System.debug('hiii'+o);
        List<Order> x=new List<Order>();
        x=[select Id,Order_Status__c,TotalAmount from Order where Id=:o];
        System.debug(x[0].TotalAmount);
        if(x[0].TotalAmount>100000){

        Approval.ProcessSubmitRequest req1 = new Approval.ProcessSubmitRequest();
        req1.setComments('Submitting request for approval automatically using Trigger');
    
        req1.setObjectId(o);
        
        
        

        // Submit the approval request for the Opportunity
        Approval.ProcessResult result = Approval.process(req1);
        System.debug('submiteed for approval'+result.isSuccess()+o);
     

        }
        else{
            for (Order record : x)
            {
                record.Order_Status__c = 'Confirmed';
            }
            update x;
           
        }
 
        return x;
    }

   
   
    @AuraEnabled(cacheable=true)
    public static list<PricebookEntry> getOrderList(string searchKey) {
        string sTempSearchKey = '%' + searchKey + '%';
		
       // create contact list to store search result 
        list<PricebookEntry> odr = new list<PricebookEntry>();
     
	   // query contact records
        for(PricebookEntry oCon : [Select UnitPrice,Brand__c,PBName__c,Id,Pricebook2Id,Product_Name__c,ProductCode
                            From PricebookEntry
                            WHERE Product_Name__c LIKE : sTempSearchKey]){
           odr.add(oCon);
        }
		
       //If there are no records found with searchKey then, throw aura exception with a message
         if(odr.size() == 0){
            throw new AuraHandledException('No Record Found..'); 
         }
         
        return odr;
    }
    @AuraEnabled(cacheable=true)
    public static list<PricebookEntry> getpb() {
       
        list<PricebookEntry> odr = [Select UnitPrice,Brand__c,PBName__c,Id,Pricebook2Id,Product_Name__c,ProductCode
        From PricebookEntry
    ];
     
	   // query contact records
         
           return odr;
        
       //If there are no records found with searchKey then, throw aura exception with a message
         
    }
    @AuraEnabled(cacheable=true)
    public static list<PricebookEntry> getOrdermList(Integer searchey) {
        
		
       // create contact list to store search result 
        list<PricebookEntry> odr = new list<PricebookEntry>();
     
	   // query contact records
        for(PricebookEntry oCon : [Select UnitPrice,Brand__c,PBName__c,Id,Pricebook2Id,Product_Name__c,ProductCode
                            From PricebookEntry
                            WHERE  UnitPrice =:searchey]){
           odr.add(oCon);
        }
		
       //If there are no records found with searchKey then, throw aura exception with a message
         if(odr.size() == 0){
            throw new AuraHandledException('No Record Found..'); 
         }
         
        return odr;
    }
    @AuraEnabled(cacheable=true)
    public static list<PricebookEntry> getOrder1List(string searchst) {
        string sTempKey = '%' + searchst + '%';
		
       // create contact list to store search result 
        list<PricebookEntry> od = new list<PricebookEntry>();
     
	   // query contact records
        for(PricebookEntry o : [Select UnitPrice,Brand__c,PBName__c,Id,Pricebook2Id,Product_Name__c,ProductCode
        From PricebookEntry
        WHERE Brand__c LIKE : sTempKey]){
           od.add(o);
        }
		
       //If there are no records found with searchKey then, throw aura exception with a message
         if(od.size() == 0){
            throw new AuraHandledException('No Record Found..'); 
         }
         
        return od;
    }
    
}
