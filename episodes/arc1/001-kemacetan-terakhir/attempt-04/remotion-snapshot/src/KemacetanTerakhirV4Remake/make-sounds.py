"""Deterministic synthesized effects, no external samples. Refuses overwrite."""
import math, random, struct, wave
from pathlib import Path

OUT = Path(__file__).resolve().parents[2] / 'public' / 'kemacetan-terakhir-v4-remake'
SR = 48000
random.seed(41)

def write(name, seconds, fn):
    path = OUT / name
    if path.exists():
        raise FileExistsError(path)
    with wave.open(str(path), 'wb') as f:
        f.setparams((1, 2, SR, 0, 'NONE', 'not compressed'))
        for n in range(int(SR * seconds)):
            t = n / SR
            v = max(-.98, min(.98, fn(t)))
            f.writeframesraw(struct.pack('<h', int(v * 32767)))

def drone(t):
    # Long, restrained low-frequency atmosphere; deliberately falls away before taps.
    env = min(1, t / 2) * (1 if t < 57 else max(0, 1 - (t - 57) / 4))
    rumble = math.sin(2 * math.pi * 48 * t) + .5 * math.sin(2 * math.pi * 72.4 * t)
    pulse = .7 + .3 * math.sin(2 * math.pi * .13 * t)
    return env * (.10 * rumble * pulse + .025 * random.uniform(-1, 1))

def impact(t):
    return math.exp(-4*t) * (.40*math.sin(2*math.pi*(64-22*t)*t) + .1*random.uniform(-1,1))

def tap(t):
    return math.exp(-23*t) * (.45*math.sin(2*math.pi*610*t) + .25*random.uniform(-1,1))

def step(t):
    return math.exp(-13*t) * (.32*math.sin(2*math.pi*75*t) + .12*random.uniform(-1,1))

def switch(t):
    return math.exp(-36*t) * (.36*math.sin(2*math.pi*850*t) + .2*random.uniform(-1,1))

def sting(t):
    env = min(1, t*8)*math.exp(-1.4*t)
    return env*(.26*math.sin(2*math.pi*(150+70*t)*t)+.18*math.sin(2*math.pi*(219+80*t)*t)+.08*random.uniform(-1,1))

for args in [('dread.wav', 62, drone), ('impact.wav', 1.4, impact), ('tap.wav', .35, tap), ('step.wav', .5, step), ('switch.wav', .25, switch), ('sting.wav', 2.5, sting)]:
    write(*args)
