const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

export function createSpinner(message: string) {
  let index = 0;

  process.stdout.write(`${frames[index]} ${message}`);

  const interval = setInterval(() => {
    index = (index + 1) % frames.length;

    process.stdout.write('\r');
    process.stdout.write(`${frames[index]} ${message}`);
  }, 80);

  return {
    success(finalMessage: string) {
      clearInterval(interval);
      process.stdout.write(`\r✓ ${finalMessage}\n`);
    },

    error(finalMessage: string) {
      clearInterval(interval);
      process.stdout.write(`\r✖ ${finalMessage}\n`);
    },
  };
}