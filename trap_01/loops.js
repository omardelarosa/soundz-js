// Edit this file while running the server to update loops in real time

// Resets pulse to start loops together
pulse = 0;

loop('pulse', async (ctx) => {
    pulse++;
    if (pulse === 16) {
        pulse = 0;
    }
    ctx.sleep(T/4)
});

loop('synth', async (ctx) => {
    const n = _sample(notes);
    SYNTH2().playNote(n, 1, { velocity: 0.3 })
        .stopNote(n, 1, { time: '+100' })

    ctx.sleep(T/4);
});

loop('kicks', async (ctx) => {
    if (pulse === 0) kick_pattern = _sample(kicks);
    if (!kick_pattern[pulse]) return ctx.sleep(T/4);

    // Play kick beat
    TR().playNote(36, 1, { velocity: 0.9 })
        .stopNote(36, 1, { time: '+100' })

    ctx.sleep(T/4);
});

h_counter = 0;

loop('hats', async (ctx) => {
    t = hats_pattern[0];
    max = hats_pattern[1];
    if (h_counter >= max) {
        hats_pattern = _sample(hats)
        h_counter = 0;
        t = hats_pattern[0];
    }

    TR().playNote(42, 1, { velocity: 0.4 })
        .stopNote(42, 1, { time: '+100' });

    if (h_counter >= max-1) {
        hats_pattern = _sample(hats)
        h_counter = 0;
        t = hats_pattern[0];
    } else {
        h_counter++;
    }
    ctx.sleep(t);
});

loop('snares', async (ctx) => {
    if (pulse % 8 === 0) snares_pattern = _sample(snares);
    if (!snares_pattern[pulse]) return ctx.sleep(T/4);

    TR().playNote(38, 1, { velocity: 0.4 })
        .stopNote(38, 1, { time: '+100' });
    
    ctx.sleep(T/4);
});
