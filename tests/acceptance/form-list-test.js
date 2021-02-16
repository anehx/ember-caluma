import { visit } from "@ember/test-helpers";
import { setupQunit as setupPolly } from "@pollyjs/core";
import { setupIntl } from "ember-intl/test-support";
import { setupApplicationTest } from "ember-qunit";
import { module, test } from "qunit";

module("Acceptance | form list", function (hooks) {
  setupApplicationTest(hooks);
  setupPolly(hooks);
  setupIntl(hooks);

  hooks.beforeEach(function () {
    this.polly.server.get("/versions.json").passthrough();
    this.polly.server.get("/docs/*").passthrough();
  });

  test("can list forms", async function (assert) {
    assert.expect(1);

    await visit("/demo/form-builder");

    assert
      .dom("[data-test-demo-content] [data-test-form-list-item]")
      .exists({ count: 5 });
  });
});
