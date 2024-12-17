"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _Server = require("./Server.js");
Object.keys(_Server).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Server[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Server[key];
    }
  });
});
//# sourceMappingURL=index.js.map