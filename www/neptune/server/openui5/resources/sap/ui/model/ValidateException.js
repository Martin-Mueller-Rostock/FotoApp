/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP SE. All rights reserved
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/Exception'],function(q,E){"use strict";var V=function(m,v){this.name="ValidateException";this.message=m;this.violatedConstraints=v};V.prototype=q.sap.newObject(E.prototype);return V},true);
