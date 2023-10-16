import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import { Pokemon as PokemonType } from "@/types";
import store from "@/store";
import { getModule } from "vuex-module-decorators";

@Module({ name: "pokemon", store, dynamic: true })
class PokemonModule extends VuexModule {
  public pokemons: PokemonType[] | null = null;
  public selectedPokemon: PokemonType | null = null;
  public favorites: PokemonType[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );

  @Action
  async searchPokemons(query: string) {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${query}`
      );
      if (!response.ok) throw new Error("Pokemon not found");
      const data = await response.json();
      this.context.commit("CHECK_FAVORITE", data);
      this.context.commit("SET_POKEMONS", [data]);
    } catch (error) {
      console.error(error);
      this.context.commit("SET_POKEMONS", []);
    }
  }

  @Mutation
  SET_POKEMONS(pokemons: PokemonType[]) {
    this.pokemons = pokemons;
  }

  @Mutation
  SET_SELECTED_POKEMON(pokemon: PokemonType) {
    this.selectedPokemon = pokemon;
  }

  @Mutation
  TOGGLE_FAVORITE(pokemon: PokemonType) {
    const index = this.favorites.findIndex((p) => p.id === pokemon.id);
    if (index === -1) {
      this.favorites.push(pokemon);
      this.favorites[this.favorites.length - 1].isFavorite = true;
    } else {
      this.favorites.splice(index, 1);
      pokemon.isFavorite = false;
    }
    localStorage.setItem("favorites", JSON.stringify(this.favorites));
  }

  @Mutation
  CHECK_FAVORITE(pokemon: PokemonType) {
    const index = this.favorites.findIndex((p) => p.id === pokemon.id);
    if (index !== -1) {
      pokemon.isFavorite = true;
    } else {
      pokemon.isFavorite = false;
    }
  }
}

const pokemonStore = getModule(PokemonModule);

export default pokemonStore;
