import { CharacterUriParams } from '@/types/character'
import { BASIC_PARAMS } from '.'

export const CHARACTER_URL_PARAMS: CharacterUriParams = {
  ...BASIC_PARAMS,
  orderBy: 'name',
  modifiedSince: ''
}

export const HOME_CHARACTERS_TO_SHOW = [
  1009368, // Iron Man'
  1009220, // Captain America
  1009562, // Scarlet Witch
  1009610, // Spider-Man (Peter Parker)
  1009664, // Thor
  1009189 // Black Widow
]
