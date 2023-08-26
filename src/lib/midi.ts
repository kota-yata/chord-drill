export class MIDI {
  private midi: MIDIAccess;
  constructor(midiAccess: MIDIAccess) {
    this.midi = midiAccess;
  }
}
