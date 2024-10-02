import { DefaultImages } from "./image-constants";
import { PowerEnum } from "./power-enum";

/**
 * Base class for Characters.
 */
export class CharacterData {

    /**
     * 
     * @param name Name of the character
     * @param imageFile Filename of the character's image
     */
    constructor(
        readonly name: string,
        readonly imageFile: string = DefaultImages.IMAGE_NONE,
        readonly physicalTraits: PhysicalData,
        readonly skillSet: SkillData,
        readonly haki?: HakiData,
        readonly devilFruit?: DevilFruitData
    ) {}
}

export class PhysicalData {
    constructor(
        readonly durability: PowerEnum,
        readonly race: PowerEnum,
        readonly strength: PowerEnum
    ) {}
}

export class SkillData {
    constructor(
        readonly captain: PowerEnum,
        readonly combat: PowerEnum,
        readonly cooking: PowerEnum,
        readonly medicine: PowerEnum,
        readonly mind: PowerEnum,
        readonly music: PowerEnum,
        readonly navigation: PowerEnum,
        readonly sensei: PowerEnum,
        readonly ships: PowerEnum,
        readonly sniping: PowerEnum,
        readonly swords: PowerEnum
    ) {}
}

export class DevilFruitData {
    constructor(
        readonly mastery: PowerEnum,
        readonly power: PowerEnum
    ) {}
}

export class HakiData {
    constructor(
        readonly observation: PowerEnum,
        readonly armament: PowerEnum,
        readonly conqueror?: PowerEnum
    ) {}
}
