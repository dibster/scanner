/*global EVT, getUserContext, scanObj, $, EvrythngCokeWrapper  */
/*jslint devel: true */
// coke 2015
//var projectKey = '7xVXSp2cHRCQG7pPG5v7Ar27Mq7mAf6qRniccOlrmhabSOxwRR8u2Z1eiAdoDxeulhL8LaAg6HvHurDB';
// coke CSE UAT
//var projectKey = 'NxDNY8T4NVkF4O2ATKLAt1lAtrNufKitoSohdqgV7jWjs4FUo3xSBGUkNsNSnC15lixixnWpjpxiz848';
// training
//var projectKey = 'ucGgQiSMTYa6rl0VjJzBPCcCfK6xRwa4uiMTCxH8C4JUetqnjbscuxi9YPDLQKmASp5uR1jQo0Sbauui';
// Germany
//var projectKey = 'Sl2MOysATSMiej7YrkkHfRJh7X45mJCQQicpohI23nD4tUG7KaWmPGFYhV36pVAeCecbWBRSq62XDRMz';
// Germany test Account
var projectKey = 'MTbxYEYbVksziybbx9XemVsmWlNKcxbJv0XyZlRywAaupt8QoQH4HyosXV7fa75joyVW0s1qT7tXLzt8';

var trackjs = true;

if (trackjs) {
  trackJs.track('Tracking Started EVRYTHNG Test Scanner');

  trackJs.track('useragent  : ' + navigator.userAgent);
};

var urlKey = getQueryVariable('key');
if (typeof urlKey !== 'undefined') {
  projectKey = urlKey;
  console.log('using Supplied Key ', projectKey);
}
else {
  console.log('Using Default Key ', projectKey);
}

var env = getQueryVariable('env');
if (env) {
    console.log('using supplied API', env);
}
else {
  env = 'https://api.evrythng.com'
  console.log('Using Default API Production');
}



EVT.setup({
  apiUrl: env
});


$('#projectKey').html(projectKey);
$('#envUrl').html(env);

var app = new EVT.App(projectKey);

//  create the EVRYTHNG Usr Object
var user = {};
// Create the ScanThng Object

var st = new EVT.ScanThng(app);

st.setup({redirect: false,
  createScanAction : true,
  invisible : false,
  createAnonymousUser : true,
  type : 'objpic'});
if (trackjs) trackJs.track('scanthng setup');

var defaultScanOptions =  {
  redirect: false,
  type : 'objpic',
    imageConversion  : {
      greyscale: true,
      resizeTo: 640
    }
  };

document.getElementById("scanOptions").value = JSON.stringify(defaultScanOptions);

//$('#scanOptions').text(defaultScanOptions);


// Call Back when image detection returns an error
  function scanErrorCb(error) {
    'use strict';
    trackJs.track('Start Error : ');
    writeResponse('Error',error);
    // On Error return all products from EVRYTHNG
    getAllProducts();
  }

// Call back when a product has been identified
function writeResponse(header, data) {
  $(document).ready(function () {
    $('#results').append('<h2>' + header + '</h2><pre>' + JSON.stringify(data, null, 2) + '</pre>');

  });
}
function scanSuccessCb(data) {
    'use strict';
  if (trackjs) trackJs.track('Start Success : ');
    user = data.user;
    writeResponse('Scan Successful',data);
}

function doNothing() {

  if (trackjs) trackJs.track('Do Nothing Button Clicked');
  writeResponse('Do Nothing Button Clicked', '{}');

}

  function scanBottle() {
    'use strict';
    writeResponse('scanning Bottle','started')
    if (trackjs) trackJs.track('Start Scan : ');
    // Config can be changed at scan time, eg a QR CODE -> scanThng.identify({scanType: 'QRCODE'});
    //{"createScanAction" : true}

    var scanOptions = JSON.parse(document.getElementById('scanOptions').value);

    writeResponse('scan Options', scanOptions);

    try {
      st.identify(scanOptions)
          .then(scanSuccessCb, scanErrorCb);
    }
    catch(err) {
      console.log('Error thrown in exception', err);
      if (trackjs) trackJs.track('Error caught on st identify : ' + err);
    }

  }


// list all products on EVRYTHNG tagged with Coke
  function getAllProducts() {
    'use strict';
    console.log('get all products');
    app.product().read({
    }).then(function (products) {
      console.log(products);
      writeResponse('All Products', products);
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
        writeResponse('User Key',JSON.parse(window.localStorage.getItem(key)));
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
        window.localStorage.removeItem(key);
        writeResponse('Key Removed',{});
      }
    }
   }


function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) == variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  console.log('Query variable %s not found', variable);
}