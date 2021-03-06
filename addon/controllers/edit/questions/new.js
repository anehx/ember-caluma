import Controller from "@ember/controller";

export default Controller.extend({
  actions: {
    afterSubmit(slug) {
      this.transitionToRoute("edit.questions.edit", slug);
    },
  },
});
