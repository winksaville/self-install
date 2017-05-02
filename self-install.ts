import * as fs from "fs";
import * as os from "os";
import * as path from "path";

if (os.type().indexOf("Windows") < 0) {
   // Not windows, make alsatian-cli.js executable
   try {
      // Should exist, but make sure
      fs.accessSync(path.join("cli", "alsatian-cli.js"));
      fs.chmodSync(path.join("cli", "alsatian-cli.js"), 0x1fd);
   } catch (err) {
      console.error(`cli/alsatian-cli.js err=${err}`);
   }
}

try {
   // If it exists do nothing
   fs.accessSync(path.join("node_modules", "alsatian"));
} catch (err) {
   // Doesn't exist, make a symlink
   fs.symlinkSync("..", path.join("node_modules", "alsatian"), "dir");
}

try {
   // If it exists do nothing
   fs.accessSync(path.join("node_modules", ".bin", "alsatian"));
} catch (err) {
   // Doesn't exist, make a symlink
   fs.symlinkSync(path.join("..", "..", "cli", "alsatian-cli.js"),
      path.join("node_modules", ".bin", "alsatian"), "file");
}
