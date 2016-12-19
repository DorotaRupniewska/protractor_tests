describe('WebApp', function() {
  
  beforeEach(function() {
  });

  it('should have a title', function() {
    browser.get('https://shop.sf-dev1.com/de-de/products');
    expect(browser.getTitle()).toEqual('Shop - smartfrog.com');
  });

  it('should load orders list', function(){
  	browser.get("https://webapp.sf-dev1.com/de-de/account/orders");
  	var ordersRows = element.all(by.repeater('order in vm.ordersList'));
  	expect(ordersRows).toEqual(2);
  })


});