import { CharacterData, DevilFruitData, HakiData, PhysicalData, SkillData } from "./character-data";
import * as characterData from "../assets/character-data.json";
import { DefaultImages } from "./image-constants";

export class DataReader {
    private static readonly jsonCharacters: CharacterAttributes[] = characterData;
    
    public static readonly characters = this.getCharacterData();

    public static getCharacter(name: string) {
        return this.characters.find(character => {
            return character.name.toLowerCase() === name.toLowerCase();
        });
    }

    public static getRandomCharacter(exclude: string = "") {
        if (exclude == "" || this.characters.length <= 1) {
            const randomIndex = Math.random() * this.characters.length;
            return this.characters.at(randomIndex);
        } else {
            const randomIndex = Math.random() * this.characters.length-1;
            return this.characters.filter(character => {
                return character.name != exclude;
            }).at(randomIndex);
        }
    }

    public static getRandomFruitUser(exclude: string = "") {
        const fruitUsers = this.characters.filter(character => {
            return character.devilFruit != null && (exclude == "" || character.name != exclude);
        });

        const randomIndex = Math.random() * fruitUsers.length;
        return fruitUsers.at(randomIndex);
    }

    public static getRandomHakiUser(exclude: string = "") {
        const hakiUsers = this.characters.filter(character => {
            return character.haki != null && (exclude == "" || character.name != exclude);
        });

        const randomIndex = Math.random() * hakiUsers.length;
        return hakiUsers.at(randomIndex);
    }

    private static getCharacterData(): CharacterData[] {
        const characters = new Array<CharacterData>();

        Array.from(this.jsonCharacters).forEach(character => {
            characters.push(
                new CharacterData(
                    character.name,
                    `assets/images/${character.imageFile || DefaultImages.IMAGE_NONE}`,
                    character.physicalTraits as PhysicalData,
                    character.skillSet as SkillData,
                    character.haki as HakiData,
                    character.devilFruit as DevilFruitData
                )
            );
        });

        return characters;
    }

    private constructor() {}
}

type CharacterAttributes = {
    name: string,
    imageFile?: string,
    physicalTraits: PhysicalAttr,
    skillSet: SkillAttr,
    haki?: HakiAttr,
    devilFruit?: DevilFruitAttr
}

type PhysicalAttr = {
    durability: number,
    race: number,
    strength: number
}

type SkillAttr = {
    captain: number,
    combat: number,
    cooking: number,
    medicine: number,
    mind: number,
    music: number,
    navigation: number,
    sensei: number,
    ships: number,
    sniping: number,
    swords: number
}

type HakiAttr = {
    armament: number,
    observation: number,
    conqueror?: number
}

type DevilFruitAttr = {
    mastery: number,
    power: number
}