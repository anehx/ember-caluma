import {
  mirageGraphQLFieldResolver,
  createGraphQLHandler,
} from "@miragejs/graphql";

import resolvers from "ember-caluma/mirage-graphql/resolvers";
import rawSchema from "ember-caluma/mirage-graphql/schema";

const filterResolver = ({ allowedFilters }) => (obj, args, context, info) => {
  const filters = allowedFilters.reduce((filters, key) => {
    const value = args.filter?.[key];

    return {
      ...(value ? { [key]: value } : {}),
      ...filters,
    };
  }, {});

  return mirageGraphQLFieldResolver(obj, filters, context, info);
};

export default function ({ schema }) {
  return createGraphQLHandler(rawSchema, schema, {
    resolvers: {
      Query: {
        allForms: filterResolver({ allowedFilters: ["slug", "isArchived"] }),
        allQuestions: filterResolver({
          allowedFilters: ["slug", "isArchived"],
        }),
      },
      ...resolvers,
    },
  });
}
