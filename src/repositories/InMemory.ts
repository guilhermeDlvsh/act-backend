export interface IRepository<D, C, U> {
  create: (data: C) => Promise<D>;
  getById: (id: string) => Promise<D | null>;
  getBy: ({ columnName: string, columnValue: any }) => Promise<D[]>;
  update: (id: string, data: U) => Promise<D>;
  remove: (id: string) => Promise<void>;
  paginate: (params: ParamsType) => Promise<PaginateReturnType<D>>;
}

export type PaginateReturnType<D> = {
  results: D[];
  total: number;
  pageSize: number;
  current: number;
  lastPage: number;
};

export type ParamsType = {
  page?: string;
  pageSize?: string;
  filter: string;
  order: string;
};

type dataItem<Type> = {
  readonly [attribute in keyof Type]: Type[attribute];
};

export class RepositoryInMemory<D, C, U, T> implements IRepository<D, C, U> {
  data: dataItem<T>[];
  private response: string[];
  private defaultValues: T;
  constructor(data, keysD, defaultValues) {
    this.data = data;
    this.response = keysD;
    this.defaultValues = defaultValues;
  }
  async getById(id: string): Promise<D | null> {
    // @ts-ignore
    const response = await this.data.find((item) => item.id === id);
    if (!response) {
      return null;
    }
    return this.filter([response])[0];
  }
  async getBy(params: { columnName: string; columnValue: any }): Promise<D[]> {
    // @ts-ignore
    return this.filter(
      await this.data.filter(
        (item) => item[params.columnName] === params.columnValue,
      ),
    );
  }
  async update(id: string, data: U): Promise<D> {
    // @ts-ignore
    const index = this.data.findIndex((item) => (item.id = id));
    const columns = Object.getOwnPropertyNames(data);
    columns.map((column) => {
      this.data[index][column] = data[column];
    });
    return this.filter([await this.data[index]])[0];
  }
  async remove(id: string): Promise<void> {
    // @ts-ignore
    const index = this.data.findIndex((item) => (item.id = id));
    await this.data.splice(index, 1);
  }
  async paginate(params: ParamsType): Promise<PaginateReturnType<D>> {
    throw new Error("Not implemented yet");
  }
  async create(data: C): Promise<D> {
    // @ts-ignore
    this.data.push(this.default(data));
    return await this.filter([this.data[this.data.length - 1]])[0];
  }
  private filter(data: T[]): D[] {
    const newData: any[] = [];
    data.forEach((_, i) =>
      this.response.map((res) => (newData[i][res] = data[i][res])),
    );
    return newData;
  }
  private default(data: C): T {
    let newData;
    let keys = Object.keys(data);
    for (let key in this.defaultValues) {
      // @ts-ignore
      newData[key] = keys.includes(key) ? data[key] : this.defaultValues[key];
    }
    return newData;
  }
}
