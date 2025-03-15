import os from "os";
import { exec } from "child_process";

const CHECK_INTERVAL = 10000; 
const CPU_THRESHOLD = 70; // Restart server if CPU exceeds 70

const getCPUUsage = () => {
  const cpus = os.cpus();
  let totalIdle = 0
  let totalTick = 0;

  cpus.forEach((cpu) => {
    for (let type in cpu.times) {
      totalTick += cpu.times[type];
    }
    totalIdle += cpu.times.idle;
  });

  return { idle: totalIdle / cpus.length, total: totalTick / cpus.length };
};

let startUsage = getCPUUsage();

setInterval(() => {
  const endUsage = getCPUUsage();

  const idleDiff = endUsage.idle - startUsage.idle;
  const totalDiff = endUsage.total - startUsage.total;
  const cpuUsage = 100 - Math.round((idleDiff / totalDiff) * 100);

  console.log(`Current CPU Usage: ${cpuUsage}%`);

  if (cpuUsage > CPU_THRESHOLD) {
    console.log(`CPU Usage exceeded ${CPU_THRESHOLD}%. Restarting server...`);
    exec("pm2 restart server", (err, stdout, stderr) => {
      if (err) console.error(`Error restarting: ${err}`);
      console.log(stdout || stderr);
    });
  }

  startUsage = getCPUUsage(); // Reset for next check
}, CHECK_INTERVAL);
