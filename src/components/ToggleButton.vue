<template>
  <button @click="toggleFavorite" :class="{ isFavorite }">
    <img src="@/assets/star.png" />
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Pokemon as PokemonType } from "@/types";

@Component
export default class ToggleButton extends Vue {
  @Prop({ default: () => ({}), type: Object }) readonly pokemon!: PokemonType;
  @Prop({ default: false, type: Boolean }) readonly isFavorite!: boolean;

  toggleFavorite() {
    this.$emit("toggleFavorite", this.pokemon);
  }
}
</script>

<style lang="scss" scoped>
button {
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  filter: grayscale(100%);
  transition: 0.5s;
}

button:hover {
  opacity: 0.8;
}

button.isFavorite {
  filter: grayscale(0%);
}

img {
  width: 2rem;
  height: 2rem;
}
</style>
