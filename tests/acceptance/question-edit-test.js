import { visit, currentURL, click, fillIn } from "@ember/test-helpers";
import { setupQunit as setupPolly } from "@pollyjs/core";
import { setupIntl } from "ember-intl/test-support";
import { setupApplicationTest } from "ember-qunit";
import { module, test } from "qunit";

module("Acceptance | question edit", function (hooks) {
  setupApplicationTest(hooks);
  setupPolly(hooks);
  setupIntl(hooks);

  hooks.beforeEach(function () {
    this.polly.server.get("/versions.json").passthrough();
    this.polly.server.get("/docs/*").passthrough();
  });

  test("can edit question", async function (assert) {
    assert.expect(3);

    await visit("/demo/form-builder/test-form");

    assert
      .dom("[data-test-demo-content] [data-test-question-list-item]")
      .exists({ count: 1 });

    await click(
      "[data-test-demo-content] [data-test-question-list-item=test-question] [data-test-edit-question]"
    );

    assert.equal(
      currentURL(),
      "/demo/form-builder/test-form/questions/test-question"
    );

    await fillIn("[data-test-demo-content] [name=label]", "Test Question 1?");

    await click("[data-test-demo-content] button[type=submit]");

    assert.equal(currentURL(), "/demo/form-builder/test-form");
  });
});
