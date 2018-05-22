export default class Default {
  private _result: number;
  constructor(first: number, second: number) {
    this._result = first + second;
  }

  get result() {
    return this._result;
  }
}