import { visit, currentURL, click, fillIn } from "@ember/test-helpers";
import { setupQunit as setupPolly } from "@pollyjs/core";
import { setupIntl } from "ember-intl/test-support";
import { setupApplicationTest } from "ember-qunit";
import { module, test } from "qunit";

module("Acceptance | question add", function (hooks) {
  setupApplicationTest(hooks);
  setupPolly(hooks);
  setupIntl(hooks);

  hooks.beforeEach(function () {
    this.polly.server.get("/versions.json").passthrough();
    this.polly.server.get("/docs/*").passthrough();
  });

  test("can add an existing question", async function (assert) {
    assert.expect(3);

    await visit("/demo/form-builder/test-form");

    assert
      .dom("[data-test-demo-content] [data-test-question-list-item]")
      .doesNotExist();

    await click("[data-test-demo-content] [data-test-add-question]");
    await fillIn("[data-test-demo-content] input[type=search]", "test");
    await click(`
      [data-test-demo-content]
      [data-test-question-list-item=test-question]
      [data-test-add-item]
    `);

    assert.equal(
      currentURL(),
      "/demo/form-builder/test-form/questions/test-question"
    );

    await click("[data-test-demo-content] [data-test-cancel]");

    assert
      .dom(
        "[data-test-demo-content] [data-test-question-list-item=test-question]"
      )
      .exists();
  });
});
