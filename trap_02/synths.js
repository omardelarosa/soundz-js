// Tone.js stuff
reverb = new Tone.Reverb({
    wet: 0.8,
    decay: '8n',
}).toMaster();

feedbackDelay = new Tone.PingPongDelay({
    delayTime: '8n',
    feedback: 0.6,
    wet: 0.2,
}).toMaster();

synth = new Tone.PolySynth(6, Tone.Synth, {
    oscillator: {
        partials: [0, 2, 3, 4],
    },
})
    .connect(reverb)
    .toMaster();

// synth = new Tone.FMSynth({
//     volume: 1,
//     envelope: {
//         attack: 0.05,
//     },
//     // oscillator: {
//     //     partials: [0, 2, 3, 4],
//     // },
// })
//     // .connect(reverb)
//     // .connect(feedbackDelay)
//     .toMaster();

leadSynth = new Tone.PolySynth(6, Tone.Synth, {
    oscillator: {
        partials: [0, 2, 3, 4],
    },
})
    .connect(reverb)
    .connect(feedbackDelay)
    .toMaster();

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

sqcr.bufferQueue.push(`${BUFFER_PATH}/loops.js`);
