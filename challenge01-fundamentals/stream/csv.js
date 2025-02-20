import fs from "node:fs";
import { parse } from "csv-parse";

const csvPath = new URL("./tasks.csv", import.meta.url);

const processFile = async () => {
  const parser = fs.createReadStream(csvPath).pipe(
    parse({
      delimiter: ',',
      skipEmptyLines: true,
      from: 2,
    })
  );

  for await (const record of parser) {
    const [title, description] = record;

    const csvData = {
      title,
      description
    }

    await fetch('http://localhost:3333/tasks',  
      { 
        method: "POST", 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(csvData) 
      }
    )
  }
};


processFile();

