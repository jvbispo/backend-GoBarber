import ICacheProvider from '../models/ICacheProvider';

interface ICacheInterface {
  [key: string]: string;
}

export default class FakeCacheProvider implements ICacheProvider {
  private client: ICacheInterface;

  constructor() {
    this.client = {};
  }

  public async save(key: string, value: string): Promise<void> {
    this.client[key] = JSON.stringify(value);
  }

  public async invalidate(key: string): Promise<void> {
    delete this.client[key];
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = Object.keys(this.client).filter(key =>
      key.startsWith(`${prefix}:`),
    );

    keys.forEach(key => delete this.client[key]);
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = this.client[key];

    if (!data) return null;

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }
}
