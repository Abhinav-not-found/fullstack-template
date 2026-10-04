type QueryConfig = {
  searchable?: string[];
  filterable?: string[];
  sortable?: string[];
};

type BuiltQuery = {
  filter: Record<string, unknown>;
  sort: Record<string, 1 | -1>;
};

const buildQuery = (query: Record<string, unknown>, config: QueryConfig): BuiltQuery => {
  const filter: Record<string, unknown> = {};
  const sort: Record<string, 1 | -1> = {};

  // Filters
  for (const field of config.filterable ?? []) {
    const value = query[field];

    if (value !== undefined && value !== '') {
      filter[field] = value;
    }
  }

  // Search
  const search = query.search;

  if (typeof search === 'string' && search.trim()) {
    const searchTerm = search.trim();

    filter.$or = (config.searchable ?? []).map((field) => ({
      [field]: {
        $regex: searchTerm,
        $options: 'i',
      },
    }));
  }

  // Sort
  const sortValue = query.sort;

  if (typeof sortValue === 'string') {
    for (const field of sortValue.split(',')) {
      const trimmed = field.trim();

      if (!trimmed) continue;

      const descending = trimmed.startsWith('-');
      const fieldName = descending ? trimmed.slice(1) : trimmed;

      if (config.sortable?.includes(fieldName)) {
        sort[fieldName] = descending ? -1 : 1;
      }
    }
  }

  return {
    filter,
    sort,
  };
};

export default buildQuery;

// example use case

// const { filter, sort } = buildQuery(req.query, {
//   searchable: ['title', 'description'],
//   filterable: ['status', 'category'],
//   sortable: ['createdAt', 'title'],
// });

// const tasks = await Task.find(filter).sort(sort);
