const { exec } = require("child_process");
const chokidar = require("chokidar");
let changed = false;

console.log(`Listening [${process.argv[2]}]... `);
chokidar.watch("./vendor").on("change", () => {
  changed = true;
});

setInterval(() => {
  if (changed) {
    const cmd = process.argv.slice(3).join(" ");
    console.log(cmd);
    exec(cmd, (error, stdout, stderr) => {
      if (stderr) {
        console.error(stderr);
      } else {
        console.log(stdout);
      }
    });
    changed = false;
  }
}, 1000);
