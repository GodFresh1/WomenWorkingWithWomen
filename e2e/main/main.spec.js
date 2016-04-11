'use strict';

describe('Home Page', function() {

  beforeEach(function() {
    browser.get('http://localhost:3000/');
  });

  afterEach(function() {

  });

  it('should redirect to the About Story page when Learn More is clicked', function() {
    element(by.id('learnmorebutton')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/about/story');
  });

  it('should redirect to the Attendee Information page when More Information is clicked', function() {
    element(by.id('eventinfolink')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/events/attendeeinformation');
  });

  it('should redirect to the About Story page when Learn More under About is clicked', function() {
    element(by.id('aboutlink')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/about/story');
  });

  it('should redirect to the About Testimonials page when Read more stories is clicked', function() {
    element(by.id('testimonialslink')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/about/testimonials');
  });
});

/*Log in is not working because of race conditions -- unsure how to fix*/
/*describe('Log in functionality', function() {
  beforeEach(function() {
    browser.get('http://localhost:3000/login');
    browser.sleep(6000);
    browser.waitForAngular();
  });

  afterEach(function() {

  });

  it('should successfully login user as admin', function() {
    browser.wait(function() {
      element(by.id('emaillogin')).isPresent().then(function () {
        element(by.name(emaillogin)).get(0).sendKeys('admin@admin.com');
      });
    });
    browser.wait(function() {
      element(by.id('passwordlogin')).isPresent().then(function () {
        element(by.name(passwordlogin)).get(0).sendKeys('admin');
      });
    });
    element(by.id('loginbutton')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/');
    expect(element(by.id('admindashlink')).isPresent()).toBe(true);
  });

  it('should successfully logout user as admin', function() {
    element(by.name(email)).sendKeys('admin@admin.com');
    element(by.name(password)).sendKeys('admin');
    element(by.id('loginbutton')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/');
    expect(element(by.id('admindashlink')).isPresent()).toBe(true);
    element(by.id('logoutbutton')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/');
    expect(element(by.id('admindashlink')).isPresent()).toBe(true);
  });

  it('should fail when trying to login with incorrect credentials', function() {
    element(by.name(email)).sendKeys('test@admin.com');
    element(by.name(password)).sendKeys('admin');
    element(by.id('loginbutton')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/login');
    browser.get('http://localhost:3000/');
    expect(element(by.id('admindashlink')).isPresent()).toBe(false);
  });
});*/


describe('About Page', function() {

  beforeEach(function() {
    browser.get('http://localhost:3000/about/story');
  });

  afterEach(function() {

  });

  it('should redirect to The Board page', function() {
    element(by.id('boardlink')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/about/board');
  });

  it('should redirect to the Partners page', function() {
    element(by.id('partnerslink')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/about/partners');
  });

  it('should redirect to the Testimonials page', function() {
    element(by.id('testimonialslink')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/about/testimonials');
  });
});

describe('About Page', function() {

  beforeEach(function() {
    browser.get('http://localhost:3000/services/professional');
  });

  afterEach(function() {

  });

  it('should redirect to Personal page', function() {
    element(by.id('personallink')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/services/personal');
  });
});

describe('Gallery Page', function() {

  beforeEach(function() {
    browser.get('http://localhost:3000/gallery');
  });

  afterEach(function() {

  });

  it('should load the images', function() {
  });

  it('should be able to click and share images', function() {
  });
});

describe('Events Page', function() {

  beforeEach(function() {
    browser.get('http://localhost:3000/events/upcomingevents');
  });

  afterEach(function() {

  });

  it('should be able to click on the flyers for more information', function() {
    element(by.id('eventinfopicture')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/events/attendeeinformation');
  });

  it('should redirect to Conference Information page', function() {
    element(by.id('attendeeinfolink')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/events/conferenceinformation');
  });

  it('should be able register as attendee', function() {
    element(by.id('attendeeregistrationlink')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/events/attendeeregistration');
    //Click on event, populate fields, click to register
    //Check if toast is present
  });

  it('should be able register as vendor', function() {
    element(by.id('vendorregistrationlink')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/events/vendorregistration');
    //Click on event, populate fields, click to register
    //Check if toast is present
  });
});

describe('Donations Page', function() {

  beforeEach(function() {
    browser.get('http://localhost:3000/donations');
  });

  afterEach(function() {

  });

  it('should be able to donate', function() {
    //Populate fields and click to donate
    //Check that a toast is present?
    //Check database?
  });
});

describe('Contact Us Page', function() {

  beforeEach(function() {
    browser.get('http://localhost:3000/contact_us');
  });

  afterEach(function() {

  });

  it('should be able to contact', function() {
    //Populate fields and click to contact
    //Check that a toast is present?
  });
});

describe('Take Action Page', function() {

  beforeEach(function() {
    browser.get('http://localhost:3000/take_action/volunteer/');
  });

  afterEach(function() {

  });

  it('should be able to register to volunteer', function() {
    //Populate fields and click to sign up to volunteer
    //Check that a toast is present?
    //Check database?
  });
});

describe('Admin Dashboard Page', function() {

  beforeEach(function() {
    //Login as an admin
    browser.get('http://localhost:3000/take_action/admin_dash/');
  });

  afterEach(function() {

  });

  it('should be able to see more details', function() {
    //Click on button
    //Check that attendees, volunteers, vendors is available
  });

  it('should be able to create an event', function() {
    //Click on button
    //Add information
    //Click to add event
    //Check that it is present in list
  });

  it('should be able to edit an event', function() {
    //Click on button
    //Edit information
    //Click to add event
    //Check that it is present in list
  });

  it('should be able to delete an event', function() {
    //Click on button
    //Check that it is not present in list
  });

  it('should be able to export information', function() {
    //Click on button
    //Somehow check??
  });
});