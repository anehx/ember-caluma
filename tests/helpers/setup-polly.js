import { Polly, setupQunit } from "@pollyjs/core";
// import FSPersister from "@pollyjs/persister-fs";
//
// Polly.register(FSPersister);

export function setupPolly(hooks, configuration) {
  const result = setupQunit(hooks, { persister: "fs", ...configuration });

  hooks.beforeEach(function () {
    this.polly.server.get("/versions.json").passthrough();
    this.polly.server.get("/docs/*").passthrough();
  });

  return result;
}

export default setupPolly;
