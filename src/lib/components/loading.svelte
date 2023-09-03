<script lang="ts">
  import { MIDI } from '$lib/midi';
  import { LogListStore, logStore } from '$lib/store';
  import { onMount } from 'svelte';

  const logListStore = new LogListStore(logStore);

  onMount(async () => {
    logListStore.pushWithCurrentTimestamp('Checking Web MIDI API availability...');
    const isMidiAvailable = await navigator.permissions.query({ name: 'midi' }).catch(() => false);
    if (!isMidiAvailable) {
      logListStore.pushWithCurrentTimestamp('Web MIDI API is not available on this device.');
      return;
    }
    logListStore.pushWithCurrentTimestamp('Web MIDI API is available on this device.');
    const midiAccess = await navigator.requestMIDIAccess();
    const myMidi = new MIDI(midiAccess);
    console.log(myMidi.listInputs());
  });
</script>

<div class="main">
  <div class="input container">
    <h2>Select a MIDI input</h2>
    <div class="input-list"></div>
  </div>
  <div class="log container">
    {#if $logStore.length === 0}
    <h2>No logs yet...</h2>
    {:else}
      {#each $logStore as log}
      <div class="log-container">
        <div class="log-container-timestamp">{log.timeStamp}</div>
        <div class="log-container-log">{log.log}</div>
      </div>
      {/each}
    {/if}
  </div>
</div>

<style lang="scss">
  @import '../../styles/variables.scss';
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .container {
      background: $background-2;
      border-radius: 10px;
      padding: 20px;
    }
    .input {
      width: 400px;
      margin-bottom: 60px;
    }
    .log {
      width: 500px;
      max-height: 700px;
      &-container {
        max-height: 700px - (20px * 2);
        overflow-y: auto;
        font-weight: 400;
        display: flex;
        & > div {
          line-height: 20px;
        }
        &-timestamp {
          font-weight: 700;
          width: 80px;
        }
      }
    }
  }
</style>
