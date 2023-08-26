<script lang="ts">
  import Game from '../lib/components/game.svelte';
  import Loading from '../lib/components/loading.svelte';
  import { ready } from '../lib/store';
</script>

<svelte:head>
  <title>Kota's Chord Drill</title>
  <meta name="description" content="MIDI Chord Drill" />
</svelte:head>

<section>
  {#if $ready}
    <Game />
  {:else}
    <Loading />
  {/if}
</section>
