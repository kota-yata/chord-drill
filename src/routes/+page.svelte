<script lang="ts">
  import { MIDI } from '$lib/midi';
  import { LogListStore, logStore } from '$lib/store';
  import { onMount } from 'svelte';

  const logListStore = new LogListStore(logStore);
  let myMidi: MIDI;
  let midiInputs: MIDIInput[] = [];
  let showPreparation = true;

  onMount(async () => {
    logListStore.pushWithCurrentTimestamp('Checking Web MIDI API availability...');
    const isMidiAvailable = await navigator.permissions.query({ name: 'midi' }).catch(() => false);
    if (!isMidiAvailable) {
      logListStore.pushWithCurrentTimestamp('Web MIDI API is not available on this device');
      return;
    }
    logListStore.pushWithCurrentTimestamp('Web MIDI API is available on this device');
    const midiAccess = await navigator.requestMIDIAccess();
    myMidi = new MIDI(midiAccess);
    midiInputs = myMidi.listInputs();
  });

  const onMidiMessage = (event: Event) => {
    const data: Uint8Array = event.data; // [Status Bytes, Target Note, Volume]
    const status = myMidi.getStatus(data[0]);
    if (status === 'NOTEOFF') {
      myMidi.removeNote(data[1]);
    }
    if (status === 'NOTEON') {
      myMidi.registerNote(data[1]);
      myMidi.g
    }
  }

  const onSelectInput = (input: MIDIInput) => {
    showPreparation = false;
    myMidi.registerTargetInput(input, onMidiMessage);
  };
</script>

<svelte:head>
  <title>Kota's Chord Drill</title>
  <meta name="description" content="MIDI Chord Drill" />
</svelte:head>

<div class="main">
  {#if showPreparation}
  <div class="input container">
    <h2>Select a MIDI input</h2>
    <ul class="input-list">
      {#each midiInputs as input}
      <li class="input-list-item clickable">
        <button on:click={() => {onSelectInput(input)}}>{input.name} by {input.manufacturer}</button>
      </li>
      {/each}
    </ul>
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
  {/if}
</div>

<style lang="scss">
  @import '../styles/variables.scss';
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
      display: flex;
      flex-direction: column;
      align-items: center;
      &-list {
        list-style: none;
        padding: 0;
        & > li {
          padding: 4px 0;
          border-bottom: 1px solid $border;
        }
      }
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
