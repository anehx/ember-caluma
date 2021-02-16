import { visit, triggerEvent, find } from "@ember/test-helpers";
import { setupQunit as setupPolly } from "@pollyjs/core";
import { setupIntl } from "ember-intl/test-support";
import { setupApplicationTest } from "ember-qunit";
import { module, test } from "qunit";

module("Acceptance | question reorder", function (hooks) {
  setupApplicationTest(hooks);
  setupPolly(hooks);
  setupIntl(hooks);

  hooks.beforeEach(function () {
    this.polly.server.get("/versions.json").passthrough();
    this.polly.server.get("/docs/*").passthrough();
  });

  test("can reorder questions", async function (assert) {
    assert.expect(2);

    await visit("/demo/form-builder/test-form");

    assert
      .dom(
        "[data-test-demo-content] [data-test-question-list-item=test]:last-child"
      )
      .exists();

    const list = await find(
      "[data-test-demo-content] [data-test-question-list]"
    );
    const item = await find(
      "[data-test-demo-content] [data-test-question-list-item=test]"
    );

    // create a new array of children in which the chosen item is first instead of last
    const children = [
      item,
      ...[...list.children].filter(
        (c) => c.dataset.testQuestionListItem !== "test"
      ),
    ];

    await triggerEvent(list, "moved", {
      detail: [
        {
          $el: {
            children,
          },
        },
      ],
    });

    assert
      .dom(
        "[data-test-demo-content] [data-test-question-list-item=test]:first-child"
      )
      .exists();
  });
});
