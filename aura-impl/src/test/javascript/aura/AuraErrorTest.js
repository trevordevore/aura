/*
 * Copyright (C) 2013 salesforce.com, inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Function.RegisterNamespace("Test.Aura");

[Fixture]
Test.Aura.AuraErrorTest = function() {
    var Aura = {Errors: {}};

    Mocks.GetMocks(Object.Global(), {
        "Aura": Aura,
        "AuraError": function(){}
    })(function() {
        [Import("aura-impl/src/main/resources/aura/AuraError.js")]
    });

    var windowMock=Test.Mocks.NeededMocks.getWindowMock();
    
    [Fixture]
    function Construct() {
        [Fact]
        function ReturnsNameDefault() {//no message nor innerError, the default name is AuraError
            var actual;
            var expected = "AuraError";

            windowMock(function() {
                actual = new Aura.Errors.AuraError().name;
            });

            Assert.Equal(expected, actual);
        }
        
        [Fact]
        function ReturnsNameofInnerError() {//when innerError has name, we just use that
            var actual;
            var innerError = new TypeError();
            var expected = innerError.name;

            windowMock(function() {
                actual = new Aura.Errors.AuraError(null, innerError).name;
            });

            Assert.Equal(expected, actual);
        }

        [Fact]
        function ReturnsEmptyMessageDefault() {//when pass in no message nor innerError, we set message to empty
            var actual;

            windowMock(function() {
                actual = new Aura.Errors.AuraError().message;
            });

            Assert.Empty(actual);
        }

        [Fact]
        function ReturnsMessage() {//when pass in message, no innerError, we use that as message
            var actual;
            var expected = "test message";

            windowMock(function() {
                actual = new Aura.Errors.AuraError(expected).message;
            });

            Assert.Equal(expected, actual);
        }
        
        [Fact]
        function ReturnsMessageofMessageAndInnerError() {//when pass in both message and innerError, we construct message from them
            var actual;
            var innerError = new TypeError("from inner error");
            var message = "from ctor";
            var expected = message + " [" + innerError.toString() + "]";

            windowMock(function() {
                actual = new Aura.Errors.AuraError(message, innerError).message;
            });

            Assert.Equal(expected, actual);
        }

        [Fact]
        function ReturnsStackTraceDefault() {//no innerError, we create a new Error("foo"), and use its stackTrace
            var actual;

            windowMock(function() {
                actual = new Aura.Errors.AuraError();
            });

            Assert.NotNull(actual.stackTrace);//make sure stackTrace is not null
        }
        
        [Fact]
        function ReturnsStackTraceChromeStartGetStripOff() {//make sure we strip off the name:message Chrome would add to the stackTrace
        	var actual;
            var innerError = new Error();
            innerError.message = "Error from app client controller";
            innerError.stack = "Error: Error from app client controller\n\
    at throwErrorFromClientController (http://localhost:9090/components/auratest/errorHandlingApp.js:42:15)\n\
    at Action.$runDeprecated$ (http://localhost:9090/auraFW/javascript/iMVf5-orschKyiiWELafJg/aura_dev.js:8469:36)";
            var expected = "    at throwErrorFromClientController (http://localhost:9090/components/auratest/errorHandlingApp.js:42:15)\n\
    at Action.$runDeprecated$ (http://localhost:9090/auraFW/javascript/iMVf5-orschKyiiWELafJg/aura_dev.js:8469:36)";
            
            windowMock(function() {
                actual = new Aura.Errors.AuraError(null, innerError).stackTrace;
            });

            Assert.Equal(expected, actual);
        }

        [Fact]
        function ReturnsSeverity() {
            var actual;
            var expected = "FATAL";

            windowMock(function() {
                actual = new Aura.Errors.AuraError(null, null, expected).severity;
            });

            Assert.Equal(expected, actual);
        }

        [Fact]
        function ReturnsId() {
            var actual;

            windowMock(function() {
                actual = new Aura.Errors.AuraError().id;
            });

            Assert.True(actual != 0);
        }
        
        
        
        [Fact]
        function ReturnsStackTrace_StrangeMessage() {
        	var actual = "";
        	var innerError = undefined;// new Error();
            //innerError.message = "innerErrorMessage";
            var expected = "SomeMessage";
            
            windowMock(function() {
                actual = new Aura.Errors.AuraError("SomeMessage", innerError).message;
            });

            Assert.Equal(expected, actual);
        }

        [Fact]
        function ReturnsIdTheSameAsGackStackTraceId() {
            var actual;
            var innerError = new Error();
            innerError.message = "Error from app client controller";
            innerError.stack = "Error: Error from app client controller\n\
    at throwErrorFromClientController (http://localhost:9090/components/auratest/errorHandlingApp.js:42:15)\n\
    at Action.$runDeprecated$ (http://localhost:9090/auraFW/javascript/iMVf5-orschKyiiWELafJg/aura_dev.js:8469:36)\n\
    at Object.Component$getActionCaller [as $handler$] (http://localhost:9090/auraFW/javascript/iMVf5-orschKyiiWELafJg/aura_dev.js:6695:20)\n\
    at Aura.$Event$.$Event$.$executeHandlerIterator$ (http://localhost:9090/auraFW/javascript/iMVf5-orschKyiiWELafJg/aura_dev.js:8100:15)\n\
    at Aura.$Event$.$Event$.$executeHandlers$ (http://localhost:9090/auraFW/javascript/iMVf5-orschKyiiWELafJg/aura_dev.js:8078:8)\n\
    at http://localhost:9090/auraFW/javascript/iMVf5-orschKyiiWELafJg/aura_dev.js:8130:10\n\
    at AuraInstance.$run$ (http://localhost:9090/auraFW/javascript/iMVf5-orschKyiiWELafJg/aura_dev.js:18350:12)\n\
    at Aura.$Event$.$Event$.$fire$ (http://localhost:9090/auraFW/javascript/iMVf5-orschKyiiWELafJg/aura_dev.js:8128:6)\n\
    at Object.catchAndFireEvent (http://localhost:9090/components/ui/button.js:90:33)\n\
    at press (http://localhost:9090/components/ui/button.js:34:16)";
            var expected = -811461341;

            windowMock(function() {
                actual = new Aura.Errors.AuraError(null, innerError).id;
            });

            Assert.Equal(expected, actual);
        }


        [Fact]
        function ReturnsInnerErrorSeverity() {
            var actual;
            var innerError = new Error();
            innerError.severity = "TEST";
            var expected = innerError.severity;

            windowMock(function() {
                actual = new Aura.Errors.AuraError(null, innerError).severity;
            });

            Assert.Equal(expected, actual);
        }
        
        [Fact]
        function ReturnsHandled() {//handled is set to false
            var actual;
            var expected = false;

            windowMock(function() {
                actual = new Aura.Errors.AuraError().handled;
            });

            Assert.Equal(expected, actual);
        }
        
        [Fact]
        function ReturnsReported() {//reported is set to false
            var actual;
            var expected = false;

            windowMock(function() {
                actual = new Aura.Errors.AuraError().reported;
            });

            Assert.Equal(expected, actual);
        }
    }

    [Fixture]
    function ToString() {
        [Fact]
        function ContainsMessage() {
            var expected = "test message";
            var target;

            windowMock(function(){
                target = new Aura.Errors.AuraError(expected);
            });

            Assert.Equal(expected, target.toString());
        }

		//when message is undefined, we will call Error.prototype.toString(), note in browser this will give us "Error"
        [Fact]
        function ReturnsEmptyStringWhenMessageIsUndefined() {
            var target;
            windowMock(function(){
                target = new Aura.Errors.AuraError();
            });
			Assert.Equal('', target.toString());
        }
        
    }
}
