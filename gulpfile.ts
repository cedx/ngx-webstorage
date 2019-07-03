import {spawn, SpawnOptions} from 'child_process';
import * as del from 'del';
import {promises} from 'fs';
import * as gulp from 'gulp';
import * as replace from 'gulp-replace';
import {delimiter, normalize, resolve} from 'path';

/** The file patterns providing the list of source files. */
const sources: string[] = ['*.ts', 'example/*.ts', 'src/**/*.ts', 'test/**/*.ts'];

// Shortcuts.
const {dest, parallel, series, src, task, watch} = gulp;
const {copyFile} = promises;

// Initialize the build system.
const _path = 'PATH' in process.env ? process.env.PATH as string : '';
const _vendor = resolve('node_modules/.bin');
if (!_path.includes(_vendor)) process.env.PATH = `${_vendor}${delimiter}${_path}`;

/** Builds the project. */
task('build:clean', () => del('build'));
task('build:esm', () => src(['build/esm2015/**/*.js']).pipe(replace(/\/\/# sourceMappingURL=.*$/g, '')).pipe(dest('lib')));
task('build:src', () => _exec('ng', ['build']));
task('build:types', () => src(['build/**/*.d.ts', 'build/*.metadata.json']).pipe(dest('lib')));
task('build', series('build:src', parallel('build:esm', 'build:types'), 'build:clean'));

/** Deletes all generated files and reset any saved state. */
task('clean', () => del(['build', 'doc/api', 'lib', 'var/**/*', 'web']));

/** Uploads the results of the code coverage. */
task('coverage:fix', () => src('var/lcov.info').pipe(replace(/\.js$/gm, '.ts')).pipe(dest('var')));
task('coverage:upload', () => _exec('coveralls', ['var/lcov.info']));
task('coverage', series('coverage:fix', 'coverage:upload'));

/** Builds the documentation. */
task('doc', async () => {
  for (const path of ['CHANGELOG.md', 'LICENSE.md']) await copyFile(path, `doc/about/${path.toLowerCase()}`);
  await _exec('compodoc', ['--config=etc/compodoc.json']);
  await _exec('mkdocs', ['build', '--config-file=etc/mkdocs.yaml']);
  return del(['doc/about/changelog.md', 'doc/about/license.md']);
});

/** Fixes the coding standards issues. */
task('fix', () => _exec('eslint', ['--config=etc/eslint.json', '--fix', ...sources]));

/** Performs the static analysis of source code. */
task('lint', () => _exec('eslint', ['--config=etc/eslint.json', ...sources]));

/** Runs the test suites. */
task('test', () => {
  if (process.platform == 'win32') process.env.FIREFOX_BIN = 'C:\\Program Files\\Mozilla\\Firefox\\firefox.exe';
  return _exec('ng', ['test']);
});

/** Upgrades the project to the latest revision. */
task('upgrade', async () => {
  await _exec('git', ['reset', '--hard']);
  await _exec('git', ['fetch', '--all', '--prune']);
  await _exec('git', ['pull', '--rebase']);
  await _exec('npm', ['install']);
  return _exec('npm', ['update', '--dev']);
});

/** Watches for file changes. */
task('watch', () => {
  watch('src/**/*.ts', {ignoreInitial: false}, task('build'));
  watch('test/**/*.ts', task('test'));
});

/** Runs the default tasks. */
task('default', task('build'));

/**
 * Spawns a new process using the specified command.
 * @param command The command to run.
 * @param args The command arguments.
 * @param options The settings to customize how the process is spawned.
 * @return Completes when the command is finally terminated.
 */
function _exec(command: string, args: string[] = [], options: Partial<SpawnOptions> = {}): Promise<void> {
  return new Promise((fulfill, reject) => spawn(normalize(command), args, {shell: true, stdio: 'inherit', ...options})
    .on('close', code => code ? reject(new Error(`${command}: ${code}`)) : fulfill())
  );
}
