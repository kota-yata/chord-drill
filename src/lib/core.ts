import { LogListStore, logStore } from "./store";
import { noteName } from "./constants";
import { detect } from "@tonaljs/chord-detect";

export class ChordDrill {
  private midi: MIDIAccess;
  private targetInput: MIDIInput | undefined;
  private logListStore: LogListStore;
  private registered: number[] = [];

  static readonly STATUS_NOTEOFF_MIN = 128;
  static readonly STATUS_NOTEOFF_MAX = 137;
  static readonly STATUS_NOTEON_MIN = 144;
  static readonly STATUS_NOTEON_MAX = 153;

  constructor(midiAccess: MIDIAccess) {
    this.midi = midiAccess;
    this.logListStore = new LogListStore(logStore);
  }
  public listInputs() {
    let result: MIDIInput[] = [];
    this.midi.inputs.forEach((input) => {
      result.push(input);
    });
    return result;
  }
  public getStatus(statusNum: number): 'NOTEON' | 'NOTEOFF' | 'OTHERS' {
    if (ChordDrill.STATUS_NOTEOFF_MIN <= statusNum && statusNum <= ChordDrill.STATUS_NOTEOFF_MAX) return 'NOTEOFF';
    if (ChordDrill.STATUS_NOTEON_MIN <= statusNum && statusNum <= ChordDrill.STATUS_NOTEON_MAX) return 'NOTEON';
    return 'OTHERS';
  }
  public findPossibleRoots(noteNums: number[]) {

  }
  public getChord() {
    let notes: string[] = [];
    this.registered.sort((a, b) => a - b);
    this.registered.map(x => notes.push(noteName[x % 12])); // Suppose 0 is C and increments up to 11 = B
    const chord = detect(notes);
    return chord;
  }
  public registerTargetInput(input: MIDIInput, func: (ev: Event) => void) {
    this.targetInput = input;
    this.logListStore.pushWithCurrentTimestamp(`Input '${input.name}' is registered`);
    this.targetInput.onmidimessage = func
    this.logListStore.pushWithCurrentTimestamp(`onMIDIMessage is registered to '${input.name}'`);
  }

  public registerNote(note: number): void {
    if (this.registered.includes(note)) return;
    this.registered.push(note);
  }
  public removeNote(note: number): void {
    if (!this.registered.includes(note)) return;
    this.registered = this.registered.filter(x => x !== note);
  }
}
