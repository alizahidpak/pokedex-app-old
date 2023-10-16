export interface Pokemon {
  id: number;
  name: string;
  image: string;
  height: number;
  weight: number;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  };
  abilities: {
    name: string;
    url: string;
  }[];
  stats: {
    name: string;
    value: number;
  }[];
  sprites: {
    front_default: string;
  };
  forms: {
    name: string;
    url: string;
  }[];
  game_indices: {
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }[];
  moves: {
    move: {
      name: string;
      url: string;
    };
    version_group_details: {
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
      version_group: {
        name: string;
        url: string;
      };
    }[];
  };
  isFavorite: boolean;
}
