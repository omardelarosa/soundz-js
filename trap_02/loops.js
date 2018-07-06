// Edit this file while running the server to update loops in real time

last = Date.now();

loop('synth', async ctx => {
    const since = Date.now() - last;
    last = Date.now();
    console.log('since...', since, ctx.tick);
    // Update chord state
    chord = chords[next4()];
    const chr = notes.map(n => scale[n + chord]);
    chr.forEach(n => {
        playInst(synth, n, 1000);
    });

    ctx.sleep((T / 1) * 2);
});

loop('leadSynth', async ctx => {
    const since = Date.now() - ctx.last;
    ctx.last = Date.now();
    const n = _sample(
        notes.map(n => {
            return scale[n + chord];
        }),
    );
    playInst(leadSynth, n, 100);
    ctx.sleep(T / 4);
});

loop('kicks', async ctx => {
    const pulse = ctx.tick % 16;
    // Switch pattern on the 0
    if (pulse === 0) kick_pattern = _sample(kicks);
    if (!kick_pattern[pulse]) return ctx.sleep(T / 4);

    // Play kick beat
    playInst(sampler, NOTE_KICK);

    ctx.sleep(T / 4);
});

h_counter = 0;

loop('hats', async ctx => {
    t = hats_pattern[0];
    max = hats_pattern[1];

    if (h_counter >= max) {
        hats_pattern = _sample(hats);
        h_counter = 0;
        t = hats_pattern[0];
    }

    playInst(sampler, NOTE_HAT);

    if (h_counter >= max - 1) {
        hats_pattern = _sample(hats);
        h_counter = 0;
        t = hats_pattern[0];
    } else {
        h_counter++;
    }
    ctx.sleep(t);
});

loop('snares', async ctx => {
    const pulse = ctx.tick % 16;
    console.log('pulse', pulse, ctx.tick);
    // Switch pattern on the 0
    if (pulse === 0) snares_pattern = _sample(snares);
    if (!snares_pattern[pulse]) return ctx.sleep(T / 4);
    playInst(sampler, NOTE_SNARE);
    ctx.sleep(T / 4);
});
