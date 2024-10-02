import { Component } from '@angular/core';
import { Subscribable } from 'rxjs';
import { DataReader } from 'src/components/data-reader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly title = 'One-Piece-Filter';
  readonly allCharacters = DataReader.characters;
  readonly fruitUsers = DataReader.characters.filter(ch => { return ch.devilFruit != null; });
  readonly hakiUsers = DataReader.characters.filter(ch => { return ch.haki != null; });

  randomChar = DataReader.getRandomCharacter();
  randomFruitChar = DataReader.getRandomFruitUser();
  randomHakiChar = DataReader.getRandomHakiUser();

  isRefreshing = false;

  isDfLocked = false;
  isHakiLocked = false;

  async refreshClicked() {
    let timer = 40;
    while (timer > 0) {
      this.randomChar = DataReader.getRandomCharacter(this.randomChar?.name);
      await this.delay(40);
      timer--;
    }
  }

  async refresh() {
    this.isRefreshing = true;
    await this.delay(1);
    this.isRefreshing = false;
  }

  private delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
