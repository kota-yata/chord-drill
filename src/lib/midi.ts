export class MIDI {
  private midi: MIDIAccess;
  private targetInput: MIDIInput | undefined;
  constructor(midiAccess: MIDIAccess) {
    this.midi = midiAccess;
  }
  public listInputs() {
    return this.midi.inputs;
  }
  public setTargetInput(input: MIDIInput) {
    this.targetInput = input;
  }
}
