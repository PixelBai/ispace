/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar infoUtil_1 = __webpack_require__(/*! ./util/infoUtil */ \"./src/util/infoUtil.ts\");\nvar Program = /** @class */ (function () {\n    function Program() {\n    }\n    Program.main = function () {\n        console.log(\"start up!\");\n        // step 1: get url parameters\n        var params = new URLSearchParams(window.location.search);\n        var address = params.get(\"address\");\n        // step 2: jump to address\n        if (address !== null && address !== \"\") {\n            window.location.href = address;\n        }\n        else {\n            infoUtil_1.infoUtil.displayErrorInfo(\"address parameter is missing\");\n        }\n        console.log(\"end up!\");\n    };\n    return Program;\n}());\nProgram.main();\n\n\n//# sourceURL=webpack://ispace.app.hyperlink/./src/main.ts?");

/***/ }),

/***/ "./src/util/infoUtil.ts":
/*!******************************!*\
  !*** ./src/util/infoUtil.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.infoUtil = void 0;\nvar infoUtil = /** @class */ (function () {\n    function infoUtil() {\n    }\n    infoUtil.displayErrorInfo = function (message) {\n        // step init: 获取bod节点\n        var root = document.getElementsByTagName(\"body\")[0];\n        // step 1： clean error_info elem\n        var errorInfoElem = document.getElementById(\"error_info\");\n        if (errorInfoElem) {\n            root.removeChild(errorInfoElem);\n        }\n        // step 2: create new error_info elem\n        errorInfoElem = document.createElement(\"p\");\n        errorInfoElem.id = \"error_info\";\n        errorInfoElem.style.color = \"red\";\n        errorInfoElem.innerHTML = message;\n        // step 3: append error_info elem to root\n        root.appendChild(errorInfoElem);\n    };\n    return infoUtil;\n}());\nexports.infoUtil = infoUtil;\n\n\n//# sourceURL=webpack://ispace.app.hyperlink/./src/util/infoUtil.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;