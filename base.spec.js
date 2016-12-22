describe('WebApp', function() {
  
  beforeEach(function() {
  });

  it('should have a title', function() {
    browser.get('https://shop.sf-dev1.com/de-de/products');
    expect(browser.getTitle()).toEqual('Shop - smartfrog.com');
  });

});