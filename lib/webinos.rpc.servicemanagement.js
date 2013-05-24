/*******************************************************************************
 *  Code contributed to the webinos project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 ******************************************************************************/

(function () {

    var RPCWebinosService = require('webinos-jsonrpc2').RPCWebinosService;
    var implModule = require('./webinos.impl.servicemanagement.js');

    var ServiceManagementModule = function (rpcHandler, params) {
        this.base = RPCWebinosService;
        this.base({api:'http://webinos.org/core/servicemanagement'
            , displayName:'Service Management API'
            , description:'API enabling service management for applications'
        });
        this.rpcHandler = rpcHandler;
        this.params = params;
    }

    ServiceManagementModule.prototype = new RPCWebinosService;

    ServiceManagementModule.prototype.register = function (params, successCallback, errorCallback) {
        implModule.register(params[0]
            , function (prop) {
                successCallback(prop);
            }
            , function (err) {
                errorCallback(err);
            }
        );
    };

    ServiceManagementModule.prototype.unregister = function (params, successCallback, errorCallback) {
        implModule.unregister(params[0]
            , function (prop) {
                successCallback(prop);
            }
            , function (err) {
                errorCallback(err);
            }
        );
    };

    exports.Service = ServiceManagementModule;

})();
