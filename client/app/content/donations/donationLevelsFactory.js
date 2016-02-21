angular.module('womenWorkingWithWomenApp')
  .factory('DonationLevels', function(){
    return [
      {
        "name": "DIAMOND",
        "image": "http://static1.squarespace.com/static/55668bf5e4b01b9595a550b0/t/55675542e4b08539e5000937/1432835398486/%241000+and+up?format=300w",
        "benefits": ["Company logo on all promotional material",
                    "Company logo featured on website",
                    "Opportunity to display company material at fundraisers",
                    "Invited to display promotional material at fundraisers"]
      },
      {
        "name": "RUBY",
        "image": "http://static1.squarespace.com/static/55668bf5e4b01b9595a550b0/t/55675d15e4b0622d21b1f697/1432837398161/?format=300w",
        "benefits": ["Company logo on all promotional information",
                    "Company logo featured on website",
                    "Recognition at fundraisers",
                    "Invited to display promotional material at fundraisers"]
      },
      {
        "name": "EMERALD",
        "image": "http://static1.squarespace.com/static/55668bf5e4b01b9595a550b0/t/55675d8ee4b08539e500431a/1432837518840/Geschliffener_blauer_Saphir.jpg?format=300w",
        "benefits": ["Company logo featured on website",
                    "Recognition at fundraisers",
                    "Invited to display promotional material at fundraisers"]
      },
      {
        "name": "SAPPHIRE",
        "image": "http://static1.squarespace.com/static/55668bf5e4b01b9595a550b0/t/55675d74e4b05a70c053923a/1432837492899/ventotene.jpg?format=300wD",
        "benefits": ["Company logo featured on website",
                    "Recognition at fundraisers"]
      }
    ]
  });
