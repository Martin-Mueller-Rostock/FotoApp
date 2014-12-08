/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP SE. All rights reserved
 */
jQuery.sap.declare("sap.viz.ui5.controls.VizFrame");jQuery.sap.require("sap.viz.library");jQuery.sap.require("sap.viz.ui5.controls.common.BaseControl");sap.viz.ui5.controls.common.BaseControl.extend("sap.viz.ui5.controls.VizFrame",{metadata:{publicMethods:["getVizUid","vizUpdate","vizSelection","getResponsiveLegend"],library:"sap.viz",properties:{"vizType":{type:"string",group:"Misc",defaultValue:null},"vizProperties":{type:"string",group:"Misc",defaultValue:null}},aggregations:{"dataset":{type:"sap.viz.ui5.data.Dataset",multiple:false},"feeds":{type:"sap.viz.ui5.controls.common.feeds.FeedItem",multiple:true,singularName:"feed"}},events:{"renderComplete":{},"selectData":{},"deselectData":{}}}});sap.viz.ui5.controls.VizFrame.M_EVENTS={'renderComplete':'renderComplete','selectData':'selectData','deselectData':'deselectData'};jQuery.sap.require("sap.viz.ui5.controls.libs.sap-viz-controls");jQuery.sap.require("sap.viz.ui5.controls.common.feeds.AnalysisObject");jQuery.sap.require("sap.viz.ui5.controls.common.feeds.FeedItem");jQuery.sap.require("sap.viz.ui5.controls.common.helpers.VizControlsHelper");jQuery.sap.require("sap.viz.ui5.controls.ResponsiveLegend");
sap.viz.ui5.controls.VizFrame.prototype.init=function(){sap.viz.ui5.controls.common.BaseControl.prototype.init.apply(this,arguments);this._vizFrame=null;this._onThemeChanged=jQuery.proxy(this._applyTheme,this);sap.ui.getCore().attachThemeChanged(this._onThemeChanged);this._clearVariables()};
sap.viz.ui5.controls.VizFrame.prototype.applySettings=function(){sap.ui.core.Control.prototype.applySettings.apply(this,arguments);if(!this._vizFrame){this._createVizFrame()}};
sap.viz.ui5.controls.VizFrame.prototype.exit=function(){sap.viz.ui5.controls.common.BaseControl.prototype.exit.apply(this,arguments);sap.ui.getCore().detachThemeChanged(this._onThemeChanged);this._clearVariables()};
sap.viz.ui5.controls.VizFrame.prototype._clearVariables=function(){this._vizFrame$=null;this._vizCreated=false;this._clearRequestedProperties();this._cachedDataset=null};
sap.viz.ui5.controls.VizFrame.prototype._clearRequestedProperties=function(){this._requestedVizType='info/column';this._requestedVizProperties=null};
sap.viz.ui5.controls.VizFrame.prototype.getVizUid=function(){if(this._vizFrame){return this._vizFrame.vizUid()}else{return null}};
sap.viz.ui5.controls.VizFrame.prototype.setUiConfig=function(u){sap.viz.ui5.controls.common.BaseControl.prototype.setUiConfig.apply(this,arguments)};
sap.viz.ui5.controls.VizFrame.prototype.getVizType=function(){var v=this._getVizType();if(v.indexOf('info/')===0){v=v.substr('info/'.length)}return v};
sap.viz.ui5.controls.VizFrame.prototype._getVizType=function(){var v;if(this._vizFrame&&this._vizFrame.vizType()){v=this._vizFrame.vizType()}else{v=this._requestedVizType}return v};
sap.viz.ui5.controls.VizFrame.prototype.setVizType=function(v){var p='info/';if(sap.viz.ui5.controls.VizFrame._isNativeVizType(p+v)){v=p+v}if(this._vizFrame&&this._vizCreated){try{this._vizFrame.vizType(v)}catch(e){this._requestedVizType=v}}else{this._requestedVizType=v}return this};
sap.viz.ui5.controls.VizFrame.prototype.getVizProperties=function(){if(this._vizFrame){return jQuery.extend(true,{},this._vizFrame.vizProperties()||{},this._requestedVizProperties||{})}else{return this._requestedVizProperties}};
sap.viz.ui5.controls.VizFrame.prototype.setVizProperties=function(v){if(this._vizFrame&&this._vizCreated){try{this._vizFrame.vizProperties(v)}catch(e){this._requestedVizProperties=v}}else{this._requestedVizProperties=jQuery.extend(true,this._requestedVizProperties||{},v||{})}return this};
sap.viz.ui5.controls.VizFrame.prototype.getFeeds=function(){var f=this.getAggregation('feeds');if(f&&this._vizFrame&&this._vizCreated){f=sap.viz.ui5.controls.common.feeds.FeedItem.toFeeds(this._vizFrame.feeds())}return f};
sap.viz.ui5.controls.VizFrame.prototype.vizSelection=function(p,a){if(this._vizFrame&&this._vizCreated){try{var r=this._vizFrame.vizSelection.apply(this._vizFrame,arguments);if(r===this._vizFrame){r=this}}catch(e){return null}return r}else{return null}};
sap.viz.ui5.controls.VizFrame.prototype.vizUpdate=function(o){if(this._vizFrame){if(o.data||o.feeds){if(o.properties){this._requestedVizProperties=jQuery.extend(true,this._requestedVizProperties||{},o.properties||{})}if(o.data){this.setDataset(o.data)}if(o.feeds){this._setFeeds(o.feeds)}}else{this._vizFrame.vizUpdate(o)}}};
sap.viz.ui5.controls.VizFrame.prototype.getResponsiveLegend=function(){if(this._vizFrame){return sap.viz.ui5.controls.ResponsiveLegend.createInstance(this._vizFrame.responsiveLegend())}};
sap.viz.ui5.controls.VizFrame.prototype._createVizFrame=function(o){this._applyTheme();var V=sap.viz.controls.frame.VizFrame;var G=sap.viz.controls.common.config.GlobalConfig;var c='ui5-viz-controls';this._vizFrame$=jQuery(document.createElement('div'));this._vizFrame$.addClass(c+'-viz-frame');var v=G.defaultUIConfig(G.DEFAULT_UICONFIG_TYPE_FRAME);v.enableFilterMenu=false;v.enableFilterBar=false;v.enableSettingButton=false;v.enableFullScreenButton=false;v.enablePlayControl=false;v.enableContextMenu=false;v.controls.chart.enableMorphing=false;v.controls.chart.enableTrellis=false;v.controls.contextMenu.menu=[["direction","stacking"],["legend","datalabels"]];var u=this.getUiConfig();if(u){if(u.applicationSet==='fiori'){jQuery.extend(true,v.controls.chart.defaultProperties||{},{'tooltip':{'visible':false},'plotArea':{'colorPalette':['sapUiChartPaletteQualitativeHue1','sapUiChartPaletteQualitativeHue2','sapUiChartPaletteQualitativeHue3','sapUiChartPaletteQualitativeHue4','sapUiChartPaletteQualitativeHue5','sapUiChartPaletteQualitativeHue6','sapUiChartPaletteQualitativeHue7','sapUiChartPaletteQualitativeHue8','sapUiChartPaletteQualitativeHue9','sapUiChartPaletteQualitativeHue10','sapUiChartPaletteQualitativeHue11'],'isFixedDataPointSize':true,'dataLabel':{'hideWhenOverlap':true,'respectShapeWidth':true,'style':{'color':null}}},'interaction':{'behaviorType':'sFinBehavior','selectability':{'mode':'multiple'}}});v.enableResponsiveLegend=true}}jQuery(this._app$).attr("data-sap-ui-preserve",true);var a=this._vizFrame=new V(this._vizFrame$.get(0),v);this._registerControl('sap.viz.controls.frame.VizFrame',this._vizFrame);a.vizOn('selectData',jQuery.proxy(function(e){this.fireEvent("selectData",e)},this));a.vizOn('deselectData',jQuery.proxy(function(e){this.fireEvent("deselectData",e)},this));a.vizOn('initialized',jQuery.proxy(function(e){this.fireEvent("renderComplete",e)},this));return a};
sap.viz.ui5.controls.VizFrame.prototype._updateVizFrame=function(){var o={'type':this._getVizType()};var d=this._getVizDataset();var f=this.getAggregation('feeds');if(d&&f){o.data=d;o.feeds=sap.viz.ui5.controls.common.helpers.VizControlsHelper.getFeedInstances(f)}if(this._requestedVizProperties){o.properties=this._requestedVizProperties}if(!this._vizCreated){if(o.data&&o.feeds){this._vizCreated=true;this._vizFrame.createViz(o);this._clearRequestedProperties()}}else{this._vizFrame.vizUpdate(o);this._clearRequestedProperties()}};
sap.viz.ui5.controls.VizFrame.prototype._getVizDataset=function(){var d=this.getDataset();if(d){if(this._isExtension()){sap.viz.ui5.controls.common.helpers.VizControlsHelper.updateAxis(d.getDimensions(),this._getVizType(),this.getAggregation('feeds'));return d.getVIZDataset()}else{return d.getVIZFlatDataset()}}else{return null}};
sap.viz.ui5.controls.VizFrame.prototype._createChildren=function(){this._vizFrame$.appendTo(this._app$);this._updateVizFrame()};
sap.viz.ui5.controls.VizFrame.prototype._updateChildren=function(){this._updateVizFrame()};
sap.viz.ui5.controls.VizFrame.prototype._setFeeds=function(f){this.destroyFeeds();if(f&&f.length){for(var i=0;i<f.length;i++){this.addFeed(f[i])}}return this};
sap.viz.ui5.controls.VizFrame.prototype._applyTheme=function(){};
sap.viz.ui5.controls.VizFrame.prototype._validateSize=function(){if(!this._app$){return}var s={'width':this.$().width(),'height':this.$().height()};var a={'width':this._app$.width(),'height':this._app$.height()};if(this._vizFrame){this._vizFrame.size({'width':a.width,'height':a.height})}else{this._vizFrame$.css({'width':a.width+'px','height':a.height+'px'})}};
sap.viz.ui5.controls.VizFrame.prototype._isExtension=function(){return!sap.viz.ui5.controls.VizFrame._isNativeVizType(this._getVizType())};
sap.viz.ui5.controls.VizFrame._isNativeVizType=function(v){return jQuery.inArray(v,['info/column','info/bar','info/stacked_bar','info/stacked_column','info/line','info/combination','info/bullet','info/bubble','info/time_bubble'])!==-1};
