import { visit, currentURL, click } from "@ember/test-helpers";
import { setupQunit as setupPolly } from "@pollyjs/core";
import { setupIntl } from "ember-intl/test-support";
import { setupApplicationTest } from "ember-qunit";
import { module, test } from "qunit";

module("Acceptance | question remove", function (hooks) {
  setupApplicationTest(hooks);
  setupPolly(hooks);
  setupIntl(hooks);

  hooks.beforeEach(function () {
    this.polly.server.get("/versions.json").passthrough();
    this.polly.server.get("/docs/*").passthrough();
  });

  test("can remove a question", async function (assert) {
    assert.expect(4);

    await visit("/demo/form-builder/test-form/questions/test-question");

    assert
      .dom("[data-test-demo-content] [data-test-question-list-item]")
      .exists({ count: 2 });

    await click("[data-test-demo-content] [data-test-remove-question]");
    await click(`
      [data-test-demo-content]
      [data-test-question-list-item=test-question]
      [data-test-remove-item]
    `);
    await click(`
      [data-test-demo-content]
      [data-test-question-list-item=test-question2]
      [data-test-remove-item]
    `);

    assert.equal(currentURL(), "/demo/form-builder/test-form");

    await click("[data-test-demo-content] [data-test-cancel]");

    assert
      .dom(
        "[data-test-demo-content] [data-test-question-list-item=test-question]"
      )
      .doesNotExist();
    assert
      .dom(
        "[data-test-demo-content] [data-test-question-list-item=test-question2]"
      )
      .doesNotExist();
  });
});
