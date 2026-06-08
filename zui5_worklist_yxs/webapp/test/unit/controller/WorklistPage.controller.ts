/*global QUnit*/
import Controller from "zui5worklistyxs/controller/Worklist.controller";

QUnit.module("Worklist Controller");

QUnit.test("I should test the Worklist controller", function (assert: Assert) {
	const oAppController = new Controller("Worklist");
	oAppController.onInit();
	assert.ok(oAppController);
});