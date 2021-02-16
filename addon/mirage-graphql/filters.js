export default {
  form: ({ filter }) => {
    return {
      ...(filter.slug ? { slug: filter.slug } : {}),
      ...(filter.isArchived ? { isArchived: filter.isArchived } : {}),
    };
  },
};
