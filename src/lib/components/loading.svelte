<script lang="ts">
  import { MIDI } from '$lib/midi';
  import { onMount } from 'svelte';

  onMount(async () => {
    const isMidiAvailable = await navigator.permissions.query({ name: 'midi' }).catch(() => false);
    if (!isMidiAvailable) return;
    const midiAccess = await navigator.requestMIDIAccess();
    const myMidi = new MIDI(midiAccess);
    console.log(myMidi.listInputs());
  });
</script>

<div>
  <h3>Getting Started...</h3>
</div>
