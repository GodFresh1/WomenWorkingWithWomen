'use strict';


describe('Home Page', function() {

  beforeEach(function() {
    browser.get('http://localhost:3000');
    browser.sleep(3000);
  });

  it('should redirect to the About Story page when Learn More is clicked', function() {
    element(by.id('learnmorebutton')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/about/story');
  });

  it('should redirect to the Attendee Information page when More Information is clicked', function() {
    element(by.id('eventinfolink')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/events/conferenceinformation');
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

describe('Log in functionality', function() {
  beforeEach(function() {
    browser.get('http://localhost:3000/login');
    browser.sleep(6000);
    browser.waitForAngular();
  });

  it('should successfully login user as admin', function() {
    element(by.name('email')).sendKeys('admin@admin.com');
    element(by.name('password')).sendKeys('admin');
    element(by.id('loginbutton')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/');
    expect(element(by.id('admindashlink')).isPresent()).toBe(true);
  });

  it('should fail when trying to login with incorrect credentials', function() {
    element(by.name('email')).sendKeys('test@admin.com');
    element(by.name('password')).sendKeys('admin');
    element(by.id('loginbutton')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/login');
  });
});

describe('About Page', function() {

  beforeAll(function() {
    browser.get('http://localhost:3000/about/story');
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

describe('Services Page', function() {

  beforeEach(function() {
    browser.get('http://localhost:3000/services/professional');
  });

  it('should redirect to Community page', function() {
    element(by.id('personallink')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/services/community');
  });
});

describe('Gallery Page', function() {

  beforeEach(function() {
    browser.get('http://localhost:3000/gallery');
  });

  it('should load the images', function() {
    expect(element(by.id('gallery')).isPresent()).toBe(true);
  });
});

describe('Events Page', function() {

  beforeAll(function() {
    browser.get('http://localhost:3000/events/upcomingevents');
  });

  it('should be able to click on the flyers for more information', function() {
    element(by.id('eventinfopicture')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/events/conferenceinformation');
  });

  it('should redirect to Conference Information page', function() {
    browser.get('http://localhost:3000/events/upcomingevents');
    element(by.id('attendeeinfolink')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/events/conferenceinformation');

  it('should redirect to Attendee Information page', function() {
    element(by.id('attendeeinfolink')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/events/attendeeinformation');
  });

  it('should redirect to Vendor Information page', function() {
    element(by.id('vendorinfolink')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/events/vendorinformation');
  });

  it('should redirect to Vendor Information page', function() {
    element(by.id('vendorinfolink')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/events/vendorinformation');
  });

  it('should be able register as attendee', function() {
    element(by.id('attendeeregistrationlink')).click();
    expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/events/attendeeregistration');
    //Click on event, populate fields, click to register

    element(by.model('attendee.eventAttending')).click();
    element.all(by.repeater('event in events')).get(0).click();

    element(by.id('firstName')).sendKeys('John');
    element(by.id('lastName')).sendKeys('Doe');
    element(by.id('email')).sendKeys('johndoe@test.com');
    element(by.id('phone')).sendKeys('123456789');
    element(by.id('age')).sendKeys('21');
    element(by.id('submitbutton')).click();
    //Check if toast is present
  });

  it('should be able register as vendor', function() {
    browser.get('http://localhost:3000/events/vendorregistration');
    //Click on event, populate fields, click to register

    element(by.model('vendor.eventAttending')).click();
    element.all(by.repeater('event in events')).get(0).click();

    element(by.id('jobTitle')).sendKeys('Person');
    element(by.id('firstName')).sendKeys('John');
    element(by.id('lastName')).sendKeys('Doe');
    element(by.id('email')).sendKeys('johndoe@test.com');
    element(by.id('phone')).sendKeys('123456789');
    element(by.id('organizationName')).sendKeys('John Doe Organization');
    element(by.id('organizationAddress')).sendKeys('123 Cherry Lane');
    element(by.model('vendor.descriptionOfServices')).sendKeys('Test Description');
    element(by.model('vendor.descriptionOfPrizes')).sendKeys('Test Prizes');
    element(by.id('submitbutton')).click();
    //Check if toast is present
  });
});


describe('Donations Page', function() {

  beforeEach(function() {
    browser.get('http://localhost:3000/donations');
  });

  it('should be able to donate', function() {
    //Populate fields and click to donate
    element(by.model('donation.amount')).sendKeys('10.00');
    element(by.id('first_name')).sendKeys('John');
    element(by.id('last_name')).sendKeys('Doe');
    element(by.id('email')).sendKeys('johndoe@test.com');
    element(by.id('submitbutton')).click();
    //Check that a toast is present?
    //Check database?
  });
});

describe('Contact Us Page', function() {

  beforeEach(function() {
    browser.get('http://localhost:3000/contact_us');
  });

  it('should be able to contact', function() {
    //Populate fields and click to contact
    element(by.id('firstName')).sendKeys('John');
    element(by.id('lastName')).sendKeys('Doe');
    element(by.id('email')).sendKeys('johndoe@test.com');
    element(by.id('organization')).sendKeys('Test Subject');
    //Check that a toast is present?
  });
});

describe('Take Action Page', function() {

  beforeEach(function() {
    browser.get('http://localhost:3000/take_action/volunteer');
  });

  it('should be able to register to volunteer', function() {
    //Populate fields and click to sign up to volunteer

    element(by.model('volunteer.eventAttending')).click();
    element.all(by.repeater('event in events')).get(0).click();

    element(by.id('firstName')).sendKeys('John');
    element(by.id('lastName')).sendKeys('Doe');
    element(by.id('email')).sendKeys('johndoe@test.com');
    element(by.id('phone')).sendKeys('123456789');
    element(by.id('age')).sendKeys('21');
    element(by.id('submitbutton')).click();
    //Check that a toast is present?
    //Check database?
  });
});

describe('Admin Dashboard Page', function() {

  beforeAll(function() {
    //Login as an admin
    browser.get('http://localhost:3000/login');
    browser.sleep(6000);
    browser.waitForAngular();
    element(by.name('email')).sendKeys('admin@admin.com');
    element(by.name('password')).sendKeys('admin');
    element(by.id('loginbutton')).click();
    browser.sleep(3000);
    browser.get('http://localhost:3000/admin_dash');
  });

  it('should be able to see more details', function() {
    //Click on button
    element(by.id('showdetailsbutton')).click();
    //Check that attendees, volunteers, vendors is available
  });

  it('should be able to create an event', function() {
    //Click on button
    element(by.id('createeventbutton')).click();
    //Add information

    element(by.id('title')).sendKeys('Event Title');
    element(by.id('start')).sendKeys('11111111');
    element(by.id('end')).sendKeys('11111111');
    element(by.id('location')).sendKeys('Event Location');
    element(by.id('description')).sendKeys('Event Description');
    element(by.id('submitbutton')).click();
    //Check that it is present in list
    expect(element.all(by.repeater('event in events')).get(0).isPresent()).toBe(true);
  });

  it('should be able to edit an event', function() {
    //Click on button
    element(by.id('editeventbutton')).click();
    //Edit information

    element(by.id('title')).sendKeys('Event Title');
    element(by.id('start')).sendKeys('11111111');
    element(by.id('end')).sendKeys('11111111');
    element(by.id('location')).sendKeys('Event Location');
    element(by.id('description')).sendKeys('Event Description');
    element(by.id('submitbutton')).click();
    //Check that it is present in list
    expect(element.all(by.repeater('event in events')).get(0).isPresent()).toBe(true);
  });

  it('should be able to export information', function() {
    //Click on button
    element(by.id('excel-btn1')).click();
    element(by.id('excel-btn2')).click();
    element(by.id('excel-btn3')).click();
    //Somehow check??
  });

  it('should be able to delete an event', function() {
    //Click on button
    element(by.id('deleteeventbutton')).click();
    //Check that it is not present in list
    expect(element.all(by.repeater('event in events')).get(0).isPresent()).toBe(true);
  });
});
