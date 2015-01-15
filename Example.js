/*global EVT, getUserContext, scanObj, $, EvrythngCokeWrapper  */
/*jslint devel: true */
// coke 2015
//var projectKey = '7xVXSp2cHRCQG7pPG5v7Ar27Mq7mAf6qRniccOlrmhabSOxwRR8u2Z1eiAdoDxeulhL8LaAg6HvHurDB';
// coke CSE UAT
var projectKey = 'NxDNY8T4NVkF4O2ATKLAt1lAtrNufKitoSohdqgV7jWjs4FUo3xSBGUkNsNSnC15lixixnWpjpxiz848';
// training
//var projectKey = 'ucGgQiSMTYa6rl0VjJzBPCcCfK6xRwa4uiMTCxH8C4JUetqnjbscuxi9YPDLQKmASp5uR1jQo0Sbauui';

  var app = new EVT.App(projectKey);

//  create the EVRYTHNG Usr Object
  var user = {};
// Create the ScanThng Object
  var st = new EVT.ScanThng(app);
  st.setup({redirect: false,
  createScanAction : true,
  createAnonymousUser : true,
  type : 'objpic'});


// Call Back when image detection returns an error
  function scanErrorCb(error) {
    'use strict';
    $(document).ready(function () {
      $('#results').html('<h2>Error</h2>' + JSON.stringify(error, null, 2));
    });
    // On Error return all products from EVRYTHNG
    getAllProducts();
  }

// Call back when a product has been identified
  function scanSuccessCb(data) {
    'use strict';
    user = data.user;
    $(document).ready(function () {
      $('#results').html('<h2>Scan Successful</h2>' + JSON.stringify(data, null, 2));

    });

   }

  function scanBottle() {
    'use strict';
    // Config can be changed at scan time, eg a QR CODE -> scanThng.identify({scanType: 'QRCODE'});
    //{"createScanAction" : true}
    console.log('doing identify');
    st.identify( {
          spinner: {
            enabled: true,
            appendTo: document.getElementsByTagName('body')[0],
            options: {
              length: 10,
              radius: 10,
              hwaccel: true
            }
          }
        }
    )
        .then(scanSuccessCb, scanErrorCb);
  }


// list all products on EVRYTHNG tagged with Coke
  function getAllProducts() {
    'use strict';
    console.log('get all products');
    app.product().read({
    }).then(function (products) {
      console.log(products);
      $('#results').append('<h2>All Products</h2>' + JSON.stringify(products, null, 4));
    });
  }


// list all products on EVRYTHNG tagged with Coke
  function clearMessages() {
    'use strict';
    $('#results').empty();
  }

  function ShowUser() {
    'use strict';
    console.log('showuser', window.localStorage.length);
    var results = [];
    for (var i = 0; i < window.localStorage.length; i++) {
      var key = window.localStorage.key(i);
      console.log(key);
      if (key.slice(0, 8) === "scanthng") {
        console.log('is st');
        $('#results').append(window.localStorage.getItem(key));
      }
    }
  }
  function removeUser() {
    'use strict';
    console.log('remove user');
    var results =  [];
    for (var i = 0; i < window.localStorage.length; i++) {
      var key = window.localStorage.key(i);
      console.log(key);
      if (key.slice(0,8) === "scanthng") {
        $('#results').append( window.localStorage.removeItem(key));
      }
    }
   }


