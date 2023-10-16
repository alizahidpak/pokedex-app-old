<template>
  <table v-if="pokemons && pokemons.length">
    <tbody>
      <tr v-for="pokemon in pokemons" :key="pokemon.id">
        <td>
          <div class="nameAndImage" @click="goToDetails(pokemon)">
            <img :src="pokemon.sprites.front_default" />
            <p class="name">
              {{ pokemon.name[0].toUpperCase() + pokemon.name.slice(1) }}
            </p>
          </div>
          <div class="additionalInformation">
            <div>
              <ul>
                <li v-for="type in pokemon.types" :key="type.type.name">
                  {{
                    type.type.name[0].toUpperCase() + type.type.name.slice(1)
                  }}
                </li>
              </ul>
              <p>Height: {{ pokemon.height }}</p>
              <p>Weight: {{ pokemon.weight }}</p>
            </div>
            <ToggleButton
              :pokemon="pokemon"
              :isFavorite="pokemon.isFavorite"
              @toggleFavorite="toggleFavorite"
            />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Pokemon as PokemonType } from "@/types";
import ToggleButton from "./ToggleButton.vue";

@Component({
  components: {
    ToggleButton,
  },
})
export default class BaseTable extends Vue {
  @Prop({ default: () => [], type: Array }) readonly pokemons!: PokemonType[];

  goToDetails(pokemon: PokemonType) {
    this.$emit("goToDetails", pokemon);
  }

  toggleFavorite(pokemon: PokemonType) {
    this.$emit("toggleFavorite", pokemon);
  }
}
</script>

<style lang="scss" scoped>
table {
  border-spacing: 0;
}

td {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 10px;
  padding: 20px;
  text-align: left;
  border-bottom: 1px solid rgba(85, 85, 85, 0.5);
}

tr:last-child td {
  border-bottom: none;
}

img {
  width: 100px;
  height: 100px;
}

ul {
  list-style: none;
  display: flex;
  gap: 10px;
  font-weight: 600;
}

.nameAndImage {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 600;
}

.name:hover {
  text-decoration: underline;
  opacity: 0.8;
}

.additionalInformation {
  display: flex;
  justify-content: space-between;
}

.additionalInformation div {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
