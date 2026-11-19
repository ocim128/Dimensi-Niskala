# Remotion snapshot

This directory preserves the remake's source and media inside the episode repository. The runnable Remotion project is its parent repository, which has its own Git history. To restore this snapshot in a compatible parent project, copy `src/KemacetanTerakhirV4Remake/` to the project's `src/` and `public/kemacetan-terakhir-v4-remake/` to its `public/`. Avoid overwriting any existing work.

Register the composition in `src/Root.tsx` alongside existing entries:

```tsx
import {KemacetanTerakhirV4Remake} from './KemacetanTerakhirV4Remake';
import {CharacterSheet} from './KemacetanTerakhirV4Remake/art';
// In RemotionRoot, with Composition and z already imported:
<Composition id="KemacetanTerakhirV4Remake" component={KemacetanTerakhirV4Remake}
  durationInFrames={2520} fps={30} width={1080} height={1920}
  schema={z.object({showCaptions: z.boolean(), soundOn: z.boolean()})}
  defaultProps={{showCaptions: true, soundOn: true}} />
<Composition id="KemacetanV4RemakeModelSheet" component={CharacterSheet}
  durationInFrames={1} fps={30} width={1080} height={1920} />
```

The working project used Remotion and `@remotion/media` 4.0.544, React 19.3.1 and `@remotion/captions` 4.0.544. See the episode [handoff](../handoff.md) for timing, rights and review limitations. This snapshot does not contain the complete parent Remotion project or its prior compositions.
