({
    /**
     * Note that this test file operates in system mode (objects are not Lockerized) so the tests delegate logic and
     * verification to the controller and helper files, which operate in user mode.
     */

    // LockerService not supported on IE
    // TODO(W-3674741): FF version in autobuilds is too far behind
    browsers: ["-IE8", "-IE9", "-IE10", "-IE11", "-FIREFOX"],

    setUp: function(cmp) {
        cmp.set("v.testUtils", $A.test);
    },

    test$AExposedOnWindow: {
        test: function(cmp) {
            cmp.test$AExposedOnWindow();
        }
    },

    testDocumentExposedOnWindow: {
        test: function(cmp) {
            cmp.testDocumentExposedOnWindow();
        }
    },

    testCircularReferenceIsSecureWindow: {
        test: function(cmp) {
            cmp.testCircularReferenceIsSecureWindow();
        }
    },

    testNoAccessToWindowViaSetTimeout: {
        test: function(cmp) {
            cmp.testNoAccessToWindowViaSetTimeout();
            $A.test.addWaitFor(true, function() {
                return !!cmp.get("v.testComplete");
            });
        }
    },

    testHistoryExposedOnWindow: {
        test: function(cmp) {
            cmp.testHistoryExposedOnWindow();
        }
    },

    testLocationExposedOnWindow: {
        test: function(cmp) {
            cmp.testLocationExposedOnWindow();
        }
    },

    testModifyWindowLocation: {
        test: function(cmp) {
            cmp.testModifyWindowLocation();
        }
    },

    testNavigatorExposedOnWindow: {
        test: function(cmp) {
            cmp.testNavigatorExposedOnWindow();
        }
    },

    testObjectExposedOnWindow: {
        test: function(cmp) {
            cmp.testObjectExposedOnWindow();
        }
    },

    testWhitelistedGlobalAttributeExposedOnWindow: {
        test: function(cmp) {
            cmp.testWhitelistedGlobalAttributeExposedOnWindow();
        }
    },

    testHostedDefinedGlobalsExposedOnWindow: {
        test: function(cmp) {
            cmp.testHostedDefinedGlobalsExposedOnWindow();
        }
    },

    testTimerReturns: {
        test: function(cmp) {
            cmp.testTimerReturns();
        }
    },

    testArbitrarySchemes: {
        // "window.open" will not open a new window for mobile autobuild runs.
        browsers: ["-IE8", "-IE9", "-IE10", "-IE11", "-IPHONE", "-IPAD"],
        test: function(cmp) {
            cmp.testArbitrarySchemes();
        }
    },

    testOpen_HttpsUrl: {
        // "window.open" will not open a new window for mobile autobuild runs.
        browsers: ["-IE8", "-IE9", "-IE10", "-IE11", "-IPHONE", "-IPAD"],
        test: function(cmp) {
            cmp.testOpen_HttpsUrl();
        }
    },

    testOpen_HttpUrl: {
        // "window.open" will not open a new window for mobile autobuild runs.
        browsers: ["-IE8", "-IE9", "-IE10", "-IE11", "-IPHONE", "-IPAD"],
        test: function(cmp) {
            cmp.testOpen_HttpUrl();
        }
    },

    testOpen_RelativeUrl:{
        // "window.open" will not open a new window for mobile autobuild runs.
        browsers: ["-IE8", "-IE9", "-IE10", "-IE11", "-IPHONE", "-IPAD"],
        test: function(cmp) {
            cmp.testOpen_RelativeUrl();
        }
    },

    testOpen_JavascriptIsBlocked: {
        // "window.open" will not open a new window for mobile autobuild runs.
        browsers: ["-IE8", "-IE9", "-IE10", "-IE11", "-IPHONE", "-IPAD"],
        test: function(cmp) {
            cmp.testOpen_JavascriptIsBlocked();
        }
    },

    testCreateImageElement: {
        test: function(cmp) {
            cmp.testCreateImageElement();
        }
    },

    testBlob: {
        test: function(cmp) {
            cmp.testBlob();
        }
    },

    testBlob_WithScriptTagsBlocked: {
        test: function (cmp) {
            cmp.testBlob_WithScriptTagsBlocked();
        }
    },

    testFile: {
        test: function(cmp) {
            cmp.testFile();
        }
    },

    testFile_WithScriptTagsBlocked: {
        test: function (cmp) {
            cmp.testFile_WithScriptTagsBlocked();
        }
    },

    testMediaStreamBlocked: {
        test: function (cmp) {
            cmp.testMediaStreamBlocked();
        }
    }
})
