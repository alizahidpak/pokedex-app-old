<template>
  <BaseTable
    :pokemons="pokemons"
    @goToDetails="goToDetails"
    @toggleFavorite="toggleFavorite"
  ></BaseTable>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Pokemon as PokemonType } from "@/types";
import BaseTable from "./BaseTable.vue";

@Component({
  components: {
    BaseTable,
  },
})
export default class PokemonList extends Vue {
  @Prop({ default: () => [], type: Array }) readonly pokemons!: PokemonType[];

  goToDetails(pokemon: PokemonType) {
    this.$emit("goToDetails", pokemon);
  }

  toggleFavorite(pokemon: PokemonType) {
    this.$emit("toggleFavorite", pokemon);
  }
}
</script>
