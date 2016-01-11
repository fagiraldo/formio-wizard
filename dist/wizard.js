angular.module("formio.wizard",["formio"]).directive("formioWizard",function(){return{restrict:"E",replace:!0,template:'<div><i ng-show="!wizardLoaded" id="formio-loading" style="font-size: 2em;" class="glyphicon glyphicon-refresh glyphicon-spin"></i><div ng-repeat="alert in formioAlerts" class="alert alert-{{ alert.type }}" role="alert">{{ alert.message }}</div><div class="formio-wizard"></div><ul ng-show="wizardLoaded" class="list-inline"><li><a class="btn btn-default" ng-click="cancel()">Cancel</a></li><li ng-if="currentPage > 0"><a class="btn btn-primary" ng-click="prev()">Previous</a></li><li ng-if="currentPage < (form.components.length - 1)"><button class="btn btn-primary" ng-click="next()" ng-disabled="!isValid()">Next</button></li><li ng-if="currentPage >= (form.components.length - 1)"><button class="btn btn-primary" ng-click="submit()" ng-disabled="!isValid()">Submit Form</button></li></ul></div>',scope:{src:"=",storage:"="},link:function(e,o){e.wizardLoaded=!1,e.wizardElement=angular.element(".formio-wizard",o)},controller:["$scope","$compile","$element","Formio","FormioScope",function(e,o,r,n,t){var a=e.storage?localStorage.getItem(e.storage):!1;a&&(a=angular.fromJson(a)),e.formio=new n(e.src),e.page={},e.form={},e.submission={data:a?a.data:{}},e.currentPage=a?a.page:0,e.formioAlerts=[],this.showAlerts=e.showAlerts=function(o){e.formioAlerts=[].concat(o)},e.clear=function(){e.storage&&localStorage.setItem(e.storage,""),e.submission={data:{}},e.currentPage=0};var i=function(){e.currentPage>=e.form.components.length&&e.clear(),e.wizardLoaded=!1,e.storage&&localStorage.setItem(e.storage,angular.toJson({page:e.currentPage,data:e.submission.data})),e.page.components=e.form.components[e.currentPage].components;var r=angular.element(document.createElement("formio"));e.wizardElement.html(o(r.attr({form:"page",submission:"submission"}))(e)),e.wizardLoaded=!0,e.$emit("wizardPage",e.currentPage)};e.submit=function(){e.formio.saveSubmission(angular.copy(e.submission)).then(function(o){e.storage&&localStorage.setItem(e.storage,""),e.$emit("formSubmission",o)})["catch"](t.onError(e,r))},e.cancel=function(){e.clear(),i()},e.next=function(){e.currentPage>=e.form.components.length-1||(e.currentPage++,i(),e.$emit("wizardNext",e.currentPage))},e.prev=function(){e.currentPage<1||(e.currentPage--,i(),e.$emit("wizardPrev",e.currentPage))},e["goto"]=function(o){0>o||o>=e.form.components.length||(e.currentPage=o,i())},e.isValid=function(){return r.find("[name=formioForm]").children().scope().formioForm.$valid},e.$on("wizardGoToPage",function(o,r){e["goto"](r)}),e.formio.loadForm().then(function(o){e.form=o,e.page=angular.copy(o),e.$emit("wizardFormLoad",o),i()})}]}});