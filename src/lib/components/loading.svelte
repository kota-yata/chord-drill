<script lang="ts">
  import { onMount } from 'svelte';

  const checkMIDIAvailability = async () => {
    const midiPermission = await navigator.permissions.query({ name: 'midi' });
    if (midiPermission.state === 'granted') {
      console.log('granted');
    } else if (midiPermission.state === 'prompt') {
      console.log('prompt');
    } else {
      console.log('denied');
    }
  };

  const requestMIDI = async () => {
    const midiAccess = await navigator.requestMIDIAccess();
    console.log(midiAccess);
  };

  onMount(async () => {
    await checkMIDIAvailability();
    await requestMIDI();
  });
</script>

<div>
  <h3>Getting Started...</h3>
</div>
