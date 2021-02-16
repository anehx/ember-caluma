import { visit, currentURL, click, fillIn } from "@ember/test-helpers";
import { setupQunit as setupPolly } from "@pollyjs/core";
import { setupIntl } from "ember-intl/test-support";
import { setupApplicationTest } from "ember-qunit";
import { module, test } from "qunit";

module("Acceptance | form edit", function (hooks) {
  setupApplicationTest(hooks);
  setupPolly(hooks);
  setupIntl(hooks);

  hooks.beforeEach(function () {
    this.polly.server.get("/versions.json").passthrough();
    this.polly.server.get("/docs/*").passthrough();
  });

  test("can edit a form", async function (assert) {
    assert.expect(3);

    await visit("/demo/form-builder");

    assert
      .dom("[data-test-demo-content] [data-test-form-list-item]")
      .exists({ count: 1 });

    await click(
      "[data-test-demo-content] [data-test-form-list-item=test-form] [data-test-edit-form]"
    );

    assert.equal(currentURL(), "/demo/form-builder/test-form");

    await fillIn(
      "[data-test-demo-content] input[name=name]",
      "Some Random Name"
    );
    await fillIn(
      "[data-test-demo-content] textarea[name=description]",
      "Some Random Description"
    );

    await click("[data-test-demo-content] button[type=submit]");

    assert.equal(currentURL(), "/demo/form-builder/test-form");
  });
});
