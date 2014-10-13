// This is the EVRYTHNG Application
// Operator Key voHz9oDXbiXPpAzijd9GJimkFdVdzlhZJ67cbZxrdP1bwEiFPiUgkqJnK5dn4EXqHDyPd0AepqGZZiht
// APP Key lAwoL9SRTFx6SJFsR6qvpqj0G8MeSL2k6m4Lq2npugZLKV07aMf0mr5V9x4kVYnuNUCIgGcLvrUMCzuU
var app = new EVT.App('voHz9oDXbiXPpAzijd9GJimkFdVdzlhZJ67cbZxrdP1bwEiFPiUgkqJnK5dn4EXqHDyPd0AepqGZZiht');

var st = new ScanThng({
  invisible: true,
  redirect: false,
  errorCb: scanErrorCb,
  successCb: scanSuccessCb,
  apiKey: 'lAwoL9SRTFx6SJFsR6qvpqj0G8MeSL2k6m4Lq2npugZLKV07aMf0mr5V9x4kVYnuNUCIgGcLvrUMCzuU'
});



function scanErrorCb(error) {
  $(document).ready(function(){
    $("#results").html('<br>Error<br>' + JSON.stringify(error, null, 2));
  });
  // Om Error return all products from EVRYTHNG
  app.product().read().then(function(products) {
    $(document).ready(function(){
      $("#results").append("<br>Products<br>" + JSON.stringify(products, null, 2));
    });
  });
}

function scanSuccessCb(data) {
  console.log("Success" + JSON.stringify(data));
  $(document).ready(function(){
    $("#results").html("<br>Scan Successful<br>" + JSON.stringify(data, null, 2));

  });

  app.product(data.evrythngId).read().then(function(product) {
    $(document).ready(function(){
      $("#results").append("<br>Product<br>" + JSON.stringify(product, null, 2));
      $("#productName").text("Product Description : " + product.description);
    });
  });
}

function scanBottle() {
  // left the scanType in here to show how config can be changed at scan time
  st.identify({scanType: 'OBJPICT'});
}

function getAllProducts() {
  app.product().read().then(function(products) {
    console.log(products);
    $("#results").html("<br>All Products<br>" + JSON.stringify(products, null, 4));
  });
}

// copied functions as an example, obviously should be a reusable function

function recordPurchase() {
  app.product("UVxaThwWse5RaFk6kh4cctgb").read().then(function(product) {
    product.action('_Purchase').create().then(function(response) {
      console.log(response);
      $("#results").html("<br>Action Added<br>" + JSON.stringify(response, null, 4));
    });
  });
}


function recordShare() {
  app.product("UVxaThwWse5RaFk6kh4cctgb").read().then(function(product) {
    product.action('_Share').create().then(function(response) {
      console.log(response);
      $("#results").html("<br>Action Added<br>" + JSON.stringify(response, null, 4));
    });
  });
}

function getPurchases() {

  EVT.api({
    url: '/actions/_Purchase',
    params: {
      product: 'UVxaThwWse5RaFk6kh4cctgb'
    },
    authorization: "voHz9oDXbiXPpAzijd9GJimkFdVdzlhZJ67cbZxrdP1bwEiFPiUgkqJnK5dn4EXqHDyPd0AepqGZZiht"
  }).then(function(actions){
      console.log(actions);
      $("#results").html("<br>Purchases " + actions.length + "<br>" + JSON.stringify(actions, null, 4));
    });
}

function getShares() {

  EVT.api({
    url: '/actions/_Share',
    params: {
      product: 'UVxaThwWse5RaFk6kh4cctgb'
    },
    authorization: "voHz9oDXbiXPpAzijd9GJimkFdVdzlhZJ67cbZxrdP1bwEiFPiUgkqJnK5dn4EXqHDyPd0AepqGZZiht"
  }).then(function(actions){
      console.log(actions);
      $("#results").html("<br>Shares " + actions.length + "<br>" + JSON.stringify(actions, null, 4));
    });
}


function getResponseTime() {
   pingAPI();
}
