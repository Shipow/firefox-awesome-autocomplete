var buttons = require('sdk/ui/button/action');
var pageMods = require("sdk/page-mod");
var data = require("sdk/self").data;
var simpleStorage = require('sdk/simple-storage');


var button = buttons.ActionButton({
  id: "mozilla-link",
  label: "Visit Mozilla",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

function handleClick(state) {

}

var pageMod = pageMods.PageMod({
  include: "*.github.com",
  contentStyleFile: data.url("content.css"),
  contentScriptFile: [
                      data.url("libs/jquery-1.11.2.min.js"),
                      data.url("libs/hogan-3.0.1.js"),
                      data.url("libs/typeahead.bundle.min.js"),
                      data.url("libs/algoliasearch.min.js"),
                      data.url("content.js")
                    ],
  onAttach: shareStorage,
  contentScriptOptions: {
    logoUrl: data.url("algolia128x40.png"),
    closeImgUrl: data.url("close-16.png")
  }
});

function shareStorage(worker) {
  worker.port.on('read-storage', function() {
    worker.port.emit('storage', simpleStorage.storage);
  });
  worker.port.on('update-storage', function(key,value) {
    simpleStorage.storage[key] = value;
  });
}