interface GameManagerConfig {
  hp: number;
  money: number;
  targetKills: number;
}

export class GameStateController {
  private hp: number;
  private money: number;
  private enemiesKilled: number;
  private targetKills: number;

  constructor(config: GameManagerConfig) {
    this.hp = config.hp;
    this.money = config.money;
    this.enemiesKilled = 0;
    this.targetKills = config.targetKills;
  }

  public reduceHp(amount: number) {
    this.hp = Math.max(0, this.hp - amount);
  }

  public addMoney(amount: number) {
    this.money += amount;
  }

  public spendMoney(amount: number): boolean {
    if (this.money >= amount) {
      this.money -= amount;
      return true;
    }
    return false;
  }

  public addKill() {
    this.enemiesKilled++;
  }

  public isWinByKill(): boolean {
    return this.enemiesKilled >= this.targetKills;
  }

  public getHp() {
    return this.hp;
  }

  public getMoney() {
    return this.money;
  }

  public getEnemiesKilled() {
    return this.enemiesKilled;
  }

  public getTargetKills() {
    return this.targetKills;
  }
}
