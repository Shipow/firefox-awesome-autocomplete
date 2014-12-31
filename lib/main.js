var buttons = require('sdk/ui/button/toggle');
var pageMods = require("sdk/page-mod");
var data = require("sdk/self").data;
var simpleStorage = require('sdk/simple-storage');
var panels = require("sdk/panel");


var button = buttons.ToggleButton({
  id: "awesome-autocomplete",
  label: "Github Awesome Autocomplete",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

var panel = panels.Panel({
  width: 400,
  height: 590,
  contentURL: data.url("panel.html"),
  contentStyleFile: data.url("content.css"),
  contentScriptFile: data.url("popup.js"),
  onHide: handleHide
});

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
  contentScriptOptions: {
    logoUrl: data.url("algolia128x40.png"),
    closeImgUrl: data.url("close-16.png")
  },
  onAttach: shareStorage
});

function handleClick(state) {
  if (state.checked) {
    panel.show({
      position: button
    });
  }
}

function handleHide() {
  button.state('window', {checked: false});
}

function shareStorage(worker) {
  worker.port.on('read-storage', function() {
    worker.port.emit('storage', simpleStorage.storage);
  });
  worker.port.on('update-storage', function(data) {
    simpleStorage.storage[data[0]] = data[1];
  });
}
