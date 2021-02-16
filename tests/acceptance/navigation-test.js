import { visit, currentURL, click } from "@ember/test-helpers";
import { setupQunit as setupPolly } from "@pollyjs/core";
import { setupIntl } from "ember-intl/test-support";
import { setupApplicationTest } from "ember-qunit";
import { module, test } from "qunit";

module("Acceptance | navigation", function (hooks) {
  setupApplicationTest(hooks);
  setupPolly(hooks);
  setupIntl(hooks);

  hooks.beforeEach(function () {
    this.polly.server.get("/versions.json").passthrough();
    this.polly.server.get("/docs/*").passthrough();
  });

  test("can navigate", async function (assert) {
    assert.expect(14);

    await visit("/demo/form-builder/new");

    assert.dom("ul.uk-breadcrumb > li:nth-child(1) > a").hasText("All forms");
    assert.dom("ul.uk-breadcrumb > li:nth-child(2) > a").hasText("New form");

    await click("ul.uk-breadcrumb > li:nth-child(1) > a");
    assert.equal(currentURL(), "/demo/form-builder");

    await visit("/demo/form-builder/form-1");

    assert.dom("ul.uk-breadcrumb > li:nth-child(1) > a").hasText("All forms");
    assert.dom("ul.uk-breadcrumb > li:nth-child(2) > a").hasText("Form #1");

    await click("ul.uk-breadcrumb > li:nth-child(1) > a");
    assert.equal(currentURL(), "/demo/form-builder");

    await visit("/demo/form-builder/form-1/questions/new");

    assert.dom("ul.uk-breadcrumb > li:nth-child(1) > a").hasText("All forms");
    assert.dom("ul.uk-breadcrumb > li:nth-child(2) > a").hasText("Form #1");
    assert
      .dom("ul.uk-breadcrumb > li:nth-child(3) > a")
      .hasText("New question");

    await click("ul.uk-breadcrumb > li:nth-child(2) > a");
    assert.equal(currentURL(), "/demo/form-builder/form-1");

    await visit("/demo/form-builder/form-1/questions/question-1");

    assert.dom("ul.uk-breadcrumb > li:nth-child(1) > a").hasText("All forms");
    assert.dom("ul.uk-breadcrumb > li:nth-child(2) > a").hasText("Form #1");
    assert.dom("ul.uk-breadcrumb > li:nth-child(3) > a").hasText("Question #1");

    await click("ul.uk-breadcrumb > li:nth-child(2) > a");
    assert.equal(currentURL(), "/demo/form-builder/form-1");
  });
});
