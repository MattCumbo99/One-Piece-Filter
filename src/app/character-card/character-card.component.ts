import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CharacterData } from 'src/components/character-data';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit, OnChanges {
  /**
   * Title of the card.
   */
  @Input() cardTitle: string = "";

  /**
   * List of characters possible for the card.
   */
  @Input() characters: CharacterData[] = [];

  /**
   * The signal that the card should look for that re-spins the character.
   */
  @Input() refreshSignal: boolean = false;

  @Output() selectedCharacter: EventEmitter<CharacterData> = new EventEmitter();
  @Output() isSpinning: EventEmitter<boolean> = new EventEmitter();

  currentCharacter: CharacterData = this.characters.at(0)!;
  locked = false;
  isInitialized = false;

  buttonLabel = "Select";

  ngOnInit(): void {
    this.currentCharacter = this.characters.at(Math.random() * this.characters.length)!;
    this.isInitialized = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isInitialized && changes['refreshSignal'] && !this.locked) {
      this.spin();
    }
  }

  lockCharacter() {
    this.locked = true;
    this.buttonLabel = "";
    this.selectedCharacter.emit(this.currentCharacter);
  }

  private async spin() {
    let timer = 40;
    this.locked = true;
    this.isSpinning.emit(true);

    while (timer > 0) {
      this.currentCharacter = this.getRandom(this.currentCharacter.name);
      await this.delay(40);
      timer--;
    }

    this.isSpinning.emit(false);
    this.locked = false;
  }

  private getRandom(exclude: string = "") {
    let chars = this.characters;
    if (exclude != "") {
      chars = this.characters.filter(ch => { return ch.name != exclude });
    }

    const randIndex = Math.random() * chars.length;
    return chars.at(randIndex)!;
  }

  private delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
