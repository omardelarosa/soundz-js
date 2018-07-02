setTempo(60);

// Global pulse counter
pulse = 0;

// Format pattern shorthand
fmt = s =>
    s
        .replace(/\s/g, '')
        .split('')
        .map(Number);
// Random element from arr
_sample = arr => arr[parseInt(Math.random() * arr.length)];

// Utility for generating infinite counters
nextOf = max => {
    let i = 0;
    return () => {
        return ++i % max;
    };
};

next4 = nextOf(4);

// Global pulse
loop('pulse', async ctx => {
    pulse++;
    if (pulse === 16) {
        pulse = 0;
    }

    ctx.sleep(T / 4);
});

kicks = [
    fmt('1000 0010 0001 0010'),
    fmt('4000 0000 0040 0040'),
    // fmt('4020 0000 4000 0000'),
    // fmt('4020 0010 4020 0020'),
    // fmt('4030 0020 4020 1000')
];

kick_pattern = _sample(kicks);

hats = [
    [T / 4, 4],
    [T / 12, 6],
    [T / 4, 4],
    [T / 12, 6],
    [T / 4, 4],
    [T / 8, 8],
];

hats_pattern = _sample(hats);

snares = [
    fmt('0000 4000'),
    fmt('0100 4000'),
    fmt('1000 4000'),
    fmt('0100 4100'),
    fmt('0001 3001'),
];

snares_pattern = _sample(snares);

KEY = ['F4', 'major'];

makeScale = note => Tonal.scale(KEY[1]).map(Tonal.transpose(note));

// Make an array of notes
scale = [
    ...makeScale('F3'),
    ...makeScale('F4'),
    ...makeScale('F5'),
    ...makeScale('F6'),
];
chords = [0, 3, 4, 3, 2];
chord = 0;
notes = [0, 2, 4, 6];

// Get MIDI outputs
NOTE_KICK = 'A0';
NOTE_SNARE = 'A1';
NOTE_HAT = 'A2';

synth = new Tone.PolySynth(6, Tone.Synth, {
    oscillator: {
        partials: [0, 2, 3, 4],
    },
}).toMaster();

sampler = new Tone.Sampler(
    {
        [NOTE_KICK]: 'BD.WAV', // Kick
        [NOTE_SNARE]: 'SD.WAV', // Snare
        [NOTE_HAT]: 'CH.WAV', // Closed Hats
    },
    {
        release: 1,
        baseUrl: '/samples/',
    },
).toMaster();

playInst = (inst, note, dur = 50) => {
    inst.triggerAttack(note);
    setTimeout(() => {
        inst.triggerRelease(note);
    }, dur);
};

// Define loops once
bufferQueue.push(`${BUFFER_PATH}/loops.js`);
