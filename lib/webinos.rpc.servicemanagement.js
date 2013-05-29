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

    var ServiceManagementModule = function (rpcHandler, params) {
        this.base = RPCWebinosService;
        this.base({api:'http://webinos.org/core/servicemanagement'
            , displayName:'Service Management API'
            , description:'API enabling service management for applications'
        });
        this.rpcHandler = rpcHandler;
        this.params = params;
        this.registry = params[0];
    }

    ServiceManagementModule.prototype = new RPCWebinosService;

    ServiceManagementModule.prototype.register = function (params, successCallback, errorCallback) {
        this.registry.registerObject(params[0]);
        successCallback();
    };

    ServiceManagementModule.prototype.unregister = function (params, successCallback, errorCallback) {
        this.registry.unregisterObject(params[0]);
        successCallback();
    };

    ServiceManagementModule.prototype.listRegisteredServices = function (params, successCallback, errorCallback) {
        var services = this.registry.objects;
        var res = [];
        Object.keys(services).forEach(
            function(service){
                obj = {};
                obj['api'] = services[service][0]['api'];
                obj['id'] = services[service][0]['id'];
                res.push(obj);
            }
        );
        successCallback(res);
    };

    exports.Service = ServiceManagementModule;

})();
