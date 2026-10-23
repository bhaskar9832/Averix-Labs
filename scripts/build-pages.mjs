import { cpSync, mkdirSync, rmSync, symlinkSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const stage = join(root, '.pages-build');
const endpoint = process.env.NEXT_PUBLIC_INQUIRY_API_URL;
if (!endpoint || new URL(endpoint).protocol !== 'https:') {
  throw new Error('Set NEXT_PUBLIC_INQUIRY_API_URL to your HTTPS backend inquiry endpoint before building GitHub Pages.');
}
// Build an isolated static frontend. Server routes and local secrets never enter it.
rmSync(stage, { recursive: true, force: true });
mkdirSync(stage);
try {
  for (const file of ['src', 'public', 'package.json', 'package-lock.json', 'next.config.ts', 'tsconfig.json', 'postcss.config.mjs']) {
    cpSync(join(root, file), join(stage, file), { recursive: true, filter: source => source !== join(root, 'src/app/api') });
  }
  symlinkSync(join(root, 'node_modules'), join(stage, 'node_modules'), 'dir');
  const result = spawnSync(process.execPath, [join(root, 'node_modules/next/dist/bin/next'), 'build', '--webpack'], {
    cwd: stage, stdio: 'inherit', env: { ...process.env, BUILD_TARGET: 'export' },
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exitCode = result.status || 1;
  else {
    if (!existsSync(join(stage, 'out/index.html'))) throw new Error('Static build did not produce a homepage');
    rmSync(join(root, 'out'), { recursive: true, force: true });
    cpSync(join(stage, 'out'), join(root, 'out'), { recursive: true });
    console.log('GitHub Pages frontend exported to out/. Backend routes and database credentials are excluded.');
  }
} finally {
  rmSync(stage, { recursive: true, force: true });
}
