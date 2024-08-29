import http from 'http';
import cluster from 'cluster';
import { cpus } from 'os';
import process from 'process';

const numCpus = cpus().length;

if(cluster.isPrimary) {
  for (let i = 0; i < numCpus; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
 http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`sent from ${process.pid}`);
  }).listen(process.env.PORT || 3000, 'localhost'); 

  console.log(`Worker ${process.pid} started`); 
}
