<template>
  <div v-if="pokemon" class="detailsContainer">
    <h2>{{ pokemon.name[0].toUpperCase() + pokemon.name.slice(1) }}</h2>
    <div class="mainInformation">
      <div class="flex-small-gap">
        <div>
          <p>Height:</p>
          {{ pokemon.height }}
        </div>
        <div>
          <p>Weight:</p>
          {{ pokemon.weight }}
        </div>
        <div>
          <p>Types:</p>
          <ul>
            <li v-for="type in pokemon.types" :key="type.type.name">
              {{ type.type.name[0].toUpperCase() + type.type.name.slice(1) }}
            </li>
          </ul>
        </div>
        <div>
          <p>Abilities:</p>
          <ul>
            <li
              v-for="ability in pokemon.abilities"
              :key="ability.ability.name"
            >
              {{
                ability.ability.name[0].toUpperCase() +
                ability.ability.name.slice(1)
              }}
            </li>
          </ul>
        </div>
      </div>
      <div>
        <img :src="pokemon.sprites.front_default" :alt="pokemon.name" />
      </div>
      <div class="flex-small-gap">
        <p>Stats:</p>
        <ul>
          <li v-for="stat in pokemon.stats" :key="stat.stat.name">
            {{ stat.stat.name[0].toUpperCase() + stat.stat.name.slice(1) }}:
            {{ stat.base_stat }}
          </li>
        </ul>
        <div>
          <p>Forms:</p>
          <ul>
            <li v-for="form in pokemon.forms" :key="form.name">
              {{ form.name[0].toUpperCase() + form.name.slice(1) }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="gamesBox">
      <p>Game indices:</p>
      <br />
      <ul>
        <li
          v-for="gameIndex in pokemon.game_indices"
          :key="gameIndex.version.name"
        >
          {{
            gameIndex.version.name[0].toUpperCase() +
            gameIndex.version.name.slice(1)
          }}
        </li>
      </ul>
    </div>
    <div class="movesBox">
      <p>Moves:</p>
      <br />
      <ul>
        <li v-for="move in pokemon.moves" :key="move.move.name">
          {{ move.move.name[0].toUpperCase() + move.move.name.slice(1) }}
        </li>
      </ul>
    </div>
    <ToggleButton
      :pokemon="pokemon"
      :isFavorite="pokemon.isFavorite"
      @toggleFavorite="toggleFavorite"
    />
  </div>
  <div v-else>
    <p>No Pokémon selected.</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import ToggleButton from "./ToggleButton.vue";
import pokemonStore from "@/store/pokemon";
import { Pokemon as PokemonType } from "@/types";

@Component({
  components: {
    ToggleButton,
  },
})
export default class PokemonDetails extends Vue {
  pokemon = pokemonStore.selectedPokemon;

  toggleFavorite(pokemon: PokemonType) {
    this.$emit("toggleFavorite", pokemon);
  }
}
</script>

<style scoped>
h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

img {
  width: 200px;
}

ul {
  list-style: none;
  padding: 0;
}

p {
  font-weight: 600;
}

.detailsContainer {
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 2rem;
  align-items: center;
}
.movesBox ul,
.gamesBox ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.mainInformation {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1rem;
  align-items: center;
}

button {
  position: absolute;
  top: 2rem;
  right: 2rem;
}

.flex-small-gap {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
