export interface DeckRepository {
  loadPublicDecks(): Promise<any[]>;
}
