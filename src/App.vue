<template>
  <div id="app" class="container">
    <header>
      <PokemonSearch v-model="searchTerm" class="search"></PokemonSearch>
      <button
        v-if="currentView == 'PokemonList'"
        @click="currentView = 'FavoritesList'"
        class="navButton"
      >
        Favorites
      </button>
      <button
        v-if="currentView != 'PokemonList'"
        @click="currentView = 'PokemonList'"
        class="navButton"
      >
        &lAarr;
      </button>
    </header>

    <keep-alive>
      <component
        :is="currentView"
        :pokemons="pokemons"
        class="content"
        :currentView="currentView"
        @goToDetails="setSelectedPokemon"
        :favorites="favorites"
        @toggleFavorite="toggleFavorite"
      ></component>
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import PokemonSearch from "./components/PokemonSearch.vue";
import PokemonDetails from "./components/PokemonDetails.vue";
import FavoritesList from "./components/FavoritesList.vue";
import PokemonList from "./components/PokemonList.vue";
import pokemonStore from "@/store/pokemon";
import { Pokemon as PokemonType } from "@/types";

@Component({
  components: {
    PokemonSearch,
    PokemonDetails,
    FavoritesList,
    PokemonList,
  },
})
export default class App extends Vue {
  searchTerm = "";
  currentView = "PokemonList";
  pokemons = pokemonStore.pokemons;
  favorites = pokemonStore.favorites;

  @Watch("searchTerm")
  onSearchTermChanged(newVal: string) {
    this.currentView = "PokemonList";
    pokemonStore.searchPokemons(newVal).then(() => {
      this.pokemons = pokemonStore.pokemons;
    });
  }

  setSelectedPokemon(pokemon: PokemonType) {
    pokemonStore.SET_SELECTED_POKEMON(pokemon);
    this.currentView = "PokemonDetails";
  }

  toggleFavorite(pokemon: PokemonType) {
    pokemonStore.TOGGLE_FAVORITE(pokemon);
  }
}
</script>

<style lang="scss">
$bg-color: #f2f2f2;

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  line-height: 1.2;
}

header {
  display: flex;
  gap: 32px;
  justify-content: space-between;
  align-items: center;
  padding: 32px;
  border-bottom: 1px solid #ccc;
}

.search {
  width: 100%;
}

.navButton {
  background-color: #f2f2f2;
  border: none;
  outline: none;
  width: 150px;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 700;
  transition: 0.5s;
}

.navButton:hover {
  opacity: 0.6;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0 25%;
  background-color: $bg-color;

  .content {
    background-color: white;
    border-radius: 10px;
    margin: 32px;
    overflow: auto;
    padding: 32px;
  }
}
</style>
