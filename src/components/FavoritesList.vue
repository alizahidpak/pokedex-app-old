<template>
  <div class="container">
    <h1>Your Favorite Pokemons</h1>
    <BaseTable
      :pokemons="favorites"
      @goToDetails="goToDetails"
      @toggleFavorite="toggleFavorite"
    ></BaseTable>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Pokemon as PokemonType } from "@/types";
import BaseTable from "./BaseTable.vue";

@Component({
  components: {
    BaseTable,
  },
})
export default class FavoritesList extends Vue {
  @Prop({ default: () => [], type: Array }) readonly favorites!: PokemonType[];

  goToDetails(pokemon: PokemonType) {
    this.$emit("goToDetails", pokemon);
  }

  toggleFavorite(pokemon: PokemonType) {
    this.$emit("toggleFavorite", pokemon);
  }
}
</script>

<style scoped>
h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.container {
  display: flex;
  flex-direction: column;
}
</style>
