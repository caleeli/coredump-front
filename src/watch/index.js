const { exec } = require("child_process");
const chokidar = require("chokidar");
let runAt = 0;

console.log(`Listening [${process.argv[2]}]... `);
chokidar.watch("./vendor").on("change", () => {
  runAt = new Date();
  runAt.setSeconds(runAt.getSeconds() + 3);
});

setInterval(() => {
  if (runAt && (runAt <= (new Date))) {
    const cmd = process.argv.slice(3).join(" ");
    console.log(cmd);
    exec(cmd, (error, stdout, stderr) => {
      if (stderr) {
        console.error(stderr);
      } else {
        console.log(stdout);
      }
    });
    runAt = 0;
  }
}, 1000);
