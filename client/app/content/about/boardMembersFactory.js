
angular.module('womenWorkingWithWomenApp')
  .factory('BoardMembers', function(){
    return {
      members: [
        {
          "name":  "Belinda Smith",
          "title": "Founder and President",
           "description": "Belinda is the founder of Women Working With Women and has worked hard to grow her community." ,
           "telephone": "(352) 872 8555",
           "email": "4wsbms@gmail.com",
           "imgSrc": "/assets/images/board/belinda.png"
        },
        {
          "name":  "MAXINE BETHEA B.S. Religion/Psychology Healthcare Administration",
          "title": "SECRETARY/TREASURER",
           "description": "Bible Instructor, and Director of Maxine's Place (a community service facility)",
           "telephone": "(352) 871 5233",
           "email": "Crimetochrist@gmail.com",
           "imgSrc": "/assets/images/board/maxine.png"
        },
        {
          "name":  "KAYLA SUTHERLAND, MPH",
          "title": "BOARD MEMBER",
           "description": "Teen and Youth Workshop Presenter and Registration Director. " ,
           "telephone": "(786) 445 7266",
           "email": "kayla.hsutherland@gmail.com",
           "imgSrc": "/assets/images/board/kayla.png"
        },
        {
          "name":  "PURETTE D. MILLS",
          "title": "VICE PRESIDENT",
           "description": "Parenting specialist/counselor, keynote speaker, balloon artist, workshop presenter, Children Ministries coordinator,  40yr/elementary/secondary teacher" ,
           "telephone": "(256) 457 4766",
           "email": "my4atms@aol.com",
           "imgSrc": "/assets/images/board/purette.png"
        }
      ]
    }
  });
