interface QueryOptions {
  page?: number;
  limit?: number;
  sortField?: string;
  sortOrder?: 'asc' | 'desc' 
  search?: string;
  searchFields?: string[]; 
  filter?: Record<string, any>;
}

export async function applyQuery<T>(
  model: any,
  options: QueryOptions
): Promise<{ data: T[]; total: number; page: number; limit: number }> {
  const page = options.page && options.page > 0 ? options.page : 1;
  const limit = options.limit && options.limit > 0 ? options.limit : 10;
  const skip = (page - 1) * limit;

  const filter = options.filter || {};

  // Search
  if (options.search && options.searchFields?.length) {
    const searchRegex = new RegExp(options.search, "i");
    filter.$or = options.searchFields.map((field) => ({ [field]: searchRegex }));
  }

  // Total count with filter
  const total = await model.countDocuments(filter);

  // Sorting
  let sort: Record<string, 1 | -1> = {};
  if (options.sortField) {
    sort[options.sortField] = options.sortOrder === 'asc' ? 1 : -1
  } else {
    sort = { createdAt: -1 };
  }

  const data = await model.find(filter).sort(sort).skip(skip).limit(limit);

  return { data, total, page, limit };
}
