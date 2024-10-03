import { Component } from '@angular/core';
import { DataReader } from 'src/components/data-reader';
import { CharacterData } from 'src/components/character-data';

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

  readonly selectedCharacters = new Map<string, CharacterData>();
  readonly DEVIL_FRUIT = "devilFruit";
  readonly DEVIL_FRUIT_MASTERY = "devilFruitMastery";
  readonly HAKI = "haki";
  readonly COMBAT = "combat";
  readonly STRENGTH = "strength";
  readonly MIND = "mind";

  readonly cardCount = 6;

  isRefreshing = false;
  isPicking = true;
  overallRank = 0;
  rankLabel = "";

  isCardsSpinning = false;

  applySelected(cardName: string, character: CharacterData): void {
    this.selectedCharacters.set(cardName, character);
    this.isPicking = false;
    if (this.selectedCharacters.size < this.cardCount) {
      this.refresh();
    } else {
      this.overallRank = this.getRank();
    }
  }

  isSpinning(spinning: boolean): void {
    this.isCardsSpinning = spinning;
    this.isPicking = !spinning;
  }

  private getRank(): number {
    let ranking = 0;

    this.selectedCharacters.forEach((character, key) => {
      switch(key) {
        case this.DEVIL_FRUIT:
          ranking += character.devilFruit!.power;
          break;
        case this.DEVIL_FRUIT_MASTERY:
          ranking += character.devilFruit!.mastery;
          break;
        case this.HAKI:
          ranking += character.haki!.armament;
          ranking += character.haki!.observation;
          if (character.haki!.conqueror != null) ranking += character.haki!.conqueror;
          break;
        case this.COMBAT:
          ranking += character.skillSet.combat;
          break;
        case this.STRENGTH:
          ranking += character.physicalTraits.strength;
          break;
        case this.MIND:
          ranking += character.skillSet.mind;
          break;
        default:
          console.error("Unknown card identifier: " + key);
      }
    });

    this.rankLabel = this.labelRank(ranking);
    return ranking;
  }

  private labelRank(rank: number): string {
    if (rank > 70) {
      return "#1: PIRATE KING!";
    } else if (rank >= 60) {
      return "#2: Emperor";
    } else if (rank >= 50) {
      return "#3: Warlord";
    } else if (rank >= 40) {
      return "#4: Worst Generation Pirate";
    } else {
      return "#5+: Unnamed Seadog";
    }
  }

  private refresh(): void {
    if (this.isRefreshing) {
      this.isRefreshing = false;
    } else {
      this.isRefreshing = true;
    }
  }
}
