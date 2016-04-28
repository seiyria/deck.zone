
export class HomeBlocksService {
  constructor() {
    this._blocks = ['This is a fun game', 'Yes indeed'];
  }
  getData() {
    return this._blocks;
  }
}