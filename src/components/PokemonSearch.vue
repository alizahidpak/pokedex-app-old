// SearchComponent.vue

<template>
  <div>
    <input v-model="localQuery" placeholder="Search Pokemon" autofocus />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { debounce } from "lodash";

@Component
export default class PokemonSearch extends Vue {
  @Prop({ default: "", type: String }) readonly query!: string;

  data() {
    return {
      localQuery: this.query,
    };
  }

  @Watch("localQuery")
  onLocalQueryChanged(newQuery: string) {
    this.debouncedInput(newQuery);
  }

  debouncedInput = debounce((query: string) => {
    this.$emit("input", query);
  }, 600);
}
</script>

<style lang="scss" scoped>
$input-bg-color: #e5e5e5;

input {
  width: 100%;
  padding: 24px;
  border: none;
  outline: none;
  border-radius: 5px;
  background-color: $input-bg-color;
  font-size: 1.2rem;
}
</style>
