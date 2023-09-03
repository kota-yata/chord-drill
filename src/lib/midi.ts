export class MIDI {
  private midi: MIDIAccess;
  private targetInput: MIDIInput | undefined;
  constructor(midiAccess: MIDIAccess) {
    this.midi = midiAccess;
  }
  public listInputs() {
    let result: MIDIInput[] = [];
    this.midi.inputs.forEach((input) => {
      result.push(input);
    });
    return result;
  }
  public setTargetInput(input: MIDIInput) {
    this.targetInput = input;
  }
}
