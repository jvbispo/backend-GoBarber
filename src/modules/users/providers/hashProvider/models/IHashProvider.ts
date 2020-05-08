export default interface IHashProvider {
  hash(password: string): Promise<string>;
  compare(hash: string, password: string): Promise<boolean>;
}
