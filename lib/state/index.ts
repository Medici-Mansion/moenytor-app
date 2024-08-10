import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaults, Schema, tryParse, tryStringify } from "./schema";

let _state: Schema = defaults;

const STORAGE_KEY = "STORAGE_KEY";

export class StateManager {
  static async init() {
    const stored = await StateManager.readFromStorage();
    if (stored) {
      _state = stored;
    }
  }

  static get<K extends keyof Schema>(key: K): Schema[K] {
    return _state[key];
  }

  static async set<K extends keyof Schema>(
    key: K,
    value: Schema[K]
  ): Promise<void> {
    _state = {
      ..._state,
      [key]: value,
    };
    await StateManager.writeToStorage(_state);
  }

  private static async writeToStorage(value: Schema) {
    const rawData = tryStringify(value);
    if (rawData) {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, rawData);
      } catch (e) {}
    }
  }

  private static async readFromStorage(): Promise<Schema | undefined> {
    let rawData: string | null = null;
    try {
      rawData = await AsyncStorage.getItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
    if (rawData) {
      return tryParse(rawData);
    }
  }
}
